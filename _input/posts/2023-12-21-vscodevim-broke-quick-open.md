---
title: VSCodeVim Broke Quick Open
tags: 
    - VSCode
    - Vim
image: /images/VSCodeVim_Smashing_VSCode-min.jpg
image_alt: VSCodeVim Cartoon Character Breaking VSCode
webmention:
    send: true
    receive: true
published: true
---
<h2 class="post__title"><a href="{{ page.url }}">{{ title }}</a></h2>
<div class="post__date">{% formatted_date page.date %}</div>

<figure class="post__image">
    <img src="{{ image }}" alt="{{ image_alt }}" title="{{ image_alt }}">
</figure>

VSCodeVim broke VSCode's file _Quick Open_ keybinding. Now, _CTRL-P_ just moves the cursor up a line instead of opening the file finder as expected.

Based on the GitHub issue linked in [the commit](https://github.com/VSCodeVim/Vim/commit/cd9ebd581cf183e8c91966a21883f7022ec1dcc1), it was meant to enable MacOS's default cursor movement keys.

[Issue #8574](https://github.com/VSCodeVim/Vim/issues/8574) shows some easy fixes. I chose to disable the plugin's handling of the keybinding:

```json
"vim.handleKeys": {
    "<C-p>": false
}
```

This is in `settings.json` and I got there by opening Settings, entering "handlekeys" into the search box, and clicking on the "Edit in settings.json" link.


### References
- [VSCodeVim #8574: CTRL+P not working properly](https://github.com/VSCodeVim/Vim/issues/8574)
- [VSCodeVim commit cd9ebd5](https://github.com/VSCodeVim/Vim/commit/cd9ebd581cf183e8c91966a21883f7022ec1dcc1)
- [VSCodeVim #6363: Visual mode + &lt;C-n>/&lt;C-p>/&lt;C-f>/&lt;C-b> doesn't work as expected](https://github.com/VSCodeVim/Vim/issues/6363)
