'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
var EDEvent = function (_ShapeEvent) {
    _inherits(EDEvent, _ShapeEvent);

    function EDEvent() {
        _classCallCheck(this, EDEvent);

        return _possibleConstructorReturn(this, (EDEvent.__proto__ || Object.getPrototypeOf(EDEvent)).call(this));
    }

    // TODO : editorLayout refactoring


    _createClass(EDEvent, [{
        key: 'add',
        value: function add(selectedFolderShape, canvas) {
            var editorLayout = new EditorLayout();
            editorLayout.canvas = canvas;

            var children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
            var folderManager = editorLayout.getRightFolderManager(selectedFolderShape);

            var edShape = new EDShape();
            edShape.parent = selectedFolderShape.shape.id;
            edShape.index = children.length == 0 ? selectedFolderShape.shape.index : children.pop().shape.index + 1;
            edShape.level = children.length == 0 ? folderManager.shape.level + 1 : children.pop().shape.level;
            edShape.direction = 'right';
            edShape.workFlowType = selectedFolderShape.shape.workFlowType;

            var createdEDShape = editorLayout.renderEDShape(edShape, folderManager);
            editorLayout.renderEdgeShape(folderManager, createdEDShape);
        }
    }, {
        key: 'share',
        value: function share(sourceShape, targetShape, canvas) {
            var editorLayout = new EditorLayout();
            editorLayout.canvas = canvas;
            editorLayout.renderShare(sourceShape, targetShape);
        }
    }, {
        key: 'remove',
        value: function remove() {}
    }]);

    return EDEvent;
}(ShapeEvent);