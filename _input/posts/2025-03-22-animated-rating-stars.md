---
title: "Accessible Animated Star Rating"
image: "/images/Animated_Star_Rating_demo.gif"
image_alt: "Showing the animation of selecting 5 stars"
tags:
    - accessibility
    - a11y
    - HTML
    - CSS
    - JavaScript
published: true
webmentions:
    send: true
    receive: true
---
{%- include 'post-heading' -%}

<div class="e-content">

{% include 'post-image' %}

I saw [a post on Mastodon](https://techhub.social/@gundersen@mastodon.social/114197012843039297) where the author, Marius Gundersen, used CSS to create a 0 to 5 star rating widget with an animated gradient and no JavaScript. It's really neat, but the code is hard to read and it's completely inaccessible.

## JavaScript _is_ Essential
There seems to be a growing sentiment within the Web Development community that JavaScript should be eliminated at all costs. Well, the cost is often accessibility. And accessibility is essential for all websites. Don't take my word for it, though. As detailed by Adrian Roselli, [CSS-only Widgets Are Inaccessible](https://adrianroselli.com/2023/03/css-only-widgets-are-inaccessible.html) and a key takeaway from Sara Soueidan's experience learning and teaching accessibility is that [JavaScript is imperative for creating truly accessible custom interactive components](https://www.sarasoueidan.com/blog/what-accessibility-taught-me/#javascript-is-imperative-for-creating-truly-accessible-custom-interactive-components.).

## Accessible Animated Star Rating
I really liked the animated-star demo. I respect Marius for creating something I wouldn't have even thought of and I respect the anti-JS perspective even though I don't fully support it. But I wanted an accessible version. So, I decided to make my own:

<iframe height="300" style="width: 100%;" scrolling="no" title="Animated Star Rating" src="https://codepen.io/VAggrippino/embed/WbNJjaJ/4fe086a3871cec00f08be859ba56e6a6?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/VAggrippino/pen/WbNJjaJ/4fe086a3871cec00f08be859ba56e6a6">
  Animated Star Rating</a> by Vince Aggrippino (<a href="https://codepen.io/VAggrippino">@VAggrippino</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Differences
This is all based on [an unmodified fork](https://codepen.io/VAggrippino/pen/gbOzWKW/74b4587171a4612d9823d9934fb1a045) I made of [the original](https://codepen.io/mariusgundersen/pen/jEOxqoe) because people often fix or improve things right after sharing an initial version. Besides that, I'm kinda slow and I worried that it would change before I finished writing this 😅

### The Original
In the original animated-star demo, the stars were formed by a large blob of encoded SVG code in a CSS `background-image` and a different blob to define the `clip-path` of the gradient. It's long, unnecessarily complex, and would be difficult to reproduce without copying and pasting. The stars are hard-coded to be exactly `24px` and changing that would require complex changes to both the SVG and `clip-path`.

Although the stars are interactive components of the page, they aren't in the HTML at all. The HTML for the stars is just radio buttons that aren't even visible on the page. Combining [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) with the _squiggle selector_ ([subsequent-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator)) makes it _look like_ more than one star is selected, but there's really only ever one radio button _checked_. It's really clever, but it means that assistive technology has no way to tell how many stars are selected.

The user can select between 0 and 5 stars, but the widget shows seven stars and the purpose of those extra two isn't immediately clear. The first one is rendered on a row by itself and doesn't do anything when it's clicked. For each selected star one fifth of this star is _filled in_. The second extra star is never _filled in_ and clicking on it allows the user to select zero stars.

The other five stars would usually represent a rating. Clicking on an empty star selects it and those that precede it. The only way to deselect a star is to click on the star before it.

Assistive technologies such as screen readers work best if every visual component of the page is present in the HTML and has an [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). That's not as esoteric as it might seem. Properly written HTML has built-in accessible names. For example, radio buttons should have [labels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) that give them accessible names.

When I test this page with a screen reader ([NVDA](https://www.nvaccess.org/about-nvda/)), it just says "radio button not checked" 5 times and "radio button checked" once. It doesn't say anything about stars. In this context, that's totally fine. Marius was only doing a neat `conic-gradient()` animation and it does that very well. I'm gonna steal that idea for my version, but I'm gonna focus on accessibility.

### My Version
Each star in my demo is a [toggle button](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed). They're laid out with [flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) and sized with [relative units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#relative_length_units) so they can shrink and grow to match user preferences and the space provided. The star shapes themselves are inline SVG elements simple enough to reproduce by hand even with minimal SVG experience.

I use the same animation technique as Marius, but my gradient is applied to a pseudo-element. It can't be applied directly to the star because SVG doesn't support conic gradients and shapes don't have `background` properties (they use [`fill`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/fill)).

Like the original, the user can select between 0 and 5 stars, but there aren't any extra stars. To deselect a star, just click on it. Clicking a selected star that isn't on the end will deselect all the stars after it. The stars each have an offset `transition-delay` so that they seem to be selected sequentially.

All of the stars are present in the HTML and [visually hidden](https://codepen.io/VAggrippino/pen/GRbeaGN) button text provides them with accessible names that identify them as "One Star", "Two Stars", and so on. There's also a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live) that allows assistive technology to announce changes in the current rating.

When I test my version with a screen reader, it reads each of the stars, which ones are pressed, and the current rating.

## Summary
If you're a hobbyist or enthusiast, either choice is really fine. They both look nice and work well. I think the CSS-only version might earn you a little more _geek cred_.

If you're a professional, though, there's no choice. Accessibility is legally mandated and that requires JavaScript. An inaccessible website could subject you or your employer to fines or lawsuits. Again, don't take my word for it. Just do a web search for "accessibility lawsuits".

If you do use JavaScript, you may as well take advantage of the additional capabilities; like I did with the offset `transition-delay`. Just don't go overboard. Poorly implemented JavaScript can really ruin both the performance and accessibility of an otherwise excellent website. The key concepts are [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) and [graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation).

</div>