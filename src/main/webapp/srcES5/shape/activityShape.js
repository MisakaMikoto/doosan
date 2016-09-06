'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
var ActivityShape = function (_ImageShape) {
    _inherits(ActivityShape, _ImageShape);

    function ActivityShape(name) {
        _classCallCheck(this, ActivityShape);

        var _this = _possibleConstructorReturn(this, (ActivityShape.__proto__ || Object.getPrototypeOf(ActivityShape)).call(this, './resources/activity.svg', name));

        _this.SHAPE_ID = 'OG.shape.doosan.activity';

        _this._leftFolderShapes = [];
        _this._rightFolderShapes = [];

        _this.CONNECTABLE = true;
        return _this;
    }

    _createClass(ActivityShape, [{
        key: 'leftFolderShapes',
        set: function set(leftFolderShapes) {
            this._leftFolderShapes = leftFolderShapes;
        },
        get: function get() {
            return this._leftFolderShapes;
        }
    }, {
        key: 'rightFolderShapes',
        set: function set(rightFolderShapes) {
            this._leftFolderShapes = rightFolderShapes;
        },
        get: function get() {
            return this._rightFolderShapes;
        }
    }]);

    return ActivityShape;
}(ImageShape);