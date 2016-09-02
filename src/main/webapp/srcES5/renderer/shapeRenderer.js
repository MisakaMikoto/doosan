'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
var ShapeRenderer = function (_Renderer) {
    _inherits(ShapeRenderer, _Renderer);

    function ShapeRenderer() {
        _classCallCheck(this, ShapeRenderer);

        var _this = _possibleConstructorReturn(this, (ShapeRenderer.__proto__ || Object.getPrototypeOf(ShapeRenderer)).call(this));

        _this._shape = '';
        _this._option = '';
        return _this;
    }

    _createClass(ShapeRenderer, [{
        key: 'render',
        value: function render() {
            // edge
            if (this.shape instanceof EdgeShape) {
                return this.canvas.drawShape(null, this.shape, null, { 'edge-type': 'plain', "arrow-start": "none", "arrow-end": "none" });
            } else {
                this.autoIncreaseCanvasSize(this.shape);
                this.autoIncreaseLaneSize(this.shape);

                return this.canvas.drawShape([this.shape.x, this.shape.y], this.shape, [this.shape.width, this.shape.height], this.option);
            }
        }
    }, {
        key: 'shape',
        set: function set(shape) {
            this._shape = shape;
        },
        get: function get() {
            return this._shape;
        }
    }, {
        key: 'option',
        set: function set(option) {
            this._option = option;
        },
        get: function get() {
            return this._option;
        }
    }]);

    return ShapeRenderer;
}(Renderer);