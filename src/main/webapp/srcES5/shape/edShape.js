'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
var EDShape = function (_ImageShape) {
    _inherits(EDShape, _ImageShape);

    function EDShape(name) {
        _classCallCheck(this, EDShape);

        var _this = _possibleConstructorReturn(this, (EDShape.__proto__ || Object.getPrototypeOf(EDShape)).call(this, '/resources/ed.svg', name));

        _this.SHAPE_ID = 'OG.shape.doosan.ed';
        return _this;
    }

    return EDShape;
}(ImageShape);