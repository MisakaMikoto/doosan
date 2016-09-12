'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 3..
 */
var FolderManagerEvent = function (_ShapeEvent) {
    _inherits(FolderManagerEvent, _ShapeEvent);

    function FolderManagerEvent() {
        _classCallCheck(this, FolderManagerEvent);

        return _possibleConstructorReturn(this, (FolderManagerEvent.__proto__ || Object.getPrototypeOf(FolderManagerEvent)).call(this));
    }

    _createClass(FolderManagerEvent, [{
        key: 'bindClick',
        value: function bindClick(shape) {
            var _this2 = this;

            var layout = new Layout();
            layout.canvas = this.canvas;

            $(shape).bind('click', function (event) {
                var targetShape = event.currentTarget;

                var sharedFolderManager = _this2.getSharedFolderManager(targetShape);
                var sharedNextShapes = _this2.canvas._RENDERER.getNextShapes(sharedFolderManager);
                var sharedAllFolderManager = sharedFolderManager.concat(targetShape);

                var nextShapes = _this2.canvas._RENDERER.getNextShapes(targetShape);
                var sharedAllNextShapes = nextShapes.concat(sharedNextShapes);

                if (targetShape.shape.type == 'close') {
                    _this2.close(sharedAllNextShapes);
                } else if (targetShape.shape.type == 'open') {
                    _this2.open(sharedAllNextShapes);
                } else {
                    ;
                }
                var targetLane = _this2.isInLane(targetShape);
                //layout.replace(targetShape, targetLane);
                _this2.changeMode(sharedAllFolderManager, event.currentTarget.shape.type);
            });
        }
    }, {
        key: 'close',
        value: function close(sharedAllNextShapes) {
            var nextShapeChildShapes = [];
            for (var i in sharedAllNextShapes) {
                var nextShape = sharedAllNextShapes[i];
                $(nextShape).css('display', 'none');

                nextShapeChildShapes = nextShapeChildShapes.concat(this.canvas._RENDERER.getNextShapes(nextShape));

                var prevEdges = this.canvas._RENDERER.getPrevEdges(nextShape);
                for (var _i in prevEdges) {
                    var prevEdge = prevEdges[_i];
                    $(prevEdge).css('display', 'none');
                }
            }

            if (nextShapeChildShapes.length > 0) {
                this.close(nextShapeChildShapes);
            }
        }
    }, {
        key: 'open',
        value: function open(sharedAllNextShapes) {
            var nextShapeChildShapes = [];
            for (var i in sharedAllNextShapes) {
                var nextShape = sharedAllNextShapes[i];
                $(nextShape).css('display', '');

                nextShapeChildShapes = nextShapeChildShapes.concat(this.canvas._RENDERER.getNextShapes(nextShape));

                var prevEdges = this.canvas._RENDERER.getPrevEdges(nextShape);
                for (var _i2 in prevEdges) {
                    var prevEdge = prevEdges[_i2];
                    $(prevEdge).css('display', '');
                }
            }

            if (nextShapeChildShapes.length > 0) {
                this.open(nextShapeChildShapes);
            }
        }
    }, {
        key: 'changeMode',
        value: function changeMode(sharedAllFolderManager, type) {
            if (type == 'close') {
                for (var i in sharedAllFolderManager) {
                    var folderManager = sharedAllFolderManager[i];

                    $(folderManager)[0].shape.type = 'open';
                    $(folderManager).find('image').attr('href', 'resources/expand.svg');
                }
            } else {
                for (var _i3 in sharedAllFolderManager) {
                    var _folderManager = sharedAllFolderManager[_i3];

                    $(_folderManager)[0].shape.type = 'close';
                    $(_folderManager).find('image').attr('href', 'resources/collapse.svg');
                }
            }
        }
    }, {
        key: 'getSharedFolderManager',
        value: function getSharedFolderManager(selectedFolderManager) {
            // 여기 부터 작업
            var sharedFolderManager = [];
            $('[_shape_id="OG.shape.doosan.folderManager"]').each(function (index, element) {
                if (element.shape.id == selectedFolderManager.shape.id) {
                    sharedFolderManager.push(element);
                    return false;
                }
            });
            return sharedFolderManager;
        }
    }, {
        key: 'isInLane',
        value: function isInLane(targetShape) {
            var targetLane = null;
            $('[_shape="GROUP"]').each(function (index, element) {
                var laneOffset = $(element).offset();
                var laneTop = laneOffset.top;
                var laneBottom = laneOffset.top + element.shape.height;
                var laneLeft = laneOffset.left;
                var laneRight = laneOffset.left + element.shape.width;

                var shapeOffset = $(targetShape).offset();
                var shapeTop = shapeOffset.top;
                var shapeBottom = shapeOffset.top + targetShape.shape.height;
                var shapeLeft = shapeOffset.left;
                var shapeRight = shapeOffset.left + targetShape.shape.width;

                if (laneBottom >= shapeBottom && shapeBottom >= laneTop && laneBottom >= shapeTop && shapeTop >= laneTop && laneLeft <= shapeLeft && shapeLeft <= laneRight && laneLeft <= shapeRight && shapeRight <= laneRight) {

                    targetLane = element;
                    return false;
                }
            });
            return targetLane;
        }
    }]);

    return FolderManagerEvent;
}(ShapeEvent);