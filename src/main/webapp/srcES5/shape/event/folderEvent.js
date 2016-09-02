'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
var FolderEvent = function (_ShapeEvent) {
    _inherits(FolderEvent, _ShapeEvent);

    function FolderEvent() {
        _classCallCheck(this, FolderEvent);

        return _possibleConstructorReturn(this, (FolderEvent.__proto__ || Object.getPrototypeOf(FolderEvent)).call(this));
    }

    // TODO : editorLayout refactoring


    _createClass(FolderEvent, [{
        key: 'add',
        value: function add(selectedFolderShape, canvas) {
            if (this.validateLevel(selectedFolderShape)) {
                alert('Folder Maximum Level is 6. Failed Create Folder !!');
            } else {
                var editorLayout = new EditorLayout();
                editorLayout.canvas = canvas;

                var children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
                var folderManager = editorLayout.getRightFolderManager(selectedFolderShape);

                if (typeof selectedFolderShape.shape == 'undefined' && selectedFolderShape.shape.edShapes.length == 0 && selectedFolderShape.shape.folderShapes.length > 0) {
                    this.insert(editorLayout, folderManager, selectedFolderShape);
                } else {
                    var folderShape = new FolderShape();
                    folderShape.parentId = selectedFolderShape.shape.id;
                    folderShape.index = children.length == 0 ? selectedFolderShape.shape.index : children.pop().shape.index + 1;
                    folderShape.level = folderManager.shape.level + 1;
                    folderShape.direction = 'right';
                    folderShape.workFlowType = selectedFolderShape.shape.workFlowType;

                    var createdFolderShape = editorLayout.renderFolderShape(folderShape, folderManager);
                    editorLayout.renderEdgeShape(folderManager, createdFolderShape);

                    var createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdFolderShape, 'right');
                    editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);
                }
            }
        }

        // TODO : editorLayout refactoring

    }, {
        key: 'insert',
        value: function insert(editorLayout, folderManager, selectedFolderShape) {
            var folderManagerNextShape = editorLayout.canvas._RENDERER.getNextShapes(folderManager);

            var folderShape = new FolderShape();
            folderShape.parentId = selectedFolderShape.shape.id;
            folderShape.index = folderManager.shape.index;
            folderShape.level = folderManager.shape.level + 1;
            folderShape.direction = 'right';
            folderShape.workFlowType = selectedFolderShape.shape.workFlowType;

            var createdFolderShape = editorLayout.renderFolderShape(folderShape, folderManager);
            editorLayout.renderEdgeShape(folderManager, createdFolderShape);

            var createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdFolderShape, 'right');
            editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);

            for (var i in folderManagerNextShape) {
                var edShape = folderManagerNextShape[i];
                var prevEdges = editorLayout.canvas._RENDERER.getPrevEdges(edShape);

                for (var _i in prevEdges) {
                    editorLayout.canvas._RENDERER.remove(prevEdges[_i]);
                }
                editorLayout.renderEdgeShape(createdFolderManagerShape, edShape);

                edShape.shape.parentId = createdFolderShape.shape.id;
                edShape.shape.index = createdFolderManagerShape.shape.index;
                edShape.shape.level = createdFolderManagerShape.shape.level + Number(i);
                // margin 75 twice and manager width
                edShape.shape.x = edShape.shape.x + 75 * 2 + 20;
                edShape.shape.y = createdFolderManagerShape.shape.y;

                editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);

                var renderer = new Renderer();
                renderer.canvas = editorLayout.canvas;
                renderer.replaceShape(edShape, 'right', 2);
            }
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
    }, {
        key: 'validateLevel',
        value: function validateLevel(selectedFolderShape) {
            if (selectedFolderShape.shape.level > 5) {
                return true;
            } else {
                return false;
            }
        }
    }]);

    return FolderEvent;
}(ShapeEvent);