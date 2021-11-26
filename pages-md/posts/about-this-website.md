---
title: About this website
date: November 26, 2021
summary: Ajeje brazorf
---

How did this site come to be?

I reserved this domain (lorenzobartolini.me) last december, seeing as the .it and .com domain were both already taken, and I was worried I'd be left without an available domain.

Back then I didn't really have any ideas on what to do with it, but I was confident it would end up useful eventually.

So come this winter, I wanted to find a place to both show off all the cool tricks I learn and write short blog stories talking about my experiences. I remembered I had this site, that I only had been using to test npm packages in a production setting, and I decided to do something with it.

## The concept

Ok, the website had to have a few features:
- be a tech showcase
- have minimalist design
- be a place where I can write about some new tech I just found out, or a recent happening
- be fun to create!

## The tech
The base architecture is based on [this video](https://youtu.be/pY0vWYLDDco) from youtube creator Ben Awad. It utilized nextjs' SSG (Static Site Generation) to dynamically create pages based on markdown files present on a folder in the project structure. You're reading a Markdown file right now!

For the background, which was the fun part of the project, I wanted to build something with [threejs](https://threejs.org/). Looking around I found that the smartest way to go about doing it looked like using [react-three-fiber](https://github.com/pmndrs/react-three-fiber), a React renderer fot threejs scenes. And I was stunned! Building a 3d scene looked as simple as building ah html (actually jsx ;)) page!