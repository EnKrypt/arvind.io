---
title: Java vs Javascript
tags: ['comparison', 'guide', 'programming', 'technology']
date: '2015-11-23T00:00:00.000Z'
key: 'java-vs-javascript'
---

Yesterday wouldn't be the first time an aspiring programmer walked up to someone experienced and asked, "So what does JavaScript have to do with Java?"

[![](./similar.png)](https://stackoverflow.com/questions/245062/whats-the-difference-between-javascript-and-java)

The short answer is that it doesn't. **They are not related at all**, except by name.
However, they are both very popular and useful languages to their own merit, so we'll take an abstract look at them both.

### Quick differences :

---

| Java                                                                                                                       | JavaScript                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Statically typed (variable datatype needs to be specified beforehand)                                                      | Dynamically typed (variable type is resolved directly during runtime)                                    |
| Class based (functionality is stored in a way such that it belongs specifically to the instance from which it is accessed) | Prototype based (functionality is simply reduced to a property template that executes whenever required) |
| All non block statements should end with a semicolon.                                                                      | Semicolon is optional in most circumstances.                                                             |
| Java has an implicit `this` scope, and an implicit class scope                                                             | JavaScript has an implicit global scope, and during special events, an accompanying `this` scope.        |

If you're new to programming and the table above didn't make much sense to you, don't worry. The table just contains some technical details that'll help you to separate how one language works from another in your mind while actually writing code.
Since you're reading a blog post that's basically trying to pitch one language versus another, I'm going to assume that you might be more interested in the difference between these two languages in terms of application and use case.

Every environment has its own set of characteristic features that a programmer needs to keep in mind when developing in it, and I believe that the act of "putting yourself in the respective mindset" of that environment brings out efficient code in the end.
What I'm trying to say is that if you try to eat an orange like you would eat an apple, you might end up successful in your goal, but the overall experience will be messy and unsatisfactory. Hence, becoming thoroughly familiar with the frame of mind you need to be in for your environment first is important.

### The Java mindset

A Java developer will have a concrete idea of the structure of every class in his project, like a map of properties and functions, so he knows how each instance will interact with each other. When you need to use a lot of object oriented logic, including inheriting from other classes, polymorphism, and modularization by separating functionality into their own classes, then you're going to be _**passing instances around a lot**_. That's how you know that you need a language like Java for your task.

Also useful to note is that Java has its own core set of libraries, and virtual machine platform where code is **compiled**.

**Where to use Java :**

-   For standalone apps - If you just want to create a command line or GUI application on the go, to run natively, Java is a good bet. In fact, you can't make Android apps without Java.
-   Browser Applets - Although Java applets are becoming rarer and old, sometimes they are used to extend the functionality of the limited power that web browsers have over your system.
-   Embedded devices - Java was originally written with portability in mind, such that it can easily be made to run in embedded projects due to its scalability.
-   Drivers - *Java-like* languages like C or C++ are often used to develop software to make hardware work, although you might want to use a language different from Java for this purpose.

### The JavaScript mindset

A JavaScript developer will be aware of what's supposed to happen when. Picture a chain of events that fire off one after another. If you're developing in JavaScript, you should know the sequence of that chain and how to manipulate that sequence to get your desired result with only sufficient lines of code. You might have to juggle events by repeating, isolating, overloading, threading and doing just about anything to functionality. This will involve _passing functions around a lot_.

Yes, if I haven't mentioned it before, functions are treated as objects in JavaScript. You pass them around directly and play with them (along with callbacks, optionally) a lot, especially since this language has to deal with a lot of asynchronous activities. Think of anonymous/lambda functions, but on steroids.

Also useful to note is that as a scripting language, JavaScript has come a long way and has a lot of libraries to make things easier in most contexts. It is no longer limited to just a browser sandbox and is very capable for a language where code is **interpreted**.

**Where to use JavaScript :**

-   For anything web related - JavaScript is used primarily in browsers to make web pages dynamic and functional with client side scripting. There are a lot of libraries like JQuery and AngularJS that can use be used to boost its capabilities.
-   For backend or server side - With Node.js, JavaScript can also work on the server end. You can either cater to web pages with server side scripting, or just make a different desktop app altogether. Node Package Manager (npm) will help you get all sorts of libraries so you don't have to re-invent the wheel.
-   For light computation - There exist several JavaScript engines out there, so whether you're using [V8](https://en.wikipedia.org/wiki/Chrome_V8), [Rhino](<https://en.wikipedia.org/wiki/Rhino_(JavaScript_engine)>), or [Spidermonkey](https://en.wikipedia.org/wiki/SpiderMonkey), you can just run some code off of them in your browser console, or node terminal to quickly get some work done like basic or dynamic math.

By now you should know the difference between Java and JavaScript, not just in syntax and code, but also in usability and application. You should know which type of language to choose for your next project, and hopefully what you learnt in this post will make your project more successful.

##### Although it is true that a lot of points mentioned in favor of Java or JavaScript can also be applied to many other languages, they are not discussed here because this is just a general comparison post along the lines of "Java-like languages" and "JavaScript-like languages".
