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
            activityShape.x = 50 + 15;

        } else {
            let firstOtherFlowLane = this.getFirstOtherFLowLaneShape();
            let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
            activityShape.x = firstOtherFlowLane.shape.x + lastOtherFlowLane.shape.width + (lastOtherFlowLane.shape.x + (lastOtherFlowLane.shape.width / 2));

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
        laneShape = this.setReplaceLaneChildren(laneShape);
        let laneShapeChildren = laneShape.children;
        let lastChild = $('#' + laneShapeChildren.pop())[0];

        if(workFlowType == 'otherWorkFlow') {
            // activity lane
            if(laneShape.laneType == 'center') {
                // activityShape width + margin + folderManager width - 5
                laneShape.width = 50 + 75 + 15 - 2;
                laneShape.x = (laneShape.width / 2) + 2;

            } else if(laneShape.laneType == 'right') {

                let lastOtherFlowLane = this.getLastOtherFLowLaneShape();
                // activity width : 50, folderManager : 20, margin : 75
                laneShape.width = (50 * lastChild.shape.level) + (20 * lastChild.shape.level) + (75 * lastChild.shape.level);
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
        if(typeof beforeShape != 'undefined') {
            folderShape.width = 50;
            folderShape.height = 50;

            folderShape.x = (folderShape.direction == 'left') ? beforeShape.shape.x - 75 : beforeShape.shape.x + 75;
            folderShape.y = 90 * (folderShape.index + 1);
        }

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
        let connectEdgeShape = edgeRenderer.render();

        let edgeEvent = new EdgeEvent();
        edgeEvent.canvas = this.canvas;

        if(fromShape.shape.workFlowType == 'myWorkFlow' || toShape.shape.workFlowType == 'myWorkFLow') {
            edgeEvent.bindContextMenu(connectEdgeShape, 'myWorkFlow', 'editorLayout');
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

    renderAdd() {
    }

    renderInsert() {

    }

    renderShare(sourceShape, targetShape) {
        let targetFolderManager = this.getLeftFolderManager(targetShape);

        let targetRightAllParent = [];
        targetRightAllParent.push(targetShape);
        targetRightAllParent = this.getShapeAllParent(targetShape, targetRightAllParent);

        let sourceFolderManager = this.getRightFolderManager(sourceShape);

        let sourceShapeAllElement = this.getShapeAllParent(sourceFolderManager, []);
        sourceShapeAllElement = this.getShapeAllChild(sourceFolderManager, sourceShapeAllElement);
        sourceShapeAllElement = this.createUniqueArray(sourceShapeAllElement, targetRightAllParent);
        sourceShapeAllElement = this.sortSharedArray(sourceShapeAllElement);

        if (sourceShapeAllElement.length > 0) {
            // 최상위 레벨 폴더만 parentId 변경
            for(let i in sourceShapeAllElement) {
                if(sourceShapeAllElement[i].shape.level == 1) {
                    sourceShapeAllElement[i].shape.parentId = targetShape.shape.id;
                    break;
                }
            }

            for (let i in sourceShapeAllElement) {
                let shape = sourceShapeAllElement[i];
                shape.shape.direction = 'left';
                shape.shape.x = targetFolderManager.shape.x - (75 * Number(i));

                let createdShape = null;
                if(shape.shape instanceof FolderShape) {
                    createdShape = this.renderFolderShape(shape.shape);
                    let createdFolderManagerShape = this.renderFolderManagerShape(createdShape, 'left');

                    this.renderEdgeShape(targetFolderManager, createdShape);
                    //this.renderEdgeShape(createdShape, createdFolderManagerShape);

                } else if(shape.shape instanceof EDShape) {
                    createdShape = this.renderEDShape(shape.shape);
                    //this.renderEdgeShape(beforeShape, createdShape);

                } else {
                    ;
                }
                // add child
                this.addChildToLane(createdShape);
            }
        }
    }

    isInTarget(ui) {
        let targetShape = null;
        let myWorkFlowLaneChild = [];

        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function(){
            if(this.shape.laneType == 'left' || this.shape.laneType == 'center') {
                if(typeof this.shape.children != 'undefined' && this.shape.children.length > 0) {
                    myWorkFlowLaneChild = myWorkFlowLaneChild.concat(this.shape.children);
                }
            }
        });

        for(let i in myWorkFlowLaneChild) {
            let target = $('#' + myWorkFlowLaneChild[i]);
            let shapeOffset = target.offset();

            // shape width and height 50 + plus margin area
            let shapeTop = shapeOffset.top - 25;
            let shapeBottom = shapeOffset.top + 50 + 25;
            let shapeLeft = shapeOffset.left - 25;
            let shapeRight = shapeOffset.left + 50 + 25;

            // 25 is shapes margin area size
            let draggableTop = ui.position.top;
            let draggableBottom = ui.position.top + 50;
            let draggableLeft = ui.position.left;
            let draggableRight = ui.position.left; + 50;

            if( ((shapeBottom >= draggableBottom) && (draggableBottom >= shapeTop))
                && ((shapeBottom >= draggableTop) && (draggableTop >= shapeTop))
                && ((shapeLeft <= draggableLeft) && (draggableLeft <= shapeRight))
                && ((shapeLeft <= draggableRight) && (draggableLeft <= shapeRight)) ) {

                targetShape = target[0];
                break;
            }
        };
        return targetShape;
    }

    createShapeSpan(ui, src) {
        let pngSrc = src.split('.')[0] + '.png';
        $('#draggable').css('display', 'block');
        $('#draggable').css('background-image', 'url(' + pngSrc +')');
        $('#draggable').offset({top: ui.position.top, left: ui.position.left});
    }

    createUniqueArray(standardArray, compareArray) {
        for(let i in standardArray) {
            if(compareArray.length > 0) {
                for(let j in compareArray) {
                    if (standardArray[i].shape.id == compareArray[j].shape.id) {
                        standardArray.splice(i, 1);
                    }
                }
            }
        }
        return standardArray;
    }

    getLeftFolderManager(shape) {
        let folderManager = null;
        let nextShapes = this.canvas._RENDERER.getNextShapes(shape);

        for(let i in nextShapes) {
            if(nextShapes[i].shape.direction == 'left') {
                folderManager = nextShapes[i];
                break;
            }
        }
        return folderManager;
    }

    getRightFolderManager(shape) {
        let folderManager = null;
        let nextShapes = this.canvas._RENDERER.getNextShapes(shape);

        for(let i in nextShapes) {
            if(nextShapes[i].shape.direction == 'right') {
                folderManager = nextShapes[i];
                break;
            }
        }
        return folderManager;
    }

    getShapeAllParent(folderManager, parents) {
        let prevShapes = this.canvas._RENDERER.getPrevShapes(folderManager);
        if(prevShapes.length > 0) {
            for(let i in prevShapes) {
                let prevShape = prevShapes[i];

                if(prevShape.shape instanceof FolderShape) {
                    parents.splice(0, 0, prevShape);
                }
                this.getShapeAllParent(prevShape, parents);
            }
        }
        return parents;
    }

    getShapeChild(childFolderManager, children) {
        let childNextShapes = this.canvas._RENDERER.getNextShapes(childFolderManager);
        if (childNextShapes.length > 0) {
            for (let i in childNextShapes) {
                let childNextShape = childNextShapes[i];

                if (childNextShape.shape instanceof FolderShape ||
                    childNextShape.shape instanceof EDShape) {
                    children.push(childNextShape);

                    let childFolderManager = this.canvas._RENDERER.getNextShapes(childNextShape);
                    if(childFolderManager.length > 0) {
                        this.getShapeChild(childFolderManager, children);
                    }
                }
            }
        }
        return children;
    }

    getShapeAllChild(folderManager, children) {
        let nextShapes = this.canvas._RENDERER.getNextShapes(folderManager);
        if (nextShapes.length > 0) {
            for (let i in nextShapes) {
                let nextShape = nextShapes[i];

                if (nextShape.shape instanceof FolderShape ||
                    nextShape.shape instanceof EDShape) {
                    children.push(nextShape);

                    let childFolderManager = this.canvas._RENDERER.getNextShapes(nextShape);
                    if(childFolderManager.length > 0) {
                        children.concat(this.getShapeChild(childFolderManager, children));
                    }
                }
            }
        }
        return children;
    }

    addChildToLane(createdShape) {
        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function() {
            if(this.shape.laneType == 'center') {
                this.shape.children.push(createdShape.id);
                return false;
            }
        });
    }

    sortSharedArray(array) {
        array.sort(function(a, b) {
            if(a.shape.SHAPE_ID < b.shape.SHAPE_ID) return 1;
            if(a.shape.SHAPE_ID > b.shape.SHAPE_ID) return -1;

            return 0;
        });
        return array;
    }
}