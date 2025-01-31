---
title: "The <menu> Element"
excerpt: "The <code>&lt;menu&gt;</code> HTML element is a semantic alternative to <code>&lt;ul&gt;</code> intended for interactive items."
tags:
    - WebDev
    - HTML
webmention:
    send: true
    receive: true
published: true
---

{% include 'post-heading', display_title: 'The <code>&lt;menu&gt;</code> Element' %}

<p class="p-summary hidden">{{ excerpt }}</p>

I just noticed the navigation menu on a friend's website:  
```html
<nav>
    <menu> 
        <li><a href="/home/">Home</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/contact/">Contact</a></li>
    </menu>
</nav>
```

... huh?... `<menu>`? Since when is that a thing. I always use `<ul>` for menus.

Well, I looked it up, researched it, and even tested it with accessibility tools. The `<menu>` element has been around forever, is supported everywhere, and, in every case, it works just like a `<ul>`.

I even searched for navigation menu tutorials and they're all using `<ul>`. So, why aren't people using `<menu>` for menus? I dunno. I'm gonna start.