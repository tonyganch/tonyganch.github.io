title:  "CSScomb Core: postprocessor in 15 mins"
date: 2014/07/06
id: "csscomb-core"
show_in_footer: true
translation: "ru/csscomb/csscomb-core"

---

<p class="note">
<strong>TL;DR</strong><br/>
Want to write your own postprocessor but don't want to spend much time?<br/>
Just fork <a href="https://github.com/csscomb/core-template" title="Flip Comb">
a special template</a> and modify it.
</p>

This summer <a href="https://github.com/csscomb/csscomb.js" tile="CSScomb
on GitHub">CSScomb.js</a> turns 1 year.<br/>
<a href="https://github.com/csscomb/csscomb.js/graphs/contributors"
title="CSScomb contributors">We</a> have spent this time working on amazing
project which is now easy to maintain and easy to scale.<br/>
Today I'd love to share a part of our work which will help you create your own
projects.

### CSScomb Core

The heart of our tool is now available as a separate module — <a href="https://github.com/csscomb/core" title="CSScomb Core on GitHub">CSScomb Core</a>.<br/>
You can use it to write different postprocessors.<br/>
I've made <a href="https://github.com/csscomb/core-template" title="Flip Comb on
GitHub">a template repo</a> to show you how simple it is.<br/>
Just fork it and play with code.

### What's inside

<ol>
<li>
<p><b>Parser with preprocessors support</b></p>
<p>
Our tool is based on <a href="https://github.com/tonyganch/gonzales-pe"
title="Gonzales PE">Gonzales PE</a>.<br/>
This parser can process not only CSS, but preprocessors too: LESS, Sass and
SCSS.
</p></li>

<li>
<p><b>API to work with configs</b></p>
<p>
Sometimes postprocessors need to be configured.<br/>
CSScomb has <a href="https://github.com/csscomb/csscomb.js/tree/dev/lib/options">25 settings</a>, for example.<br/>
As a user you can write
<a href="https://github.com/csscomb/csscomb.js/blob/dev/config/csscomb.json">
a config file</a> to set the options you need.<br/>
And it's easy to apply that config with CSScomb Core:<br/>
<pre><code>var config = require('path/to/config.json');
core.configure(config);</code></pre>
</p></li>

<li>
<p><b>API to write and use plugins</b></p>
<p>
Every option is an
<a href="https://github.com/csscomb/core#writing-a-plugin" title="Writing a plugin">independent plugin</a>.<br/>
To use a plugin, just put it in a special directory
(<a href = "https://github.com/csscomb/core-template/blob/master/lib/flip-comb.js#L9">see Flip Comb for an example</a>)
or apply it with two lines of code:
<pre><code>var option = require('path/to/option');
core.use(option);</code></pre>
</p>
</li>

<li>
<p><b>API to work with files</b></p>
<p>
Whether you want to process a single file or a whole directory — it's easy to
get done.<br/>
We take care of syntax detection and working with file system:
<pre><code>core.processString(string, syntax);
core.processFile('path/to/file.css');
core.processDirectory('path/to/dir');</code></pre>
</p></li></ol>

### Get started

There is a <a href="https://github.com/csscomb/core-template">tiny template</a>
I've made to help you get started.<br/>
The postprocessor is called Flip Comb and all it does is replace comments in CSS
files with <code>/* (╯°□°）╯︵ ┻━┻ */</code>.<br/>
It took me 15 minutes to write those two files.<br/>
The result is pretty useless, but you can learn something from it.

Just fork the repo and play around.<br/>
When you are ready to go further,
<a href="https://github.com/csscomb/core">read docs</a> for more
information.<br/>
Have fun!
