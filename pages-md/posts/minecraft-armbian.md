---
title: Building a minecraf server on a single board computer
date: "2021-12-08"
summary: "Come this winter, I wanted to find a place to both show off all the cool tricks I learn and write short blog stories talking about my experiences. I remembered I had a website that I only had been using to test npm packages in a production setting, and I decided to do something with it."
---
- hardware
- os
- java
- minecraft
- optimizations
- dns

## An excuse
I have this single board computer at home, the [Asus Tinkerboard](https://tinker-board.asus.com). It's a small and quite powerful machine, not unlike the Raspberry Pis that kickstarted the SBC revolution. this has a bit of a _solution looking for a problem_ effect on me: when I remember it exists, I desperately try to find a reason for its existance, be it an ad-blocking dns server with [Pi-hole](https://pi-hole.net/), or a NAS with [OpenMediaVault](https://www.openmediavault.org/) (which by the way I've never been able to get working).

Time and time again, the perfect excuse to keep it plugged to my router has been to use it as a minecraft server. This article is a brief summary of all I've learned in the (now plentiful) times I've attempted the process.

## Enter the beast
The Asus Tinkerboard (original, not S, not 2) has a quad core 32 bit ARM SOC from Rockchip, 2GB of LPDDR3 RAM, and a pretty standard IO.

![The Asus Tinkerboard](tinker.webp "Here it is, in all its glory. Credid Asus")

It is the best kind of powerful: just powerful enough. This forces you to get creative in finding solutions and ways to optimize for your use case, which for my taste is the entire fun of the process

## Choosing an OS
Now, for SBC like these there are mainly two options when dealing with operating systems: using the manifacture-provided one or using Armbian. The first choice in this case is called Tinker OS: a Debian-based os that should offer best-case-scenario in performance and hardware access. So why did I choose Armbian instead?

Armbian is a multi-system operating system based on Debian available for a variety of single board computers. As far as I know it does not offer any measurable improvement over Tinker OS, but what it does offer is that it worked that one time that the Asus-provided OS didn't. So I guess the answer to the question is consistency?

## Coffee beans
The next step is a bit more difficult.
That is, minecraft needs Java. The first time I attempted this task, I barely knew how Java worked and tried searching for an answer on how to install it on google. This sent me spiraling in a maze of non working answers and dead-end paths
[[non ricordo se c'è su apt-controllare]]

Until one day, I found [Jabba](https://github.com/shyiko/jabba). Shout out to my OOP course in university for suggesting it as a way to install java! It's a quite powerful tool, automatically listing the available jdk distributions for your platform and os, and letting you install and switch between them with ease. This served me well for a long time, 