/**
 * Created by MisakaMikoto on 2016. 8. 6..
 */
class EditorLayout extends Layout {
    constructor() {
        super();

        this._otherWorkFlowData = '';
        this._myWorkFlowData = '';
    }

    set otherWorkFlowData(otherWorkFlowData) {
        this._otherWorkFlowData = otherWorkFlowData;
    }

    get otherWorkFlowData() {
        return this._otherWorkFlowData;
    }

    set myWorkFlowData(myWorkFlowData) {
        this._myWorkFlowData = myWorkFlowData;
    }

    get myWorkFlowData() {
        return this._myWorkFlowData;
    }

    drawOtherWorkFlow() {
        this.draw(this.otherWorkFlowData);
    }

    drawMyWorkFlow() {
        this.draw(this.myWorkFlowData);
    }

    renderActivityShape(activityShape) {
        activityShape.width = 50;
        activityShape.height = 50;

        if(activityShape.workFlowType == 'otherWorkFlow') {
            activityShape.x = 50;

        } else {
            let firstOtherFlowLane = this.getFirstOtherFLowLaneShape();
            let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
            activityShape.x = firstOtherFlowLane.shape.x + lastOtherFlowLane.shape.width + (lastOtherFlowLane.shape.x + (lastOtherFlowLane.shape.width / 2)) - 12.5;

        }
        activityShape.y = 90 * (activityShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = activityShape;
        let renderActivityShape = shapeRenderer.render();

        let activityEvent = new ActivityEvent();
        activityEvent.canvas = this.canvas;
        activityEvent.bindContextMenu(renderActivityShape, activityShape.workFlowType, 'editorLayout');

        return renderActivityShape;
    }

    renderLaneShape(laneShape, workFlowType) {
        let children = laneShape.children.split(',');
        let lastChild = this.getLastChildInLaneShape(children[children.length - 1]);

        if(workFlowType == 'otherWorkFlow') {
            // activity lane
            if(laneShape.laneType == 'center') {
                laneShape.width = 50 + 30 + (75 / 2) + 7.5 - 2;
                laneShape.x = (laneShape.width / 2) + 2;

            } else if(laneShape.laneType == 'right') {

                let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                // activitiy width : 50, folderManager : 50, margin : 75
                laneShape.width = (50 * lastChild.shape.level) + (30 * lastChild.shape.level) + (75 * lastChild.shape.level);
                laneShape.x = lastOtherFlowLane.shape.x + (lastOtherFlowLane.shape.width / 2) + (laneShape.width / 2);

            } else {
                ;
            }

        } else if(workFlowType == 'myWorkFlow') {
            if(laneShape.laneType == 'center') {
                let firstOtherFlowLane = this.getFirstOtherFLowLaneShape();
                let firstMyFlowLane = this.getFirstMyFLowLaneShape();
                laneShape.width = firstOtherFlowLane.shape.width;
                laneShape.x = firstMyFlowLane.shape.x + (firstMyFlowLane.shape.width / 2) + (laneShape.width / 2);

            } else if(laneShape.laneType == 'right') {
                let lastMyFlowLane = this.getLastMyFLowLaneShape();

                // activitiy width : 50, folderManager : 50, margin : 75
                laneShape.width = (50 * lastChild.shape.level) + (30 * lastChild.shape.level) + (75 * lastChild.shape.level);
                laneShape.x = lastMyFlowLane.shape.x + (lastMyFlowLane.shape.width / 2) + (laneShape.width / 2);

            } else {
                let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                laneShape.width = lastOtherFlowLane.shape.width;
                laneShape.x = lastOtherFlowLane.shape.x + (lastOtherFlowLane.shape.width / 2) + (laneShape.width / 2);
            }

        } else {
            ;
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
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = laneShape;
        shapeRenderer.option = {stroke: 'black'};
        return shapeRenderer.render();
    }

    renderFolderShape(folderShape, beforeShape) {
        folderShape.width = 50;
        folderShape.height = 50;

        folderShape.x = (folderShape.direction == 'left') ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
        folderShape.y = 90 * (folderShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = folderShape;
        let renderFolderShape = shapeRenderer.render();

        let folderEvent = new FolderEvent();
        folderEvent.canvas = this.canvas;
        folderEvent.bindDraggable(renderFolderShape);
        folderEvent.bindContextMenu(renderFolderShape, folderShape.workFlowType, 'editorLayout');

        return renderFolderShape;
    }

    renderEDShape(edShape, beforeShape) {
        edShape.width = 50;
        edShape.height = 50;

        edShape.x = (edShape.direction == 'left') ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
        edShape.y = 90 * (edShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.canvas = this.canvas;
        shapeRenderer.shape = edShape;
        let renderEDShape = shapeRenderer.render();

        let edEvent = new EDEvent();
        edEvent.canvas = this.canvas;
        edEvent.bindDraggable(renderEDShape);
        edEvent.bindContextMenu(renderEDShape, edShape.workFlowType, 'editorLayout');

        return renderEDShape;
    }

    renderEdgeShape(fromShape, toShape) {
        let edgeRenderer = new EdgeRenderer();
        edgeRenderer.from = fromShape;
        edgeRenderer.to = toShape;
        edgeRenderer.canvas = this.canvas;
        let renderEdgeShape = edgeRenderer.render();

        let edgeEvent = new EdgeEvent();
        edgeEvent.canvas = this.canvas;

        if(fromShape.shape.workFlowType == 'myWorkFlow' || toShape.shape.workFlowType == 'myWorkFLow') {
            edgeEvent.bindContextMenu(renderEdgeShape, 'myWorkFlow', 'editorLayout');
        }
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