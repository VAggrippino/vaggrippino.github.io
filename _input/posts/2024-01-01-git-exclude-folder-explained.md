---
title: "Git Exclude Folder: Explained"
image: "/images/Octo-Cat_Explaining-min.jpg"
image_alt: "A cartoon image depicting a bipedal octo-cat with pink skin, green eyes, and blue suckers on his tentacles. The octo-cat has white whiskers and bushy white mustache and eyebrows. He is wearing a suit vest with dress shirt, pants, and a tie teaching a complex topic using many charts, graphs and diagrams written on a chalkboard. There is a single student wearing a suit that is probably a school uniform."
published: true
---
<h2 class="post__title"><a href="{{ page.url }}">{{ title }}</a></h2>
<div class="post__date">{% formatted_date page.date %}</div>

<figure class="post__image">
    <a href="{{ page.url }}"><img src="{{ image }}" alt="{{ image_alt }}" title="{{ image_alt }}"></a>
</figure>

To exclude a directory from `git diff`, use the following command:

```bash
git diff -- . ':!directory_name'
```

You can find this exceptionally terse answer at at least a dozen search results, but not a single one offers an explanation. Well, that's not enough info for me...

The "pathspec" is documented under `git help gitglossary` and is used for many git commands even if their syntax statement shows `<path>` instead of `<pathspec>` :

https://git-scm.com/docs/gitglossary#def_pathspec

Here are the important points:

- The double dashes (`--`) followed by a space means _end of command line flags_. Without this, git may try to interpret your _pathspec_ as a command line flag.
- The dot (`.`) means the current directory. I don't think this is really necessary.
- The colon (`:`) indicates that the characters which follow it are a "magic signature".
- The exclamation mark means "exclude".
- The "magic signature" should be terminated by another colon, but that's optional if the pattern begins with a less magical symbol.

I wanted to see what had changed in an [Eleventy](https://www.11ty.dev/) site, excluding the generated output files. So, here's the command I used:

```bash
git status -- ':!:_output'
```

Note that I needed to terminate the magic signature with another colon because the path I wanted to exclude started with an underscore (`_`). Without that second colon, I got an error message:


> fatal: Unimplemented pathspec magic '_' in ':!_output'`
