'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 9..
 */
var LaneShape = function (_OG$GroupShape) {
    _inherits(LaneShape, _OG$GroupShape);

    function LaneShape(workFlowType) {
        _classCallCheck(this, LaneShape);

        var _this = _possibleConstructorReturn(this, (LaneShape.__proto__ || Object.getPrototypeOf(LaneShape)).call(this));

        _this.SHAPE_ID = 'OG.shape.doosan.' + workFlowType;

        _this.LABEL_EDITABLE = false;
        _this.RESIZABLE = false;
        _this.MOVABLE = false;

        _this.CONNECT_CLONEABLE = false;
        _this.CONNECTABLE = false;
        _this.DELETABLE = false;

        _this._children = [];
        _this._laneType = '';
        return _this;
    }

    _createClass(LaneShape, [{
        key: 'children',
        set: function set(children) {
            this._children = children;
        },
        get: function get() {
            return this._children;
        }
    }, {
        key: 'laneType',
        set: function set(laneType) {
            this._laneType = laneType;
        },
        get: function get() {
            return this._laneType;
        }
    }]);

    return LaneShape;
}(OG.GroupShape);