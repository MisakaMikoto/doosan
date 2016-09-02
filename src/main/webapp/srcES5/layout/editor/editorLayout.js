'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 8. 6..
 */
var EditorLayout = function (_Layout) {
    _inherits(EditorLayout, _Layout);

    function EditorLayout() {
        _classCallCheck(this, EditorLayout);

        var _this = _possibleConstructorReturn(this, (EditorLayout.__proto__ || Object.getPrototypeOf(EditorLayout)).call(this));

        _this._otherWorkFlowData = '';
        _this._myWorkFlowData = '';
        return _this;
    }

    _createClass(EditorLayout, [{
        key: 'drawOtherWorkFlow',
        value: function drawOtherWorkFlow() {
            this.draw(this.otherWorkFlowData);
        }
    }, {
        key: 'drawMyWorkFlow',
        value: function drawMyWorkFlow() {
            this.draw(this.myWorkFlowData);
        }
    }, {
        key: 'renderActivityShape',
        value: function renderActivityShape(activityShape) {
            activityShape.width = 50;
            activityShape.height = 50;

            if (activityShape.workFlowType == 'otherWorkFlow') {
                activityShape.x = 50 + 15;
            } else {
                var firstOtherFlowLane = this.getFirstOtherFLowLaneShape();
                var lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                activityShape.x = firstOtherFlowLane.shape.x + lastOtherFlowLane.shape.width + (lastOtherFlowLane.shape.x + lastOtherFlowLane.shape.width / 2);
            }
            activityShape.y = 90 * (activityShape.index + 1);

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = activityShape;
            var renderActivityShape = shapeRenderer.render();

            var activityEvent = new ActivityEvent();
            activityEvent.canvas = this.canvas;
            activityEvent.bindContextMenu(renderActivityShape, activityShape.workFlowType, 'editorLayout');

            return renderActivityShape;
        }
    }, {
        key: 'renderLaneShape',
        value: function renderLaneShape(laneShape, workFlowType) {
            laneShape = this.setReplaceLaneChildren(laneShape);
            var laneShapeChildren = laneShape.children;
            var lastChild = $('#' + laneShapeChildren.pop())[0];

            if (workFlowType == 'otherWorkFlow') {
                // activity lane
                if (laneShape.laneType == 'center') {
                    // activityShape width + margin + folderManager width - 5
                    laneShape.width = 50 + 75 + 15 - 2;
                    laneShape.x = laneShape.width / 2 + 2;
                } else if (laneShape.laneType == 'right') {

                    var lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                    // activity width : 50, folderManager : 20, margin : 75
                    laneShape.width = 50 * lastChild.shape.level + 20 * lastChild.shape.level + 75 * lastChild.shape.level;
                    laneShape.x = lastOtherFlowLane.shape.x + lastOtherFlowLane.shape.width / 2 + laneShape.width / 2;
                } else {
                    ;
                }
            } else if (workFlowType == 'myWorkFlow') {
                if (laneShape.laneType == 'center') {
                    var firstOtherFlowLane = this.getFirstOtherFLowLaneShape();
                    var firstMyFlowLane = this.getFirstMyFLowLaneShape();
                    laneShape.width = firstOtherFlowLane.shape.width;
                    laneShape.x = firstMyFlowLane.shape.x + firstMyFlowLane.shape.width / 2 + laneShape.width / 2;
                } else if (laneShape.laneType == 'right') {
                    var lastMyFlowLane = this.getLastMyFLowLaneShape();

                    // activity width : 50, folderManager : 50, margin : 75
                    laneShape.width = 50 * lastChild.shape.level + 30 * lastChild.shape.level + 75 * lastChild.shape.level;
                    laneShape.x = lastMyFlowLane.shape.x + lastMyFlowLane.shape.width / 2 + laneShape.width / 2;
                } else {
                    var _lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                    laneShape.width = _lastOtherFlowLane.shape.width;
                    laneShape.x = _lastOtherFlowLane.shape.x + _lastOtherFlowLane.shape.width / 2 + laneShape.width / 2;
                }
            } else {
                ;
            }

            if (lastChild != null) {
                if (90 * lastChild.shape.level < 600) {
                    laneShape.height = $('svg').height() - 2;
                    laneShape.y = laneShape.height / 2 + 2;
                } else {
                    laneShape.height = 90 * lastChild.level - 2;
                    laneShape.y = 90 * lastChild.level + 2;
                }
            } else {
                var _lastOtherFlowLane2 = this.getLastOtherFLowLaneShape();
                laneShape.height = _lastOtherFlowLane2.shape.height;
                laneShape.y = _lastOtherFlowLane2.shape.y;
            }

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = laneShape;
            shapeRenderer.option = { stroke: 'black' };
            return shapeRenderer.render();
        }
    }, {
        key: 'renderFolderShape',
        value: function renderFolderShape(folderShape, beforeShape) {
            if (typeof beforeShape != 'undefined') {
                folderShape.width = 50;
                folderShape.height = 50;

                folderShape.x = folderShape.direction == 'left' ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
                folderShape.y = 90 * (folderShape.index + 1);
            }

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = folderShape;
            var renderFolderShape = shapeRenderer.render();

            var folderEvent = new FolderEvent();
            folderEvent.canvas = this.canvas;
            folderEvent.bindDraggable(renderFolderShape);
            folderEvent.bindContextMenu(renderFolderShape, folderShape.workFlowType, 'editorLayout');

            return renderFolderShape;
        }
    }, {
        key: 'renderEDShape',
        value: function renderEDShape(edShape, beforeShape) {
            edShape.width = 50;
            edShape.height = 50;

            edShape.x = edShape.direction == 'left' ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
            edShape.y = 90 * (edShape.index + 1);

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = edShape;
            var renderEDShape = shapeRenderer.render();

            var edEvent = new EDEvent();
            edEvent.canvas = this.canvas;
            edEvent.bindDraggable(renderEDShape);
            edEvent.bindContextMenu(renderEDShape, edShape.workFlowType, 'editorLayout');

            return renderEDShape;
        }
    }, {
        key: 'renderEdgeShape',
        value: function renderEdgeShape(fromShape, toShape) {
            var edgeShape = new EdgeShape([0, 0], [0, 0]);
            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = edgeShape;
            var renderEdgeShape = shapeRenderer.render();

            var edgeRenderer = new EdgeRenderer();
            edgeRenderer.from = fromShape;
            edgeRenderer.to = toShape;
            edgeRenderer.edge = renderEdgeShape;
            edgeRenderer.style = { 'edge-type': 'plain', "arrow-start": "none", "arrow-end": "none" };
            edgeRenderer.canvas = this.canvas;
            var connectEdgeShape = edgeRenderer.render();

            if (fromShape.shape.workFlowType == 'myWorkFlow' || toShape.shape.workFlowType == 'myWorkFLow') {
                var edgeEvent = new EdgeEvent();
                edgeEvent.canvas = this.canvas;
                edgeEvent.bindContextMenu(connectEdgeShape, 'myWorkFlow', 'editorLayout');
            }
        }
    }, {
        key: 'renderFolderManagerShape',
        value: function renderFolderManagerShape(shape, direction) {
            var folderManager = new FolderManager();
            folderManager.id = shape.shape.id + "_manager";
            folderManager.width = 20;
            folderManager.height = 20;

            folderManager.level = shape.shape.level;
            folderManager.index = shape.shape.index;

            folderManager.x = direction == 'left' ? shape.shape.x - 75 : shape.shape.x + 75;
            folderManager.direction = direction == 'left' ? 'left' : 'right';

            folderManager.y = shape.shape.y;
            folderManager.parentId = shape.shape.id;
            folderManager.type = 'close';
            folderManager.workFlowType = shape.shape.workFlowType;

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.shape = folderManager;
            var renderFolderManagerShape = shapeRenderer.render();

            var folderManagerEvent = new FolderManagerEvent();
            folderManagerEvent.canvas = this.canvas;
            folderManagerEvent.bindClick(renderFolderManagerShape);

            return renderFolderManagerShape;
        }

        // critical

    }, {
        key: 'renderShare',
        value: function renderShare(sourceShape, targetShape) {
            //let sourceFolderManager = this.getRightFolderManager(sourceShape);
            //
            //let sourceShapeAllElement = this.getShapeAllParent(sourceFolderManager, []);
            //sourceShapeAllElement = this.getShapeAllChild(sourceFolderManager, sourceShapeAllElement);
            //sourceShapeAllElement = this.createUniqueArray(sourceShapeAllElement, targetRightAllParent);
            //sourceShapeAllElement = this.sortSharedArrayByLevel(sourceShapeAllElement);

            var targetFolderManager = this.getLeftFolderManager(targetShape);
            var sourceParentElements = this.getShapeAllParent(sourceShape, []);
            var beforeShape = targetFolderManager;

            var targetAllElement = this.getShapeAllParent(targetShape, []);
            targetAllElement = this.getShapeAllChild(targetFolderManager, targetAllElement);

            if (targetAllElement.length > 0) {
                var sourceShapeParent = this.findSourceShapeParent(sourceShape, targetAllElement);
                sourceParentElements = this.createUniqueArray(sourceParentElements, targetAllElement);

                beforeShape = this.canvas._RENDERER.getNextShapes(sourceShapeParent)[0];
            }

            // folder 혹은 ed 를 자식의 어떤 도형에 떨구어도 부모를 찾는 유도 로직
            // critical
            if (sourceParentElements.length > 0) {
                sourceParentElements = this.changeSharedInformation(sourceParentElements, targetShape);
                // draw parent
                beforeShape = this.renderShareParent(beforeShape, sourceParentElements);
            }

            // draw source
            beforeShape = this.renderShareSource(sourceShape, beforeShape);

            // 여기부터 작업 shareChidl 는 shareSource 안에서 동작하게 변경.
            // draw child
            this.renderShareChild(sourceShape, beforeShape, targetShape);
        }
    }, {
        key: 'renderShareParent',
        value: function renderShareParent(beforeShape, sourceParentElements) {
            // draw parent
            for (var i in sourceParentElements) {
                var shape = sourceParentElements[i];
                if (shape.shape instanceof FolderShape) {
                    var createdParentShape = this.renderFolderShape(shape.shape, beforeShape);
                    this.renderEdgeShape(beforeShape, createdParentShape);

                    var createdParentFolderManagerShape = this.renderFolderManagerShape(createdParentShape, 'left');
                    this.renderEdgeShape(createdParentShape, createdParentFolderManagerShape);

                    beforeShape = createdParentFolderManagerShape;
                    // add lane child
                    this.addChildToLane(createdParentShape);
                } else if (shape.shape instanceof EDShape) {
                    // parent 가 ED 인 경우는 없을 것 이다.
                    // 예외를 위해 else if 문 미리 작성
                    ;
                } else {
                    ;
                }
            }
            return beforeShape;
        }
    }, {
        key: 'renderShareSource',
        value: function renderShareSource(sourceShape, beforeShape) {
            sourceShape = this.changeSharedInformation(sourceShape);

            // draw source
            var createdSourceShape = null;
            if (sourceShape.shape instanceof FolderShape) {
                createdSourceShape = this.renderFolderShape(sourceShape.shape, beforeShape);
                this.renderEdgeShape(beforeShape, createdSourceShape);

                var createdSourceFolderManagerShape = this.renderFolderManagerShape(createdSourceShape, 'left');
                this.renderEdgeShape(createdSourceShape, createdSourceFolderManagerShape);

                beforeShape = createdSourceFolderManagerShape;
            } else if (sourceShape.shape instanceof EDShape) {
                createdSourceShape = this.renderFolderShape(sourceShape.shape, beforeShape);
                this.renderEdgeShape(beforeShape, createdSourceShape);
            } else {
                ;
            }
            // add lane child
            this.addChildToLane(createdSourceShape);

            return beforeShape;
        }
    }, {
        key: 'renderShareChild',
        value: function renderShareChild(sourceShape, beforeShape, targetShape) {
            if (sourceShape.shape.folderShapes.length > 0) {
                sourceShape.shape.folderShapes = this.changeSharedInformation(sourceShape.shape.folderShapes, targetShape);

                for (var i in sourceShape.shape.folderShapes) {
                    var childFolderShape = sourceShape.shape.folderShapes[i];

                    var createdChildShape = this.renderFolderShape(childFolderShape, beforeShape);
                    this.renderEdgeShape(beforeShape, createdChildShape);

                    var createdChildFolderManagerShape = this.renderFolderManagerShape(createdChildShape, 'left');
                    this.renderEdgeShape(createdChildShape, createdChildFolderManagerShape);

                    // add lane child
                    this.addChildToLane(createdChildShape);

                    if (childFolderShape.folderShapes.length > 0) {
                        this.renderShareRecursive(childFolderShape, beforeShape, targetShape);
                    } else if (childFolderShape.edShapes.length > 0) {
                        childFolderShape.edShapes = this.changeSharedInformation(childFolderShape.edShapes, targetShape);

                        for (var _i in childFolderShape.edShapes) {
                            var childFolderEDShapes = childFolderShape.edShapes[_i];

                            var createdChildFolderEDShapes = this.renderEDShape(childFolderEDShapes, createdChildFolderManagerShape);
                            this.renderEdgeShape(createdChildFolderManagerShape, createdChildFolderEDShapes);

                            // add lane child
                            this.addChildToLane(createdChildFolderEDShapes);
                        }
                    } else {
                        ;
                    }
                }
            } else if (sourceShape.shape.edShapes.length > 0) {
                sourceShape.shape.edShapes = this.changeSharedInformation(sourceShape.shape.edShapes, targetShape);

                for (var _i2 in sourceShape.shape.edShapes) {
                    var _childFolderEDShapes = sourceShape.shape.edShapes[_i2];

                    var _createdChildFolderEDShapes = this.renderEDShape(_childFolderEDShapes, beforeShape);
                    this.renderEdgeShape(beforeShape, _createdChildFolderEDShapes);

                    // add lane child
                    this.addChildToLane(_createdChildFolderEDShapes);
                }
            } else {
                ;
            }
        }
    }, {
        key: 'renderShareRecursive',
        value: function renderShareRecursive(sourceShape, beforeShape, targetShape) {
            if (sourceShape.shape.folderShapes.length > 0) {
                sourceShape.shape.folderShapes = this.changeSharedInformation(sourceShape.shape.folderShapes, targetShape);

                for (var i in sourceShape.shape.folderShapes) {
                    var childFolderShape = sourceShape.shape.folderShapes[i];

                    var createdChildShape = this.renderFolderShape(childFolderShape, beforeShape);
                    this.renderEdgeShape(beforeShape, createdChildShape);

                    var createdChildFolderManagerShape = this.renderFolderManagerShape(createdChildShape, 'left');
                    this.renderEdgeShape(createdChildShape, createdChildFolderManagerShape);

                    // add lane child
                    this.addChildToLane(createdChildShape);

                    if (childFolderShape.folderShapes.length > 0) {
                        this.renderShareRecursive(childFolderShape, beforeShape);
                    } else if (childFolderShape.edShapes.length > 0) {
                        childFolderShape.edShapes = this.changeSharedInformation(childFolderShape.edShapes, targetShape);

                        for (var _i3 in childFolderShape.edShapes) {
                            var childFolderEDShapes = childFolderShape.edShapes[_i3];

                            var createdChildFolderEDShapes = this.renderEDShape(childFolderEDShapes, createdChildFolderManagerShape);
                            this.renderEdgeShape(createdChildFolderManagerShape, createdChildFolderEDShapes);

                            // add lane child
                            this.addChildToLane(createdChildFolderEDShapes);
                        }
                    }
                }
            }
        }
    }, {
        key: 'isInTarget',
        value: function isInTarget(ui) {
            var targetShape = null;
            var myWorkFlowLaneChild = [];

            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index, element) {
                if (element.shape.laneType == 'left' || element.shape.laneType == 'center') {
                    if (typeof element.shape.children != 'undefined' && element.shape.children.length > 0) {
                        myWorkFlowLaneChild = myWorkFlowLaneChild.concat(element.shape.children);
                    }
                }
            });

            for (var i in myWorkFlowLaneChild) {
                var target = $('#' + myWorkFlowLaneChild[i]);
                var shapeOffset = target.offset();

                // shape width and height 50 + plus margin area
                var shapeTop = shapeOffset.top - 25;
                var shapeBottom = shapeOffset.top + 50 + 25;
                var shapeLeft = shapeOffset.left - 25;
                var shapeRight = shapeOffset.left + 50 + 25;

                // 25 is shapes margin area size
                var draggableTop = ui.position.top;
                var draggableBottom = ui.position.top + 50;
                var draggableLeft = ui.position.left;
                var draggableRight = ui.position.left;+50;

                if (shapeBottom >= draggableBottom && draggableBottom >= shapeTop && shapeBottom >= draggableTop && draggableTop >= shapeTop && shapeLeft <= draggableLeft && draggableLeft <= shapeRight && shapeLeft <= draggableRight && draggableLeft <= shapeRight) {

                    targetShape = target[0];
                    break;
                }
            };
            return targetShape;
        }
    }, {
        key: 'createShapeSpan',
        value: function createShapeSpan(ui, src) {
            var pngSrc = src.split('.')[0] + '.png';
            $('#draggable').css('display', 'block');
            $('#draggable').css('background-image', 'url(' + pngSrc + ')');
            $('#draggable').offset({ top: ui.position.top, left: ui.position.left });
        }
    }, {
        key: 'createUniqueArray',
        value: function createUniqueArray(standardArray, compareArray) {
            for (var i in standardArray) {
                if (compareArray.length > 0) {
                    for (var j in compareArray) {
                        if (standardArray.length > 0) {
                            if (standardArray[i].shape.id == compareArray[j].shape.id) {
                                standardArray.splice(i, 1);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
            return standardArray;
        }
    }, {
        key: 'findSourceShapeParent',
        value: function findSourceShapeParent(sourceShape, targetAllElement) {
            var sourceShapeParent = null;
            for (var i in targetAllElement) {
                var targetElement = targetAllElement[i];

                if (targetElement.shape.id == sourceShape.shape.parentId) {
                    sourceShapeParent = targetElement;
                    break;
                }
            }
            return sourceShapeParent;
        }
    }, {
        key: 'getLeftFolderManager',
        value: function getLeftFolderManager(shape) {
            var folderManager = null;
            var nextShapes = this.canvas._RENDERER.getNextShapes(shape);

            for (var i in nextShapes) {
                if (nextShapes[i].shape.direction == 'left') {
                    folderManager = nextShapes[i];
                    break;
                }
            }
            return folderManager;
        }
    }, {
        key: 'getRightFolderManager',
        value: function getRightFolderManager(shape) {
            var folderManager = null;
            var nextShapes = this.canvas._RENDERER.getNextShapes(shape);

            for (var i in nextShapes) {
                if (nextShapes[i].shape.direction == 'right') {
                    folderManager = nextShapes[i];
                    break;
                }
            }
            return folderManager;
        }
    }, {
        key: 'getShapeAllParent',
        value: function getShapeAllParent(folderManager, parents) {
            var prevShapes = this.canvas._RENDERER.getPrevShapes(folderManager);
            if (prevShapes.length > 0) {
                for (var i in prevShapes) {
                    var prevShape = prevShapes[i];

                    if (prevShape.shape instanceof FolderShape) {
                        parents.splice(0, 0, prevShape);
                    }
                    this.getShapeAllParent(prevShape, parents);
                }
            }
            return parents;
        }
    }, {
        key: 'getShapeChild',
        value: function getShapeChild(childFolderManager, children) {
            var childNextShapes = this.canvas._RENDERER.getNextShapes(childFolderManager);
            if (childNextShapes.length > 0) {
                for (var i in childNextShapes) {
                    var childNextShape = childNextShapes[i];

                    if (childNextShape.shape instanceof FolderShape || childNextShape.shape instanceof EDShape) {
                        children.push(childNextShape);

                        var _childFolderManager = this.canvas._RENDERER.getNextShapes(childNextShape);
                        if (_childFolderManager.length > 0) {
                            this.getShapeChild(_childFolderManager, children);
                        }
                    }
                }
            }
            return children;
        }
    }, {
        key: 'getShapeAllChild',
        value: function getShapeAllChild(folderManager, children) {
            var nextShapes = this.canvas._RENDERER.getNextShapes(folderManager);
            if (nextShapes.length > 0) {
                for (var i in nextShapes) {
                    var nextShape = nextShapes[i];

                    if (nextShape.shape instanceof FolderShape || nextShape.shape instanceof EDShape) {
                        children.push(nextShape);

                        var childFolderManager = this.canvas._RENDERER.getNextShapes(nextShape);
                        if (childFolderManager.length > 0) {
                            children.concat(this.getShapeChild(childFolderManager, children));
                        }
                    }
                }
            }
            return children;
        }
    }, {
        key: 'addChildToLane',
        value: function addChildToLane(createdShape) {
            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function () {
                if (this.shape.laneType == 'center') {
                    this.shape.children.push(createdShape.id);
                    return false;
                }
            });
        }
    }, {
        key: 'changeSharedInformation',
        value: function changeSharedInformation(object, targetShape) {
            if (object instanceof Array) {
                // 최상위 레벨 폴더만 parentId 변경
                // 모든 레벨에 - 를 붙여야 한다. (방향이 반대이므로)
                for (var i in object) {
                    if (typeof object[i].shape !== 'undefined') {
                        if (object[i].shape.level == 1) {
                            object[i].shape.parentId = targetShape.shape.id;
                        }
                        object[i].shape.level = -object[i].shape.level;
                        object[i].shape.direction = 'left';
                    } else {
                        if (object[i].level == 1) {
                            object[i].parentId = targetShape.id;
                        }
                        object[i].level = -object[i].level;
                        object[i].direction = 'left';
                    }
                }
                return object;
            } else {
                object.shape.level = -object.shape.level;
                object.shape.direction = 'left';

                return object;
            }
        }
    }, {
        key: 'otherWorkFlowData',
        set: function set(otherWorkFlowData) {
            this._otherWorkFlowData = otherWorkFlowData;
        },
        get: function get() {
            return this._otherWorkFlowData;
        }
    }, {
        key: 'myWorkFlowData',
        set: function set(myWorkFlowData) {
            this._myWorkFlowData = myWorkFlowData;
        },
        get: function get() {
            return this._myWorkFlowData;
        }
    }]);

    return EditorLayout;
}(Layout);