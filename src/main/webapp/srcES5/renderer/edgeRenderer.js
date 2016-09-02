'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
var EdgeRenderer = function (_Renderer) {
    _inherits(EdgeRenderer, _Renderer);

    function EdgeRenderer() {
        _classCallCheck(this, EdgeRenderer);

        var _this = _possibleConstructorReturn(this, (EdgeRenderer.__proto__ || Object.getPrototypeOf(EdgeRenderer)).call(this));

        _this._from = '';
        _this._to = '';
        _this._edge = '';
        _this._style = '';
        return _this;
    }

    _createClass(EdgeRenderer, [{
        key: 'render',
        value: function render() {
            var fromTerminal = this.canvas._RENDERER.createDefaultTerminalString(this.from);
            var toTerminal = this.canvas._RENDERER.createDefaultTerminalString(this.to);

            return this.canvas._RENDERER.connect(fromTerminal, toTerminal, this.edge, this.style);
        }
    }, {
        key: 'from',
        set: function set(from) {
            this._from = from;
        },
        get: function get() {
            return this._from;
        }
    }, {
        key: 'to',
        set: function set(to) {
            this._to = to;
        },
        get: function get() {
            return this._to;
        }
    }, {
        key: 'edge',
        set: function set(edge) {
            this._edge = edge;
        },
        get: function get() {
            return this._edge;
        }
    }, {
        key: 'style',
        set: function set(style) {
            this._style = new OG.geometry.Style(style);
        },
        get: function get() {
            return this._style;
        }
    }]);

    return EdgeRenderer;
}(Renderer);