title:  "git reset: time machine"
date: 2013/11/26
id: "git-reset"
show_in_footer: true
translation: "/ru/git/reset"

---

The most terrifying git commands are `git reset --hard` and `git push --force`.    
Things get even worse when you run them by accident in repository shared with
dozens of collegues.    
Good news! You can always run `git reset` for a quick fix.

### Silver bullet

Команда на все случаи, когда нужно что-то отменить:

    $ git reset --hard <commit>

`<commit>` в данном случае — та точка, к которой нужно откатиться.

Гит — лапочка и записывает абсолютно всё, что делает: новые коммиты, переключения
между ветками, переписывание истории.    
Всё, что вам нужно — научиться читать логи.

### Отменить `git push --force`

Если вы сделали форс-пуш и быстро поняли, что сделали его не туда, ситуацию
легко поправить.    
Главное — не паниковать.    

    $ git push --force origin master

    Counting objects: 3, done.
    ...
    a1a1a1..b2b2b2 master -> master

Последняя строка говорит, что до пуша последний коммит в удалённом мастере был
`a1a1a1`, а после пуша последним коммитом стал `b2b2b2`.    
Вооружённые этим знанием, делаем `reset` и ещё один форс-пуш, на этот раз
возвращая предыдущее состояние ветки:

    $ git reset --hard a1a1a1
    $ git push origin +master

<p class="note">
<code>`git push -f origin master`</code> и <code>`git push origin +master`</code> —
одно и то же.
</p>

Если провернуть всё быстро, никто ничего не заметит.

### Отменить `git reset --hard`

<p class="note">
Этот трюк сработает только для закоммиченных изменений.
</p>

Бывает, что пара последних коммитов в ветке — лишние.    
Вы делаете `git reset --hard HEAD~3`, но случайно удаляете 1 лишний коммит.    
На сервер ещё ничего не запушено, сделать `git pull` неоткуда.    
Что делать?    
Открываем reflog:

    $ git reflog

    c3c3c3 HEAD@{0} reset: moving to HEAD~3
    b2b2b2 HEAD@{1} commit: Clean up
    a1a1a1 HEAD@{2} commit (amend): Fix #42
    ...

Ваша задача — найти в этом логе тот пункт, к которому вы хотите вернуться.    
В нашем случае мы хотим отменить последнее действие, то есть вернуться ко второй
строке.    
Делаем хитрый `reset`:

    $ git reset --hard HEAD@{1}

    HEAD is now at b2b2b2 Clean up

Вуаля, неудачного `reset --hard` как не бывало.    
Что же мы сделали?    

`git reset --hard HEAD@{1}` буквально значит: «Хэй, гит, покажи мне файлы в том
виде, в каком они были 1 действие назад».    
Обратите внимание, что под действием имеется в виду запись в рефлоге.
Например, если вы сделаете `git reset -i HEAD~6`, в зависимости от того, что вы
натворите во время рибейза, в логе может появиться хоть 20 новых записей.    
И каждую из них можно использовать для `reset`.

Вместо `HEAD@{1}` можно использовать более замысловатые указания, например:

    $ git reset --hard master@{one.week.ago}

Этой командой мы просим показать мастер недельной давности.    
О том, как ещё можно указать нужный коммит, [читайте в
документации](http://git-scm.com/docs/gitrevisions.html).

### Отменить `git rebase -i`

По тому же принципу можно отменить и недавний `rebase`:

    $ git reflog

    c3c3c3 HEAD@{1}: rebase -i (finish): returning to refs/heads/branch
    b2b2b2 HEAD@{2}: rebase -i (pick): Add cool method
    a1a1a1 HEAD@{3}: checkout: moving from branch to a1a1a1
    a1a1a1 HEAD@{4}: commit (amend): Add cool method
    ...

Ищем коммит перед чекаутом и откатываемся:

    $ git reset --hard HEAD@{4}

