---
title: Webmentions
image: "/images/Webmentions-header-image.webp"
image_alt: "The word “Webmentions” with the “W” replaced by the Webmention logo"
tags:
    - social
    - WebDev
    - IndieWeb
webmention:
    send: true
    receive: true
published: false
---
{%- include 'post-heading' -%}
<div class="e-content">

{% include 'post-image' %}

Webmentions are a way for content creators on the web to notify each other when they comment on or otherwise react to each others' work. This means that when you write a blog post on your site then someone writes a response on their site, you can automatically show and link to the response below your post. Most importantly, Webmention is an open standard and [W3C Recommendation](https://www.w3.org/TR/webmention/) that doesn't depend on any proprietary technology or service.

The basic implementation is pretty simple.  To _receive_ webmentions, you need to specify a Webmention endpoint in your page `head` or your HTTP headers.

Here's my Webmention endpoint:

```html
<link rel="webmention" href="https://webmention.io/aggrippino.com/webmention">
```

To _send_ webmentions, find the target site's Webmention endpoint and send a _post_ request to that URL with `source` and `target` parameters.

What you do when you receive a webmention isn't defined by the specification, but you're going to want to parse the source page using [Microformats](https://microformats.org/), a related technology, to get the content as well as some information about the author and the type of reaction. A more practical implementation might be a little more complicated, but [Webmention.io](https://webmention.io/) and [Webmention.app](https://webmention.app/) are free services that make everything easier.

, and [Bridgy](https://brid.gy/).

I'll get into the details of a more practical implementation in different posts.

</div>


<aside class="related">
    <div class="related__title" id="related__title">My Webmention Series</div>

1. [Webmentions]({{ page.url }}) (this page)
2. Receiving Webmentions
3. Sending Webmentions
4. Threads (a.k.a.: Salmentions)

</aside>