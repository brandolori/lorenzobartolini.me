---
title: "LB Toolkit, or how I recreated some already existing tools"
date: "2022-10-18"
summary: "I share a look at my personal computer toolkit, and at the process of its creation"
---

I've always been fascinated by Electron apps. The power to use the same skillset used in web development to create desktop applications, writing your code once and running in a vast variety of platforms. Most of the apps I use day to day are built using this technology, heck, I'm writing this article from one. So, there had to come a time when I finally built one myself! How did it happen?

## The (lack of) need

LB Toolkit came pretty much out of boredom. Finding myself in a situation where I had a lot of time to spare, and pretty much nothing but a computer at hand, I started looking for a project to keep me sane, and entertained. Naturally I gravitated towards the creation of some app or website, but this time it was different: I had the goal that it had to be something actually useful.

So my attention went to the myriad of little tools and programs I use in my everyday windows machines. There's powertoys, that I keep installed pretty much only to use the color picker feature. There's taskplay, very useful if you almost always have some music playing (like me). There's eartrumpet, very useful if you have many audio devices. And so on.

I started to envision a tool-to-rule-them-all, something that avoided the need to download and keep updated a bunch of software in every machine. So I started to build it.

## Desire for tech

The second goal was that it had to be fun: so I started looking for ways to build it using the most fun and exciting tools and libraries. Here comes in Electron: wouldn't be fun to create a desktop app using the same core technologies that I already know and like working with? Despite being sometimes seen as slow, heavy and unnecessary, I was sure that there was a way to make it fast and nimble.

And with the web ecosystem, the choice of React was preatty easy to do. So I started building.

## General architecture

The final architecture is the culmination of a lot of work and revisions, and from my point of view it is the optimal one, at least for this use case. It is heavily based on electron-react-boilerplate, so if you're familiar with that, nothing should look unfamiliar.

### A tale of two buildlands

The main goal of the architecture was to homogenize the development experience: Electron forces you to have a separate renderer and "server" process, each having its js context and capabilities. You risk having two separate development environments: the project was started by simply using typescript with create-react-app as a frontend framework, and plain old javascript to build the backend. This quickly grew a to be unmangeable, as in many places the code was duplicated and in general I had to continually switch mindsets when moving from one file to the next. So I started looking for better solutions to unify the environments, and I stumbled upon the solution provided by electron-react-boilerplate (ERB): writing one single typescript codebase, and having webpack do the heavy lifting of preparing the two javascript recipies.

### A heavy backpack

It was clear from the start that I couldn't simply install ERB and be good to go: it is built with the assumption that one should start a new project from scratch when using it, and my project by then was already far from being restartable. So I created a new project, and simply tried to pull in as many files from the old project as possible.  

Did it work? Not at first. Here's some of the most interesting aspects I had to work on:
- `dynamic import()` and webpack: I needed to import the package `clipboard-event`. It is an ES package, meaning that it can't be imported using a `require` statement, that Electron supports. This would not normally be a problem, since we are using webpack, but this being a package with native components, it had to be excluded from the webpack bundle. The normal way to import an ES module from a RequireJS module is by using the `await import()` function. Only, in normal webpack convention this is used to indicate to the bundler that you want to split your code in a different bundle. So? The solution was to use the webpack directive `/* webpackIgnore: true */` inside the import brackets, telling webpack to trust us in what we want to do.
- package system: ERB uses `electron-builder` to build the package, spitting out a windows executable with the NSIS plugin. This posed a bit of a problem: I wanted to script some of the installation steps with in the same way that I script the rest of the project, via Javascript. The steps I needed to script were the creation registration on login and the creation of the desktop shortcut. So I decided to switch to the squirrel plugin: squirrel opens your program during the installation, allowing it to perform some checks and steps, and during uninstall, allowing it to clean up after itself.
- ts-node: ERB by default while in development uses ts-node to run your main code, while it serves your render code with a webpack server. This has some irregularities as ts-node does not have the same behavior as webpack. So I changed that: now the dev environment uses webpack, exactly as the prod environment.

## Tools
### System Settings
### Updater
### Cleaner
### Regex Checker
### Wifi Password
### Text Casing
### Clipboard
## End Result