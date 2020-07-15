"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollManager = exports.ScrollItem = void 0;
// @TODO handle horizontal scrolling as well as vertical!
var ScrollItem = /** @class */ (function () {
    function ScrollItem(provider, data, top, height) {
        this.provider = provider;
        this.top = top;
        this.bottom = top + height;
        this._data = data;
        this._render = null;
    }
    ScrollItem.prototype.update = function (vTop, vBottom) {
        if (this._render != null) {
            if (this.top > vBottom || this.bottom < vTop) {
                this.remove();
                return;
            }
            // move the item
            this.move(vTop);
        }
        else {
            if (this.top <= vBottom && this.bottom >= vTop) {
                this.add();
                this.move(vTop);
            }
        }
    };
    ScrollItem.prototype.remove = function () {
        this.provider.returnItem(this._render);
        this._render = null;
    };
    ScrollItem.prototype.add = function () {
        this._render = this.provider.getItem(this._data);
    };
    ScrollItem.prototype.move = function (to) {
        // ?
        if (this._render) {
            this._render.setPosition(null, this.top - to);
        }
    };
    Object.defineProperty(ScrollItem.prototype, "visible", {
        get: function () {
            return (this._render != null);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollItem.prototype, "render", {
        get: function () {
            return this._render;
        },
        enumerable: false,
        configurable: true
    });
    return ScrollItem;
}());
exports.ScrollItem = ScrollItem;
var ScrollManager = /** @class */ (function () {
    function ScrollManager(height) {
        this.items = [];
        this.scrollTop = 0;
        this.height = height;
    }
    ScrollManager.prototype.addItem = function (item) {
        this.items.push(item);
        this._updateItems();
    };
    ScrollManager.prototype.scrollTo = function (top) {
        this.scrollTop = top;
        this._updateItems();
    };
    ScrollManager.prototype._updateItems = function () {
        var vTop = this.scrollTop;
        var vBottom = vTop + this.height;
        this.items.forEach(function (item) {
            item.update(vTop, vBottom);
        });
    };
    Object.defineProperty(ScrollManager.prototype, "itemSize", {
        get: function () {
            var reducer = function (acc, current) {
                acc.min = Math.min(acc.min, current.top);
                acc.max = Math.max(acc.max, current.bottom);
                return acc;
            };
            return this.items.reduce(reducer, { min: Number.MAX_VALUE, max: Number.MIN_VALUE });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "activeItems", {
        get: function () {
            return this.items.filter(function (item) { return item.visible == true; });
        },
        enumerable: false,
        configurable: true
    });
    return ScrollManager;
}());
exports.ScrollManager = ScrollManager;
