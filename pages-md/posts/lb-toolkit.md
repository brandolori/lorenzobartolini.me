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

## Tools
### System Settings
### Updater
### Cleaner
### Regex Checker
### Wifi Password
### Text Casing
### Clipboard
## End Result