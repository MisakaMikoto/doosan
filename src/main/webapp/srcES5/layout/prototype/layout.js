'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by uengine on 2016. 8. 6..
 */
var Layout = function () {
    function Layout(canvas) {
        _classCallCheck(this, Layout);

        this._canvas = canvas;

        this._activityShapes = '';
        this._folderShapes = [];
        this._edShapes = [];

        this._type = '';
    }

    _createClass(Layout, [{
        key: 'createCanvas',
        value: function createCanvas(canvasId) {
            var canvas = new OG.Canvas(canvasId, [1980, 600]);
            canvas = this.configurationCanvas(canvas);
            this.canvas = canvas;
        }
    }, {
        key: 'configurationCanvas',
        value: function configurationCanvas(canvas) {
            canvas.initConfig({
                selectable: true,
                dragSelectable: true,
                movable: false,
                resizable: false,
                connectable: true,
                connectCloneable: true,
                connectRequired: true,
                labelEditable: true,
                groupDropable: true,
                collapsible: true,
                enableHotKey: true,
                enableContextMenu: false
            });
            return canvas;
        }
    }, {
        key: 'draw',
        value: function draw(activityJSONData) {
            var workFlowType = activityJSONData.workFlowType;

            var activityShapes = activityJSONData.activityShapes;
            if (typeof activityShapes != 'undefined' && activityShapes.length > 0) {
                var beforeLastIndex = 0;

                for (var i in activityShapes) {
                    var activityShape = activityShapes[i];
                    activityShape.level = 0;
                    activityShape.index = beforeLastIndex;
                    activityShape.workFlowType = workFlowType;

                    var createdActivityShape = this.type.renderActivityShape(activityShape);

                    var createdLeftActivityCollapseShape = null;
                    var createdRightActivityCollapseShape = null;

                    if (workFlowType == 'myWorkFlow') {
                        createdLeftActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'left');
                        this.type.renderEdgeShape(createdActivityShape, createdLeftActivityCollapseShape);
                    }

                    createdRightActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'right');
                    this.type.renderEdgeShape(createdActivityShape, createdRightActivityCollapseShape);

                    // find folders
                    var leftFolderShapes = activityShape.leftFolderShapes;
                    if (typeof leftFolderShapes != 'undefined' && leftFolderShapes.length > 0) {
                        for (var _i in leftFolderShapes) {
                            if (activityShape.id == leftFolderShapes[_i].parentId) {
                                var folderShape = leftFolderShapes[_i];
                                folderShape.parentId = activityShape.id;
                                folderShape.level = activityShape.level - 1;
                                folderShape.index = beforeLastIndex + activityShape.index;
                                folderShape.workFlowType = workFlowType;

                                var createdFolderShape = this.type.renderFolderShape(folderShape, createdLeftActivityCollapseShape);
                                this.type.renderEdgeShape(createdLeftActivityCollapseShape, createdFolderShape);

                                var createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, 'left');
                                this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                                // find child folder
                                var childFolderShapes = folderShape.folderShapes;
                                if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                                    beforeLastIndex = this.recursiveFolder(childFolderShapes, createdFolderCollapseShape, 'left', workFlowType);
                                }

                                // find eds
                                var edShapes = leftFolderShapes[_i].edShapes;
                                if (typeof edShapes != 'undefined' && edShapes.length > 0) {
                                    for (var _i2 in edShapes) {
                                        if (folderShape.id == edShapes[_i2].parentId) {
                                            var edShape = edShapes[_i2];
                                            edShape.parentId = folderShape.id;
                                            edShape.level = folderShape.level - 1;
                                            edShape.index = folderShape.index + Number(_i2);
                                            edShape.workFlowType = workFlowType;

                                            var createdEDShape = this.type.renderEDShape(edShape, createdFolderCollapseShape);
                                            this.type.renderEdgeShape(createdFolderCollapseShape, createdEDShape);
                                            beforeLastIndex += 1;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // init index
                    beforeLastIndex = 0;

                    // find folders
                    var rightFolderShapes = activityShape.rightFolderShapes;
                    if (typeof rightFolderShapes != 'undefined' && rightFolderShapes.length > 0) {
                        for (var _i3 in rightFolderShapes) {
                            if (activityShape.id == rightFolderShapes[_i3].parentId) {
                                var _folderShape = rightFolderShapes[_i3];
                                _folderShape.parentId = activityShape.id;
                                _folderShape.level = activityShape.level + 1;
                                _folderShape.index = beforeLastIndex + activityShape.index;
                                _folderShape.workFlowType = workFlowType;

                                var _createdFolderShape = this.type.renderFolderShape(_folderShape, createdRightActivityCollapseShape);
                                this.type.renderEdgeShape(createdRightActivityCollapseShape, _createdFolderShape);

                                var _createdFolderCollapseShape = this.type.renderFolderManagerShape(_createdFolderShape, 'right');
                                this.type.renderEdgeShape(_createdFolderShape, _createdFolderCollapseShape);

                                // find child folder
                                var _childFolderShapes = _folderShape.folderShapes;
                                if (typeof _childFolderShapes != 'undefined' && _childFolderShapes.length > 0) {
                                    beforeLastIndex = this.recursiveFolder(_childFolderShapes, _createdFolderCollapseShape, 'right', workFlowType);
                                }

                                // find eds
                                var _edShapes = rightFolderShapes[_i3].edShapes;
                                if (typeof _edShapes != 'undefined' && _edShapes.length > 0) {
                                    for (var _i4 in _edShapes) {
                                        if (_folderShape.id == _edShapes[_i4].parentId) {
                                            var _edShape = _edShapes[_i4];
                                            _edShape.parentId = _folderShape.id;
                                            _edShape.level = _folderShape.level + 1;
                                            _edShape.index = _folderShape.index + Number(_i4);
                                            _edShape.workFlowType = workFlowType;

                                            var _createdEDShape = this.type.renderEDShape(_edShape, _createdFolderCollapseShape);
                                            this.type.renderEdgeShape(_createdFolderCollapseShape, _createdEDShape);
                                            beforeLastIndex += 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var laneShapes = activityJSONData.laneShapes;
            if (typeof laneShapes != 'undefined' && laneShapes.length > 0) {
                for (var _i5 in laneShapes) {
                    this.type.renderLaneShape(laneShapes[_i5], workFlowType);
                }
            }

            this.sendLaneToBack();
            this.replaceTop();
        }
    }, {
        key: 'recursiveFolder',
        value: function (_recursiveFolder) {
            function recursiveFolder(_x, _x2, _x3, _x4) {
                return _recursiveFolder.apply(this, arguments);
            }

            recursiveFolder.toString = function () {
                return _recursiveFolder.toString();
            };

            return recursiveFolder;
        }(function (folderShapes, rootCollapseShape, direction, workFlowType) {
            var beforeLastIndex = rootCollapseShape.shape.index;

            // find folder
            if (typeof folderShapes != 'undefined' && folderShapes.length > 0) {
                for (var i in folderShapes) {
                    if (rootCollapseShape.shape.parentId == folderShapes[i].parentId) {
                        var folderShape = folderShapes[i];
                        folderShape.parentId = rootCollapseShape.shape.parentId;

                        if (direction == 'left') {
                            folderShape.level = rootCollapseShape.shape.level - 1;
                        } else {
                            folderShape.level = rootCollapseShape.shape.level + 1;
                        }
                        folderShape.index = beforeLastIndex;
                        folderShape.workFlowType = workFlowType;

                        var createdFolderShape = this.type.renderFolderShape(folderShape, rootCollapseShape);
                        this.type.renderEdgeShape(rootCollapseShape, createdFolderShape);

                        var createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, direction);
                        this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                        var childFolderShapes = folderShape.folderShapes;
                        if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                            recursiveFolder(childFolderShapes, createdFolderShape, direction);
                        }
                        // save last index and level
                        beforeLastIndex = folderShape.index;

                        // find eds
                        var edShapes = folderShapes[i].edShapes;
                        if (typeof edShapes != 'undefined' && edShapes.length > 0) {
                            for (var _i6 in edShapes) {
                                if (folderShape.id == edShapes[_i6].parentId) {
                                    var edShape = edShapes[_i6];
                                    edShape.parentId = folderShape.id;

                                    if (direction == 'left') {
                                        edShape.level = folderShape.level - 1;
                                    } else {
                                        edShape.level = folderShape.level + 1;
                                    }
                                    edShape.index = folderShape.index + Number(_i6);
                                    edShape.workFlowType = workFlowType;

                                    var createdEDShape = this.type.renderEDShape(edShape, createdFolderCollapseShape);
                                    this.type.renderEdgeShape(createdFolderCollapseShape, createdEDShape);
                                    beforeLastIndex += 1;
                                }
                            }
                        }
                    }
                }
            }
            return beforeLastIndex;
        })
    }, {
        key: 'sendLaneToBack',
        value: function sendLaneToBack() {
            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
                $(element).attr('_selected', 'true');
            });

            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index, element) {
                $(element).attr('_selected', 'true');
            });
            this.canvas._HANDLER.sendToBack();
        }
    }, {
        key: 'replaceTop',
        value: function replaceTop() {
            var fixedOtherWorkFlowWidth = 0;
            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
                fixedOtherWorkFlowWidth += element.shape.width;
            });

            $('#otherWorkFlow').width(fixedOtherWorkFlowWidth);
            $('#myWorkFlow').width($(window).width() - $('#otherWorkFlow').width());
        }
    }, {
        key: 'getFirstOtherFLowLaneShape',
        value: function getFirstOtherFLowLaneShape() {
            var standardLaneShape = $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]')[0];
            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
                if (standardLaneShape.shape.x > element.shape.x) {
                    standardLaneShape = element;
                }
            });
            return standardLaneShape;
        }
    }, {
        key: 'getLastOtherFLowLaneShape',
        value: function getLastOtherFLowLaneShape() {
            var standardLaneShape = $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]')[0];
            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
                if (standardLaneShape.shape.x < element.shape.x) {
                    standardLaneShape = element;
                }
            });
            return standardLaneShape;
        }
    }, {
        key: 'getFirstMyFLowLaneShape',
        value: function getFirstMyFLowLaneShape() {
            var standardLaneShape = $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]')[0];
            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index, element) {
                if (standardLaneShape.shape.x > element.shape.x) {
                    standardLaneShape = element;
                }
            });
            return standardLaneShape;
        }
    }, {
        key: 'getCenterMyFLowLaneShape',
        value: function getCenterMyFLowLaneShape() {
            var _this = this;

            var centerMyFlowLane = null;
            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index, element) {
                if (_this.shape.laneType == 'center') {
                    centerMyFlowLane = element;
                    return false;
                }
            });
            return centerMyFlowLane;
        }
    }, {
        key: 'getLastMyFLowLaneShape',
        value: function getLastMyFLowLaneShape() {
            var standardLaneShape = $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]')[0];
            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index, element) {
                if (standardLaneShape.shape.x < element.shape.x) {
                    standardLaneShape = element;
                }
            });
            return standardLaneShape;
        }
    }, {
        key: 'getShapeRightAllChildren',
        value: function getShapeRightAllChildren(shape, children) {
            var nextShapes = this.canvas._RENDERER.getNextShapes(shape);
            if (nextShapes.length > 0) {
                for (var i in nextShapes) {
                    if ((nextShapes[i].shape instanceof FolderShape || nextShapes[i].shape instanceof EDShape) && nextShapes[i].shape.direction == 'right') {
                        children.push(nextShapes[i]);
                    }
                    this.getShapeRightAllChildren(nextShapes[i], children);
                }
            }
            return children;
        }
    }, {
        key: 'setReplaceLaneChildren',
        value: function setReplaceLaneChildren(laneShape) {
            var replaceChildren = [];
            var children = laneShape.children;

            var _loop = function _loop(i) {
                $('[_shape="IMAGE"]').each(function (index, element) {
                    if (element.shape.id == children[i]) {
                        replaceChildren.push(element.id);
                    }
                });
            };

            for (var i in children) {
                _loop(i);
            }
            laneShape.children = replaceChildren;
            return laneShape;
        }
    }, {
        key: 'replaceShape',
        value: function replaceShape(targetShape, direction, moveLevel) {
            var offset = [];
            var x = 0;
            if (direction == 'right') {
                x += 75 * moveLevel;
            } else {
                x -= 75 * moveLevel;
            }
            var y = 0;

            offset.push(x);
            offset.push(y);

            this.autoIncreaseCanvasSize(targetShape.shape);
            this.autoIncreaseLaneSize(targetShape.shape);

            this.canvas._RENDERER.move(targetShape, offset);
            this.replaceEdge();
        }
    }, {
        key: 'replaceEdge',
        value: function replaceEdge() {
            var allEdges = this.canvas._RENDERER.getAllEdges();
            for (var i in allEdges) {
                this.canvas._RENDERER.reconnect(allEdges[i]);
            }
        }
    }, {
        key: 'canvas',
        set: function set(canvas) {
            this._canvas = canvas;
        },
        get: function get() {
            return this._canvas;
        }
    }, {
        key: 'activityShapes',
        set: function set(activityShapes) {
            this._activityShapes = activityShapes;
        },
        get: function get() {
            return this._activityShapes;
        }
    }, {
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
    }, {
        key: 'type',
        set: function set(type) {
            this._type = type;
        },
        get: function get() {
            return this._type;
        }
    }]);

    return Layout;
}();