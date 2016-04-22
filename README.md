# OktoPass — Генератор паролей на JavaScript

### Введение
Генератор написан для абонентского отдела на одном из предыдущих мест моей работы в 2010 году.

### Описание
Приложение использует три js-скрипта:
* `OktoPass.js` - главный модуль, содержащий всю логику генератора.
* `SymStorage.js` - хранилище шаблонов для генерации.
* `Wrapper.js` - обслуживающий модуль, обёртка для вставки результатов работы генератора в DOM.

Шаблоны для генерации описаны в виде структуры:
```js
SymStorage = [
    {
        desc: '',
        symbols: []
    },
    //...
]    
```
Это массив объектных литералов, содержащих поля с описанием шаблона и набором
символов, из которых будет сгенерирован пароль. Как видно, создать свой шаблон
не представляет сложности.

Модуль `Wrapper` содержит метод `main()`, который инициируется при каждой загрузке скрипта (страницы).  
Модуль устанавливает дефолтные шаблон и длину пароля (приватные переменные `defaultLen`, `defaultTemplate`), рендерит списки опций и вешает обработчик `launchGenerate()` на кнопку _Генерировать_ (обработчик также единожды запускается при загрузке скрипта, для того, чтобы сразу получить пароль с дефолтными настройками). Обработчик также обновляет вывод количества возможных варинтов для комбинации данных настроек генератора (вывод метода `OktoPass.getVariantsAmount()`)

Обработчик `launchGenerate()`, пользуясь сеттерами модуля `OktoPass`, устанавливает выбранные из списков значения для длины пароля и шаблона генерации (`OktoPass.setSymbols()`, `OktoPass.setPasslen()`). После чего результат метода `OktoPass.getPass()` вставляется в поле ввода на веб-странице.

### Основной модуль OktoPass
Метод `getPass()` тривиален, и просто возвращает случайный набор символов, пользуясь приватным методом `getRandomSym()`
```js
this.getPass = function(){
    var pass = '', max = passLen;

    while (max--) {
        pass += OktoPass.getRandomSym();
    }

    return pass;
};
```

Метод пользуется встроенным JavaScript-генератором псевдослучайных чисел
```js
function getRandomSym(){
    return symbols[Math.floor(Math.random() * symbols.length)];
};
```

Наконец, количество возможных комбинаций при текущих опциях высчитывается по
формуле (количество символов) ^ (длина пароля).
```js
this.getVariantsAmount = function(){
    return Math.pow(this.getSymbols().length, this.getPassLen());
}
```
