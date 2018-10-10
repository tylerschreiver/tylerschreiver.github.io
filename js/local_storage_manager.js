window.fakeStorage = {
    _data: {},

    setItem: function (id, val) {
        return this._data[id] = String(val);
    },

    getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function (id) {
        return delete this._data[id];
    },

    clear: function () {
        return this._data = {};
    }
};

function LocalStorageManager() {
    this.bestScore3Key = "bestScore3";
    this.bestScore4Key = "bestScore4";
    this.gameStateKey = "gameState";
    this.gameMode = "fourByFour";

    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.changeGameType = function (type) {
    this.gameMode = type;
}

LocalStorageManager.prototype.localStorageSupported = function () {
    var testKey = "test";

    try {
        var storage = window.localStorage;
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
    var whichKey = this.gameMode == "fourByFour" ? this.bestScore4Key : this.bestScore3Key;
    return this.storage.getItem(whichKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
    var whichKey = this.gameMode == "fourByFour" ? this.bestScore4Key : this.bestScore3Key;
    this.storage.setItem(whichKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
    var stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
    this.storage.removeItem(this.gameStateKey);
};
