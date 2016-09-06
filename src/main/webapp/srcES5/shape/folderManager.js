'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 2..
 */
var FolderManager = function (_ImageShape) {
    _inherits(FolderManager, _ImageShape);

    function FolderManager(name) {
        _classCallCheck(this, FolderManager);

        var _this = _possibleConstructorReturn(this, (FolderManager.__proto__ || Object.getPrototypeOf(FolderManager)).call(this, './resources/collapse.svg', name));

        _this.SHAPE_ID = 'OG.shape.doosan.folderManager';

        _this._type = '';
        return _this;
    }

    _createClass(FolderManager, [{
        key: 'type',
        set: function set(type) {
            this._type = type;
        },
        get: function get() {
            return this._type;
        }
    }]);

    return FolderManager;
}(ImageShape);