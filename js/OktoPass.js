/**
 * Генератор простых паролей.
 *
 * @class
 * @singleton
 */
OktoPass = new function(){
    // ========================================================================
    // FIELDS
    // ========================================================================
    /**
     * Массив с дозволенными симловами в пароле.
     *
     * @type {Array}
     */
    var symbols;

    /**
     * Длина пароля.
     *
     * @type {Number}
     */
    var passLen = 8;

    // ========================================================================
    // METHODS
    // ========================================================================
    /**
     * Генерировать из символов случайный пароль.
     *
     * @static
     * @param {HTMLElement} elem Поле, куда будет записан пароль
     */
    this.getPass = function(){
        var pass = '', max = passLen;

        while (max--) {
            pass += getRandomSym();
        }

        return pass;
    };

    /**
     * Возвращает случайный символ из массива symbols.
     *
     * @private
     * @return {String|Number}
     */
    function getRandomSym(){
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    /**
     * Получить количество вариантов для текущей конфигурации генератора.
     *
     * @static
     * @return {Number}
     */
    this.getVariantsAmount = function(){
        return Math.pow(this.getSymbols().length, this.getPassLen());
    }

    // ========================================================================
    // ACCESSORS
    // ========================================================================
    this.getPassLen = function(){
        return passLen;
    }
    this.setPasslen = function(newLen){
        passLen = newLen;
    }

    this.getSymbols = function(){
        return symbols;
    }
    this.setSymbols = function(newSymbols){
        symbols = newSymbols;
    }
}

