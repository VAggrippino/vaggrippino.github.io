---
id: 568
title: "So, I'm Blogging Again"
date: '2018-04-21T09:18:05+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=568'
permalink: /so-im-blogging-again/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2018/04/alphabet-arts-and-crafts-blog-459688_1200x628-min.jpg
image_alt: "Scrabble tiles scattered, mostly face down with four tiles face up spelling the word &ldquo;BLOG&rdquo;"
categories:
    - Blogging
tags:
    - blogging
published: false
---
<h1 class="post__title"><a href="{{ page.url }}">{{ title }}</a></h1>
<div class="post__date">{% formatted_date page.date %}</div>

<figure class="post__image">
    <img src="{{ image }}" alt="{{ image_alt }}">
</figure>

<figure class="song">
    <blockquote class="song__quote">I'm back in the saddle again
Out where a friend is a friend
    </blockquote>
    <figcaption class="song__caption">
        <span class="song__attribution">- From
            <cite>
                <a href="https://youtu.be/E5F-O_19lSI?si=kt7dLvl77cOYGgsz"
                >Back in the Saddle Again</a>
            </cite> by Gene Autry &amp; Ray Whitley, 1939
        </span>
        <span class="song__comment">Am I the cowboy or the horse?</span>
    </figcaption>
</figure>

Inspired by the consistent efforts of some friends and
[an article](https://www.freecodecamp.org/news/every-developer-should-have-a-blog-heres-why-and-how-to-stick-with-it-5fd55a247fbf)
at freeCodeCamp’s blog, I decided to start blogging again.

I’ve been using GitHub to organize most of my recent efforts and I figured that
blogging with [Jekyll](https://jekyllrb.com/) and hosting for free with [GitHub
Pages](https://pages.github.com/) would be an ideal solution. All I need to do
is create a new project named *blog*, enable GitHub Pages, and start writing
[Markdown](https://github.github.com/gfm/) files. No PHP, no server, no
database, no security or plugin updates… perfect, right?

It’s not that easy…

> We highly recommend installing Jekyll to preview your site and help
> troubleshoot failed Jekyll builds.

They repeat this throughout
[GitHub’s documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
and they really mean it. There’s no easy way to set up a Jekyll blog on GitHub
Pages without either setting up Jekyll locally or forking an existing Jekyll
blog.

> Jekyll is not officially supported for Windows. For more information, see
> “[Jekyll on Windows](http://jekyllrb.com/docs/windows/#installation)” in the
> official Jekyll documentation.

I know, I know… I shouldn’t be using Windows. I used to be a devoted Linux user
and I called myself an Open Source Software enthusiast. Well, I forgot. It’s a
thing I’m not going to get into right now, but when I started to think again the
computer in front of me had Windows on it. This is currently my only option.

I did the reading. This setup requires Jekyll on Ruby on Bash on Ubuntu on
Windows and every step of the process comes with vague warnings about *issues*.
Even if I manage to bypass any issues, I have to set up and maintain Ruby on
Windows, learn how to use the Gem package manager, setup and maintain Bash on
Ubuntu on Windows, learn YAML, and learn the Liquid Templating Engine.

Enough is enough! Damn GitHub Pages and Damn Jekyll! What happened to just
writing my thoughts in markdown?! I’m busy learning more important things right
now. I’m just about ready to throw in the towel and become dependent on
WordPress again. One last try… I’ll look for a tutorial.

I found what I needed; An excellent article at Smashing Magazine entitled
“[Build A Blog With Jekyll And GitHub
Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)”
promises to tell me exactly how to set up my own blog with Jekyll and host it
with GitHub Pages. That sounds perfect! It is just a little bit misleading,
though. The article doesn’t actually tell me how to set up my own blog. It tells
me how to fork the author’s blog boilerplate and change some variables to show
my information instead of his.

You know what… I don’t care. It got the job done and now I have a Jekyll-driven
blog. For now, I can post my thoughts and share them however I want to. When I
decide to *upgrade*, either by learning and building Jekyll locally or by diving
back into the WordPress ecosystem, I’ll have very little difficulty. My markdown
files can very easily be copied over or imported into any system I choose.