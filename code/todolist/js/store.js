((exports) => {
    'use strict';

    let STORAGE_KEY = 'todos-vuejs';

    exports.todoStorage = {
        fetch() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save(tasks) {
            if (tasks != null)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }
})(window)