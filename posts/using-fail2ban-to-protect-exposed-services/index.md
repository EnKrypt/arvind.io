---
title: Using Fail2ban to protect exposed services
tags: ['guide', 'security', 'self-hosted', 'technology']
date: '2022-01-15T00:00:00.000Z'
key: 'using-fail2ban-to-protect-exposed-services'
---

<div class="index">
    <div class="index-title">Index</div>
    <ul>
        <li><a href="#disclaimer">What this guide is and isn't</a></li>
        <li><a href="#problem">The challenges involved</a></li>
        <li><a href="#solution">How does Fail2ban solve this?</a></li>
        <li><a href="#example">Creating a Fail2ban jail for an exposed service</a></li>
    </ul>
</div>

<h2 id="disclaimer" class="internal-link">What this guide is and isn't</h2>

Fail2ban is a software application that protects you from brute-force attacks.[^1]

The most common use-case is to protect your server's publicly exposed SSH service from being an easy target.[^2] If that is your only goal, you might find it quicker to follow the steps from [this article by Linode](https://www.linode.com/docs/guides/how-to-use-fail2ban-for-ssh-brute-force-protection/) for example.

In this guide however, we are going to dive a bit deeper. We are going to learn how Fail2ban works and then use that knowledge to protect any arbitrary service of our choosing.

This means we won't be limited by only what Fail2ban supports out-of-the-box, and by the time you're done with this guide, you should be able to configure Fail2ban yourself to protect any service that you desire, including SSH.

<h2 id="problem" class="internal-link">The challenges involved</h2>

The need to expose your server to the outside world can be unavoidable at times.

Maybe you're running a game server for some non-tech savvy friends; maybe you self-host a website on your old desktop and can't afford a CDN; maybe you want to share your media server with your grandparents without spending an entire evening trying to explain what a VPN is.

Whatever the case may be, any exposed service has the following main issues:

1. There could be a vulnerability in the service which can then be exploited by an attacker. This vulnerability might not even be documented yet.[^3]
2. There is a security risk. For a service protected by a password or key, attackers might repeatedly attempt to gain access and could eventually succeed if the security is poor or if they get enough attempts.[^4]
3. Processing the traffic from an attacker wastes network and CPU resources. With enough traffic, there is a risk of a [DoS attack](https://en.wikipedia.org/wiki/Denial-of-service_attack).

Points numbered 2 and 3 are our focus here. We want a solution that prevents a DoS attack, thereby also slowing down a brute force attack. There are some general pitfalls associated with what we are trying to do:

- Attempting to block malicious traffic from attackers in an over-aggressive manner might end up blocking legitimate traffic from genuine users (including yourself).
- If we only block traffic that show patterns of failed attempts to gain access, a smart attacker could still spam normal traffic unrelated to authorization attempts (such as connect/disconnect events) and trigger a DoS attack.

<iframe class="embed" src="https://www.redditmedia.com/r/linuxadmin/comments/bji7lb/question_why_do_people_recommend_fail2ban_for_ssh/em8ckw5/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false" style="height: 158px;"></iframe>

##### Your service itself needs to have reasonable security either built-in, or configured. Fail2ban is not a substitute for good security practices and at best will only compliment it. If your service is secured with a weak passphrase for example, Fail2ban will not help.

<h2 id="solution" class="internal-link">How does Fail2ban solve this?</h2>

Fail2ban monitors application logs and checks each incoming log entry against a list of patterns. You can then tell Fail2ban after how many pattern matches in a specific interval of time should it ban the remote source by adding a temporary firewall rule.

When we break it down, the components are as such:

1. The application log. This can be a log file or systemd journal that is written to in real-time. The logs must include a timestamp, the remote IP and some indicator that the traffic might be undesirable.
2. A list of patterns that identify undesirable traffic. This is known as a filter. These are regular expression rules that each log entry will be checked against.
3. The maximum number of attempts allowed; the time interval within which if those many attempts are found, the remote source is identified as an attacker and blocked; and the ban duration, i.e. for how long an attacker is blocked.

These components together represent a jail. For each service that we want to protect, we have to write a jail configuration.

##### Fail2ban has some pre-written jail configurations for popular services, and there is a chance that the service you are trying to protect might be among them. Read the default [jail.conf](https://github.com/fail2ban/fail2ban/blob/master/config/jail.conf) file to find your service and to also learn more about many other components you can configure (choosing how the application log is parsed, defining custom actions such as sending a mail when an attacker is identified, etc.) that we won't be visiting in this guide.

<h2 id="example" class="internal-link">Creating a Fail2ban jail for an exposed service</h2>

Let's try to apply what we learnt with a real example. Assume we have a self-hosted website being served by [Caddy](https://caddyserver.com/).

##### Remember, this is an example and you are not limited to Caddy. This should work even if you are using Apache, lighttpd, nginx etc. In fact, it doesn't even have to be a web server. You should be able to follow this guide to protect any public facing service as long as you have the three components listed in the previous section of this guide.

Make sure Fail2ban is installed. Check your preferred package manager for an install candidate.

On Debian based distros (including Ubuntu), run `sudo apt install fail2ban`.

On Arch based distros, run `sudo pacman -S fail2ban`.

Start and enable the systemd service that should now be available with `sudo systemctl start fail2ban` and `sudo systemctl enable fail2ban`.

On other operating systems, you can follow the [installation steps on their repository](https://github.com/fail2ban/fail2ban#installation).

The **first component** we need is our application log. For my setup, I can find that at `/var/log/caddy/access.log`. Let's take a look at it to discover items of interest. I'll highlight any lines that stand out to me.

```log {6-14,21,22,24-30}
2022/01/11 11:12:50 157.45.173.239 - - "GET /posts/writing-good-react-code/ HTTP/2.0" 200 27320
2022/01/11 11:12:50 157.45.173.239 - - "GET /_next/static/8GSgPajt3SwJ9_O_Z32WV/_buildManifest.js HTTP/2.0" 200 126
2022/01/11 11:12:50 157.45.173.239 - - "GET /_next/static/8GSgPajt3SwJ9_O_Z32WV/_ssgManifest.js HTTP/2.0" 200 132
2022/01/11 11:12:50 157.45.173.239 - - "GET /_next/static/8GSgPajt3SwJ9_O_Z32WV/_middlewareManifest.js HTTP/2.0" 200 65
2022/01/11 11:18:48 40.76.199.116 - - "GET / HTTP/1.1" 200 94788
2022/01/11 11:18:49 40.76.199.116 - - "GET /xmlrpc.php?rsd HTTP/1.1" 404 49330
2022/01/11 11:18:51 40.76.199.116 - - "GET /blog/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:18:52 40.76.199.116 - - "GET /wordpress/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:18:54 40.76.199.116 - - "GET /wp/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:18:55 40.76.199.116 - - "GET /2018/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:18:57 40.76.199.116 - - "GET /shop/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:18:58 40.76.199.116 - - "GET /test/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:19:00 40.76.199.116 - - "GET /wp2/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:19:01 40.76.199.116 - - "GET /cms/wp-includes/wlwmanifest.xml HTTP/1.1" 404 49330
2022/01/11 11:22:15 14.37.196.49 - - "GET /rss.xml HTTP/2.0" 200 49509
2022/01/11 11:24:09 207.241.233.150 - - "GET /robots.txt HTTP/1.0" 200 48
2022/01/11 11:30:29 188.34.193.42 - - "GET /rss.xml HTTP/2.0" 200 49509
2022/01/11 11:32:40 66.249.66.197 - - "GET /posts/self-hosted-home-server-vs-cloud HTTP/1.1" 301 97
2022/01/11 11:32:41 66.249.66.83 - - "GET /posts/self-hosted-home-server-vs-cloud/ HTTP/1.1" 200 25942
2022/01/11 11:35:27 66.249.66.221 - - "GET / HTTP/1.1" 200 21524
2022/01/11 11:40:58 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:41:23 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:42:30 40.77.167.31 - - "GET / HTTP/2.0" 200 21524
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 11:45:00 10.47.0.2 - - "GET /icons/icon-96x96.png?v=1e5871768fc928793a4409f7fee34916 HTTP/2.0" 404 49330
2022/01/11 12:00:38 162.0.235.14 - - "GET /wp-login.php HTTP/1.1" 404 13512
2022/01/11 12:03:39 8.29.198.26 - - "GET /rss.xml HTTP/1.1" 200 49509
2022/01/11 12:04:09 40.77.167.102 - - "GET /robots.txt HTTP/2.0" 200 62
```

A common attack pattern seems to be to spam requests for invalid web pages. Notice the 404 status code in the highlighted lines and also that we can see the IP address for each request.

The **second component** is our filter. We need a list of regex patterns that will be used to check for matches in our application log. Let's create a new file at `/etc/fail2ban/filter.d/caddy404.conf` with the following contents:

```toml showLineNumbers
[Definition]

failregex = ^ <HOST> \- \- \".+\" 404 \d+$
```

In our case, just this one regex pattern should do. The flavor of regex here is Python. [Regex101](https://regex101.com/) is a great tool to quickly write and test regular expressions in any flavor. Refer to [Fail2ban's dev docs on writing filters](https://fail2ban.readthedocs.io/en/latest/filters.html#regular-expressions) to understand more about special words like `<HOST>` and the rules behind writing filters.

Fail2ban comes with `fail2ban-regex` which is a handy tool to quickly check if our filter will work correctly. We can test the filter we made against our application log like so:

<pre><code>$ fail2ban-regex /var/log/caddy/access.log caddy404

Running tests
=============

Use   failregex filter file : caddy404, basedir: /etc/fail2ban
Use         log file : /var/log/caddy/access.log
Use         encoding : UTF-8


Results
=======

Failregex: 243 total
|-  #) [# of hits] regular expression
|   1) [243] ^ &lt;HOST&gt; \- \- \".+\" 404 \d+$
`-

Ignoreregex: 0 total

Date template hits:
|- [# of hits] date format
|  [1899] {^LN-BEG}ExYear(?P&lt;_sep&gt;[-/.])Month(?P=_sep)Day(?:T|  ?)24hour:Minute:Second(?:[.,]Microseconds)?(?:\s*Zone offset)?
`-

Lines: 1899 lines, 0 ignored, 243 matched, 1656 missed
[processed in 0.07 sec]

Missed line(s): too many to print.  Use --print-all-missed to print all 1656 lines
</code></pre>

Looks like our filter is accurately matching entries. You can use the `-l heavydebug` flag to debug in more detail and see what is being matched per record.

The **third component** involves deciding the thresholds around blocking an IP address. The Fail2ban documentation says that a host is banned for `bantime` seconds if it has generated `maxretry` during the last `findtime` seconds. These are numerical values that we have to set.

Sending a request that results in a 404 status code isn't necessarily malicious. Dead links in your application, outdated search engine records and a user making a typo are examples of legitimate traffic that we don't want to punish. We need to find a balance past which we can confidently say without a doubt that a source is sending bad requests excessively often. These values are going to be subjective and different people might find different thresholds that work for them, but here are the values that I have decided on:

```toml
bantime  = 1440m
maxretry = 50
findtime = 30
```

This means that if a source tries to access an invalid page more than fifty times in half a minute, they will be blocked for one day.

**Putting all our components together**, we should now be able to write our jail configuration. Edit `/etc/fail2ban/jail.local` (if that file doesn't exist, you might have to create one by copying `/etc/fail2ban/jail.conf`) and add the following section at the end:

```toml showLineNumbers
[caddy404]

enabled  = true
port     = https
filter   = caddy404
logpath  = /var/log/caddy/access.log
backend  = auto
bantime  = 1440m
maxretry = 50
findtime = 30
```

Reload Fail2ban to apply the new configuration:

<pre><code>$ fail2ban-client reload
OK
</code></pre>

Now you should be able to see the newly added jail alongside any existing ones:

<pre><code>$ fail2ban-client status
Status
|- Number of jail:      2
`- Jail list:   caddy404, sshd
</code></pre>

Once your jail starts to block IP addresses, you can see them as such:

<pre><code>$ fail2ban-client status caddy404
Status for the jail: caddy404
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     219
|  `- File list:        /var/log/caddy/access.log
`- Actions
   |- Currently banned: 3
   |- Total banned:     3
   `- Banned IP list:   10.47.0.2 157.45.202.105 157.45.191.241
</code></pre>

That's it! Fail2ban will keep listening to incoming logs in the background and keep your system protected from being flooded by bad requests.

While your use-case will likely be different, if you've followed this guide to the end, I hope that you were able to fit the same methodology to work for you. Let me know about your experience by leaving a comment below.

[^1]: [1. Fail2ban - Wikipedia](https://en.wikipedia.org/wiki/Fail2ban)
[^2]: [2. PyCon 2014 Lightning Session on Fail2ban - YouTube](http://www.youtube.com/watch?v=xcXheAWy7cU#t=190)
[^3]: [3. Vulnerability (computing) - Wikipedia](<https://en.wikipedia.org/wiki/Vulnerability_(computing)>)
[^4]: [4. Brute-force attack - Wikipedia](https://en.wikipedia.org/wiki/Brute-force_attack)
