title:  "CSScomb Core: постпроцессор за 15 мин"
date: 2014/07/06
id: "csscomb-core"
translation: "/csscomb/csscomb-core"

---

<p class="note">
<strong>TL;DR</strong><br/>
Как написать постпроцессор, потратив минимум времени?<br/>
Форкнуть <a href="https://github.com/csscomb/core-template" title="Flip Comb">
специальный шаблон</a> и изменить его под свои нужды.
</p>

JS-версии проекта [CSScomb](https://github.com/csscomb/csscomb.js) этим летом
исполняется год.  
За это время [мы](https://github.com/csscomb/csscomb.js/graphs/contributors)
сделали прекрасный инструмент, который легко поддерживать и
расширять.  
И сегодня я хочу поделиться с вами лучшей частью нашей работы.

### CSScomb Core

Ядро проекта теперь доступно в виде отдельного модуля —
[CSScomb Core](https://github.com/csscomb/core).  
На его основе вы быстро напишете любой постпроцессор.  
А чтобы показать, как это просто, я сделала шаблон —
[Flip Comb](https://github.com/csscomb/core-template), который легко форкнуть и
изменить.

### Что под капотом

<ol>
<li>
<p><b>Парсер с поддержкой препроцессоров</b></p>
<p>
В основе CSScomb Core лежит
<a href="https://github.com/tonyganch/gonzales-pe" title="Gonzales PE">
Gonzales PE</a>.<br/>
Этот парсер умеет работать не только с CSS, но и препроцессорными языками:
LESS, Sass и SCSS.<br/>
</p></li>

<li>
<p><b>Работа с конфигами</b></p>
<p>
Иногда постпроцессорам нужны настройки.<br/>
В CSScomb, например, их <a
href="https://github.com/csscomb/csscomb.js/tree/dev/lib/options">25</a>.<br/>
При этом пользователь может сам указать, какие именно ему нужны.<br/>
Для этого используются <a
href="https://github.com/csscomb/csscomb.js/blob/dev/config/csscomb.json"
title="csscomb.json">файлы конфигураций</a>.<br/>
Работать с ними проще простого:
<pre><code>var config = require('path/to/config.json');
core.configure(config);</code></pre>
</p></li>

<li>
<p><b>Модульность</b></p>
<p>
Каждая опция — это плагин.<br/>
Чтобы добавить плагин, его файл достаточно положить в общую папку
(<a href = "https://github.com/csscomb/core-template/blob/master/lib/flip-comb.js#L9">как это сделано в Flip Comb</a>)
или подключить парой строк:
<pre><code>var option = require('path/to/option');
core.use(option);</code></pre>
</p>
</li>

<li>
<p><b>Работа с файлами и директориями</b></p>
<p>
Обрабатывать строки, файлы или целые директории — вы сами решаете, что
удобнее.<br/>
Работу с файловой системой и определением синтаксиса мы забрали на себя:
<pre><code>core.processString(string, syntax);
core.processFile('path/to/file.css');
core.processDirectory('path/to/dir');</code></pre>
</p></li></ol>

### Как начать

Чтобы вам было проще начать, я сделала
[маленький шаблон](https://github.com/csscomb/core-template).  
Постпроцессор называется Flip Comb, и всё, что он делает — заменяет комментарии
в CSS-файлах на <code>/* (╯°□°）╯︵ ┻━┻ */</code>.  
На написание двух файлов у меня ушло 15 минут.  
Результат бесполезный, но для образовательных целей — самое то.

Форкните репозиторий и поиграйте с кодом.  
А когда почувствуете, что примера уже мало,
[открывайте документацию](https://github.com/csscomb/core).  
Там много интересного.  
Have fun!
