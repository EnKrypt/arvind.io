# [<p align="center"><img src="https://raw.githubusercontent.com/EnKrypt/arvind.io/next/public/images/preview.png" width="300" /></p>](https://arvind.io)

[![License](https://img.shields.io/github/license/EnKrypt/arvind.io.svg)](https://raw.githubusercontent.com/EnKrypt/arvind.io/master/LICENSE)
![Build-master](https://img.shields.io/circleci/build/github/EnKrypt/arvind.io/next.svg)

<!---
TODO: Replace next branch with master
-->

## [arvind.io](https://arvind.io)

I write code, make music, and study the skies. You can read about what I've been up to there, along with my thoughts and discoveries.

### This is the source code for my blog and personal website

This project is not intended to be repurposed. \
 However, if you want to run this project anyway, set up a `.env` file at the root of the project with the required environment variables specific to your deployment, such as the site URL, analytics tracking ID, Disqus shortname, and so on. Refer to [`config.js`](https://github.com/EnKrypt/arvind.io/blob/master/extractors/config.js). \
 If you actually plan to repurpose the code here, I admire your determination to fit square pegs in round holes. I bet you also hate ice cream and like pizza with pineapple on it, you fucking psychopath.

#### [How do I decide blog post tags?](https://github.com/EnKrypt/arvind.io/blob/master/tags-guide.md)

### Site map

- `/` : Root of Blog Post Index/List
- `/page/<index>` : Blog Post Index/List at page
- `/posts/<title>` : Individual Blog Post
- `/tags/<tag>` : Root of Blog Post Index/List having particular tag
- `/tags/<tag>/page/<index>` : Blog Post Index/List having particular tag at page
- `/hire` : Client landing page for contract work
- `/menu` : Static page with Sidebar links (for when someone browses without Javascript)
- `/_next/` : Assets required by frontend (JS chunks, minified images, etc)
- `/manifest/` : PWA manifests, favicons
- `/images/` : Picture related assets
- `/resume.pdf` : Resume document
- `/rss.xml` : RSS feed for blog posts
- `/atom.xml` : Atom feed for blog posts
- `/bundle.html` : Webpack bundle analyzer output for client side JS bundle
- `/robots.txt` : For web crawlers
- `/keybase.txt` : Proof of domain ownership on [my keybase profile](https://keybase.io/enkrypt)
- `*` : Anything else (that doesn't point to a generated resource) gives a 404 page

#### Built using [Next.js](https://nextjs.org/) and [Preact](https://preactjs.com/)
