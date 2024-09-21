---
id: 663
title: 'Fully Integrate Linux into VS Code on Windows'
date: '2019-06-13T15:56:12+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=663'
permalink: /fully-integrate-linux-into-vs-code-on-windows/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2019/05/20190531_075440_VSCode_Integrated_WSL-min.png
image_alt: Visual Studio Code and Windows Subsystem for Linux logos along with the Linux &ldquo;Tux&rdquo; and a laptop clipart on top of a slightly blurred screenshot of VS Code
image_caption: They work together nicely.
categories:
    - Software
    - Windows
    - WSL
tags:
    - HowTo
    - VSCode
    - WSL
published: false
---
<h1 class="post__title"><a href="{{ page.url }}">{{ title }}</a></h1>
<div class="post__date">{% formatted_date page.date %}</div>

<figure class="post__image">
    <img src="{{ image }}" alt="{{ image_alt }}">
    <figcaption>{{ image_caption }}</figcaption>
</figure>

> Linux is a cancer that attaches itself in an intellectual property sense to everything it touches.
> 
> <cite>Steve Ballmer, Microsoft CEO, June 2001</cite>

This ain’t yer Dad’s Microsoft…

In the past few years, Microsoft has made [Visual Studio Code](https://code.visualstudio.com/), the [free](https://directory.fsf.org/wiki/Visual_Studio_Code) code editor that runs everywhere, into [the preferred choice](https://insights.stackoverflow.com/survey/2019?utm_source=Iterable&utm_medium=email&utm_campaign=dev-survey-2019#technology-_-most-popular-development-environments) of many developers. And, rather than relentlessly pushing their own alternative, they’ve built the Linux command line into Windows as the [Windows Subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux).

If you’re like me, you’ve already set up both your WSL (Windows Subsystem for Linux) Linux shell and your VS Code environment just how you like ’em. But when you open the integrated terminal, you’re disappointed to see a Powershell prompt. Let’s fix that …

## tl;dr

1. Set your integrated shell:  
     ```json
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\wsl.exe"
    ```
2. Install the [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
3. Open your project from the Linux shell
4. Install extensions in WSL
 
## Use the right shell

[By default](https://code.visualstudio.com/docs/terminal/basics#_terminal-shells), VS Code uses Powershell on Windows 10, but it’s easy to change. Just set the path to your WSL executable as the integrated shell for Windows in your settings:

1. Click the gear icon near the lower left corner.
2. Click Settings, then click the curly braces near the upper right corner.
    - This opens the `settings.json` file directly rather than using the GUI to change the setting. If you prefer the GUI, read more below.
3. Add a property for `terminal.integrated.shell.windows` and set it to the full path to `wsl.exe`.
    - You have to double-up the backslashes in the path definition because JSON uses the backslash as an escape character.
    - Don’t forget to add a comma at the end of the previous entry, or at the end of this new entry if you’re not putting it at the end.

```json
"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\wsl.exe"
```

<details>
    <summary>If you prefer to change settings in the GUI: </summary>  
    <ol>
       <li>Click the gear icon near the lower left corner.</li>
       <li>Click Settings.</li>
       <li>Enter *integrated shell windows* into the Search Settings field.</li>
       <li>Enter the full path to wsl.exe as the value of the Terminal﹥Integrated﹥Shell: Windows</li>
    </ol>
</details>

Note that this has to go in the User settings. For “[enhanced security](https://code.visualstudio.com/docs/getstarted/settings#_settings-and-security)“, you can’t set a different shell for each workspace (project).

## Make VS Code work *in* Linux

We’ve configured VS Code to open the Linux shell in the integrated terminal, but it still runs itself in the Windows environment. This is a problem for extensions that work by processing the output of command line tools. You could install them in the Windows shell, but you you wouldn’t be here if you wanted to work in the Windows shell. Besides, most of these tools were written for a Unix-like shell. Installation on Windows usually isn’t easy, well-documented, or frequently updated when compared to installation in a Linux shell.

As of the [May 2019 release](https://code.visualstudio.com/updates/v1_35) (or sooner if you’re using [VS Code Insiders](https://code.visualstudio.com/insiders/)), Microsoft has provided a solution for this problem in the [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack). [Remote – WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) (included in the pack) allows VS Code, running from Windows, to work with your code in the Linux shell.

## Install Extensions in WSL

Now that everything’s ready to go, you have to tell VS Code which of your extensions you want to work in WSL. Extensions that are already installed locally will have an “Install on WSL” button. Extensions that aren’t installed yet will install on WSL by default when you’re working in a WSL project.
