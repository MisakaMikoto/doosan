/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
class MonitoringLayout extends Layout {
    constructor() {
        super();
        this._data = '';
    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    drawMyWorkFlow() {
        this.draw(this.data);
    }

    renderActivityShape(activityShape) {
        activityShape.width = 50;
        activityShape.height = 50;

        activityShape.x = $('svg').width() / 2 - (activityShape.width / 2);
        activityShape.y = 90 * (activityShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = activityShape;
        shapeRenderer.canvas = this.canvas;
        let renderActivityShape = shapeRenderer.render();

        let activityEvent = new ActivityEvent();
        activityEvent.canvas = this.canvas;
        activityEvent.bindContextMenu(renderActivityShape, activityShape.workFlowType, 'monitoringLayout');

        return renderActivityShape;
    }

    renderFolderShape(folderShape, beforeShape) {
        folderShape.width = 50;
        folderShape.height = 50;

        folderShape.x = (folderShape.direction == 'left') ? beforeShape.shape.x - 75 : folderShape.x = beforeShape.shape.x + 75;
        folderShape.y = 90 * (folderShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = folderShape;
        shapeRenderer.canvas = this.canvas;
        let renderFolderShape = shapeRenderer.render();

        let folderEvent = new FolderEvent();
        folderEvent.canvas = this.canvas;
        folderEvent.bindDraggable(renderFolderShape);
        folderEvent.bindContextMenu(renderFolderShape, folderShape.workFlowType, 'monitoringLayout');

        return renderFolderShape;
    }

    renderLaneShape(laneShape) {
        laneShape = this.setReplaceLaneChildren(laneShape);
        let laneShapeChildren = laneShape.children;
        let lastChild = $('#' + laneShapeChildren[laneShapeChildren.length - 1])[0];

        if(laneShape.laneType == 'center') {
            laneShape.width = lastChild.shape.width + 75 + 25;
            laneShape.x = lastChild.shape.x;

        } else if(laneShape.laneType == 'right') {
            let centerMyFlowLane = this.getCenterMyFLowLaneShape();
            laneShape.width = (50 * Math.abs(lastChild.shape.level) * 2) + (20 * Math.abs(lastChild.shape.level) * 2);
            laneShape.x = centerMyFlowLane.shape.x + (centerMyFlowLane.shape.width / 2) + (laneShape.width / 2);

        } else {
            let centerMyFlowLane = this.getCenterMyFLowLaneShape();
            laneShape.width = (50 * Math.abs(lastChild.shape.level) * 2) + (20 * Math.abs(lastChild.shape.level) * 2);
            laneShape.x = centerMyFlowLane.shape.x - (centerMyFlowLane.shape.width / 2) - (laneShape.width / 2);
        }

        if(lastChild != null) {
            if ((90 * lastChild.shape.level) < 600) {
                laneShape.height = $('svg').height() - 2;
                laneShape.y = (laneShape.height / 2) + 2;

            } else {
                laneShape.height = (90 * lastChild.level) - 2;
                laneShape.y = (90 * lastChild.level) + 2;
            }

        } else {
            let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
            laneShape.height = lastOtherFlowLane.shape.height;
            laneShape.y = lastOtherFlowLane.shape.y;
        }

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = laneShape;
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.option = {stroke: 'black'};
        return shapeRenderer.render();
    }

    renderEDShape(edShape, beforeShape) {
        edShape.width = 50;
        edShape.height = 50;

        edShape.x = (edShape.direction == 'left') ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
        edShape.y = 90 * (edShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = edShape;
        shapeRenderer.canvas = this.canvas;
        let renderEDShape = shapeRenderer.render();

        let edEvent = new EDEvent();
        edEvent.canvas = this.canvas;
        edEvent.bindDraggable(renderEDShape);
        edEvent.bindContextMenu(renderEDShape, edShape.workFlowType, 'monitoringLayout');

        return renderEDShape;
    }

    renderEdgeShape(fromShape, toShape) {
        let edgeShape = new EdgeShape([0, 0], [0, 0]);
        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = edgeShape;
        let renderEdgeShape = shapeRenderer.render();

        let edgeRenderer = new EdgeRenderer();
        edgeRenderer.from = fromShape;
        edgeRenderer.to = toShape;
        edgeRenderer.edge = renderEdgeShape;
        edgeRenderer.style = {'edge-type': 'plain', "arrow-start": "none", "arrow-end": "none"};
        edgeRenderer.canvas = this.canvas;
        edgeRenderer.render();
    }

    renderFolderManagerShape(shape, direction) {
        let folderManager = new FolderManager();
        folderManager.id = shape.shape.id + "_manager";
        folderManager.width = 20;
        folderManager.height = 20;

        folderManager.level = shape.shape.level;
        folderManager.index = shape.shape.index;

        folderManager.x = (direction == 'left') ? shape.shape.x - 75 : shape.shape.x + 75;
        folderManager.direction = (direction == 'left') ? 'left' : 'right';

        folderManager.y = shape.shape.y;
        folderManager.parentId = shape.shape.id;
        folderManager.type = 'close';
        folderManager.workFlowType = shape.shape.workFlowType;

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = folderManager;
        let renderFolderManagerShape = shapeRenderer.render();

        let folderManagerEvent = new FolderManagerEvent();
        folderManagerEvent.canvas = this.canvas;
        folderManagerEvent.bindClick(renderFolderManagerShape);

        return renderFolderManagerShape;
    }
}
