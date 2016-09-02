'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 2..
 */
var ImageShape = function (_OG$shape$ImageShape) {
    _inherits(ImageShape, _OG$shape$ImageShape);

    function ImageShape(src, name) {
        _classCallCheck(this, ImageShape);

        var _this = _possibleConstructorReturn(this, (ImageShape.__proto__ || Object.getPrototypeOf(ImageShape)).call(this, src, name));

        _this._src = src;

        _this.LABEL_EDITABLE = false;
        _this.RESIZABLE = false;
        _this.MOVABLE = false;

        _this.CONNECT_CLONEABLE = false;
        _this.CONNECTABLE = false;
        _this.DELETABLE = false;

        _this.label = name;

        _this._x = '';
        _this._y = '';

        _this._width = '';
        _this._height = '';

        _this._level = '';
        _this._index = '';

        _this._parentId = '';
        _this._direction = '';
        _this._workFlowType = '';
        return _this;
    }

    _createClass(ImageShape, [{
        key: 'src',
        set: function set(src) {
            this._src = src;
        },
        get: function get() {
            return this._src;
        }
    }, {
        key: 'x',
        set: function set(x) {
            this._x = Number(x);
        },
        get: function get() {
            return Number(this._x);
        }
    }, {
        key: 'y',
        set: function set(y) {
            this._y = Number(y);
        },
        get: function get() {
            return Number(this._y);
        }
    }, {
        key: 'width',
        set: function set(width) {
            this._width = Number(width);
        },
        get: function get() {
            return Number(this._width);
        }
    }, {
        key: 'height',
        set: function set(height) {
            this._height = Number(height);
        },
        get: function get() {
            return Number(this._height);
        }
    }, {
        key: 'level',
        set: function set(level) {
            this._level = Number(level);
        },
        get: function get() {
            return this._level;
        }
    }, {
        key: 'index',
        set: function set(index) {
            this._index = Number(index);
        },
        get: function get() {
            return Number(this._index);
        }
    }, {
        key: 'parentId',
        set: function set(parentId) {
            this._parentId = parentId;
        },
        get: function get() {
            return this._parentId;
        }
    }, {
        key: 'direction',
        set: function set(direction) {
            this._direction = direction;
        },
        get: function get() {
            return this._direction;
        }
    }, {
        key: 'workFlowType',
        set: function set(workFlowType) {
            this._workFlowType = workFlowType;
        },
        get: function get() {
            return this._workFlowType;
        }
    }]);

    return ImageShape;
}(OG.shape.ImageShape);