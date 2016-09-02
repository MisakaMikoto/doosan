'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 17..
 */
var EdgeShape = function (_OG$EdgeShape) {
    _inherits(EdgeShape, _OG$EdgeShape);

    function EdgeShape(_ref, _ref2) {
        var _ref4 = _slicedToArray(_ref, 2);

        var x = _ref4[0];
        var y = _ref4[1];

        var _ref3 = _slicedToArray(_ref2, 2);

        var width = _ref3[0];
        var height = _ref3[1];

        _classCallCheck(this, EdgeShape);

        var _this = _possibleConstructorReturn(this, (EdgeShape.__proto__ || Object.getPrototypeOf(EdgeShape)).call(this, [x, y], [width, height]));

        _this.SHAPE_ID = 'OG.shape.doosan.edge';

        _this.SELECTABLE = false;
        _this.LABEL_EDITABLE = false;
        _this.RESIZABLE = false;
        _this.MOVABLE = false;

        _this.CONNECT_CLONEABLE = false;
        _this.CONNECTABLE = false;
        _this.DELETABLE = false;
        return _this;
    }

    return EdgeShape;
}(OG.EdgeShape);