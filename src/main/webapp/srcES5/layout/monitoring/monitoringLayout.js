'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
var MonitoringLayout = function (_Layout) {
    _inherits(MonitoringLayout, _Layout);

    function MonitoringLayout() {
        _classCallCheck(this, MonitoringLayout);

        var _this = _possibleConstructorReturn(this, (MonitoringLayout.__proto__ || Object.getPrototypeOf(MonitoringLayout)).call(this));

        _this._data = '';
        return _this;
    }

    _createClass(MonitoringLayout, [{
        key: 'drawMyWorkFlow',
        value: function drawMyWorkFlow() {
            this.draw(this.data);
        }
    }, {
        key: 'renderActivityShape',
        value: function renderActivityShape(activityShape) {
            activityShape.width = 50;
            activityShape.height = 50;

            activityShape.x = $('svg').width() / 2 - activityShape.width / 2;
            activityShape.y = 90 * (activityShape.index + 1);

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.shape = activityShape;
            shapeRenderer.canvas = this.canvas;
            var renderActivityShape = shapeRenderer.render();

            var activityEvent = new ActivityEvent();
            activityEvent.canvas = this.canvas;
            activityEvent.bindContextMenu(renderActivityShape, activityShape.workFlowType, 'monitoringLayout');

            return renderActivityShape;
        }
    }, {
        key: 'renderFolderShape',
        value: function renderFolderShape(folderShape, beforeShape) {
            folderShape.width = 50;
            folderShape.height = 50;

            folderShape.x = folderShape.direction == 'left' ? beforeShape.shape.x - 75 : folderShape.x = beforeShape.shape.x + 75;
            folderShape.y = 90 * (folderShape.index + 1);

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.shape = folderShape;
            shapeRenderer.canvas = this.canvas;
            var renderFolderShape = shapeRenderer.render();

            var folderEvent = new FolderEvent();
            folderEvent.canvas = this.canvas;
            folderEvent.bindDraggable(renderFolderShape);
            folderEvent.bindContextMenu(renderFolderShape, folderShape.workFlowType, 'monitoringLayout');

            return renderFolderShape;
        }
    }, {
        key: 'renderLaneShape',
        value: function renderLaneShape(laneShape) {
            laneShape = this.setReplaceLaneChildren(laneShape);
            var laneShapeChildren = laneShape.children;
            var lastChild = laneShape.laneType == 'center' ? $('#' + laneShapeChildren[0])[0] : $('#' + laneShapeChildren[laneShapeChildren.length - 1])[0];

            if (laneShape.laneType == 'center') {
                laneShape.width = lastChild.shape.width + 75 + 25;
                laneShape.x = lastChild.shape.x;
            } else if (laneShape.laneType == 'right') {
                var centerMyFlowLane = this.getCenterMyFLowLaneShape();
                laneShape.width = 50 * Math.abs(lastChild.shape.level) * 2 + 20 * Math.abs(lastChild.shape.level) * 2;
                laneShape.x = centerMyFlowLane.shape.x + centerMyFlowLane.shape.width / 2 + laneShape.width / 2;
            } else {
                var _centerMyFlowLane = this.getCenterMyFLowLaneShape();
                laneShape.width = 50 * Math.abs(lastChild.shape.level) * 2 + 20 * Math.abs(lastChild.shape.level) * 2;
                laneShape.x = _centerMyFlowLane.shape.x - _centerMyFlowLane.shape.width / 2 - laneShape.width / 2;
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
                var lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                laneShape.height = lastOtherFlowLane.shape.height;
                laneShape.y = lastOtherFlowLane.shape.y;
            }

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.shape = laneShape;
            shapeRenderer.canvas = this.canvas;
            shapeRenderer.option = { stroke: 'black' };
            return shapeRenderer.render();
        }
    }, {
        key: 'renderEDShape',
        value: function renderEDShape(edShape, beforeShape) {
            edShape.width = 50;
            edShape.height = 50;

            edShape.x = edShape.direction == 'left' ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
            edShape.y = 90 * (edShape.index + 1);

            var shapeRenderer = new ShapeRenderer();
            shapeRenderer.shape = edShape;
            shapeRenderer.canvas = this.canvas;
            var renderEDShape = shapeRenderer.render();

            var edEvent = new EDEvent();
            edEvent.canvas = this.canvas;
            edEvent.bindDraggable(renderEDShape);
            edEvent.bindContextMenu(renderEDShape, edShape.workFlowType, 'monitoringLayout');

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
            edgeRenderer.render();
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
    }, {
        key: 'data',
        set: function set(data) {
            this._data = data;
        },
        get: function get() {
            return this._data;
        }
    }]);

    return MonitoringLayout;
}(Layout);