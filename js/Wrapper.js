/**
 * Обёртка для запуска основного модуля.
 *
 * @class
 * @singleton
 */
Wrapper = new function(){
    // ========================================================================
    // FIELDS
    // ========================================================================
    var passlenList = get('passlen-field');
    var passTemplateList = get('pass-template');
    var passInput = get('pass-target-input');
    var varAmount = get('info-variants-amount');
    var lenRange = [3, 16];
    var defaultLen = 8;
    var defaultTemplate = 0;

    // ========================================================================
    // METHODS
    // ========================================================================
    /**
     * Хэлпер для краткого доступа к getElementById.
     *
     * @private
     * @param id
     * @returns {HTMLElement}
     */
    function get(id){
        return document.getElementById(id)
    }

    /**
     * Логирование.
     *
     * @private
     * @type {Function}
     */
    var log = console? console.log : function(){};
    //window.get = get; //DEBUG

    /**
     * Запуск генерации пароля.
     *
     * @private
     */
    function launchGenerate(){
        try{
            OktoPass.setSymbols(SymStorage[parseInt(passTemplateList.value)].symbols);
            OktoPass.setPasslen(parseInt(passlenList.value));
            passInput.value = OktoPass.getPass();
            varAmount.innerHTML = OktoPass.getVariantsAmount();
        }
        catch(err){
            log('launchGenerate failed: ' + err);
        }

	    return false;
	}

    /**
     * Заполнить список с вариантами для длины пароля.
     *
     * @private
     */
    function populatePassLenList(){
        for (var i = lenRange[0], max = lenRange[1] + 1, option; i < max; i++){
            option = document.createElement('option');
            option.value = option.text = i;

            if (defaultLen == i) {
                option.selected = true;
            }

            passlenList.add(option, null);
        }
    }

    /**
     * Заполнить список с вариантами шаблонов пароля.
     *
     * @private
     */
    function populatePassTemplatesList(){
        for (var i = 0, max = SymStorage.length, option; i < max; i++){
            option = document.createElement('option');
            option.value = i;
            option.text = SymStorage[i].desc;

            if (defaultTemplate == i) {
                option.selected = true;
            }

            passTemplateList.add(option, null);
        }
    }

    /**
     * public static void
     * @static
     */
    this.main = function(){
        // Кнопка "Генерировать"
        get('btn-generate').onclick = launchGenerate;

        populatePassTemplatesList();
        populatePassLenList();
        launchGenerate();
    }
}

Wrapper.main();
