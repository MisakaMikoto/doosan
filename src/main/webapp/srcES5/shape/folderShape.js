'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
var FolderShape = function (_ImageShape) {
    _inherits(FolderShape, _ImageShape);

    function FolderShape(name) {
        _classCallCheck(this, FolderShape);

        var _this = _possibleConstructorReturn(this, (FolderShape.__proto__ || Object.getPrototypeOf(FolderShape)).call(this, '/resources/folder.svg', name));

        _this.SHAPE_ID = 'OG.shape.doosan.folder';

        _this._folderShapes = [];
        _this._edShapes = [];
        return _this;
    }

    _createClass(FolderShape, [{
        key: 'folderShapes',
        set: function set(folderShapes) {
            this._folderShapes = folderShapes;
        },
        get: function get() {
            return this._folderShapes;
        }
    }, {
        key: 'edShapes',
        set: function set(edShapes) {
            this._edShapes = edShapes;
        },
        get: function get() {
            return this._edShapes;
        }
    }]);

    return FolderShape;
}(ImageShape);