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

                // activity width : 50, folderManager : 50, margin : 75
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

        if(fromShape.shape.workFlowType == 'myWorkFlow' || toShape.shape.workFlowType == 'myWorkFLow') {
            let edgeEvent = new EdgeEvent();
            edgeEvent.canvas = this.canvas;
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

    // critical
    renderShare(sourceShape, targetShape) {
        //let sourceFolderManager = this.getRightFolderManager(sourceShape);
        //
        //let sourceShapeAllElement = this.getShapeAllParent(sourceFolderManager, []);
        //sourceShapeAllElement = this.getShapeAllChild(sourceFolderManager, sourceShapeAllElement);
        //sourceShapeAllElement = this.createUniqueArray(sourceShapeAllElement, targetRightAllParent);
        //sourceShapeAllElement = this.sortSharedArrayByLevel(sourceShapeAllElement);

        let targetFolderManager = this.getLeftFolderManager(targetShape);
        let sourceParentElements = this.getShapeAllParent(sourceShape, []);
        let beforeShape = targetFolderManager;

        let targetAllElement = this.getShapeAllParent(targetShape, []);
        targetAllElement = this.getShapeAllChild(targetFolderManager, targetAllElement);

        if(targetAllElement.length > 0) {
            let sourceShapeParent = this.findSourceShapeParent(sourceShape, targetAllElement);
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

    renderShareParent(beforeShape, sourceParentElements) {
        // draw parent
        for (let i in sourceParentElements) {
            let shape  = sourceParentElements[i];
            if(shape.shape instanceof FolderShape) {
                let createdParentShape = this.renderFolderShape(shape.shape, beforeShape);
                this.renderEdgeShape(beforeShape, createdParentShape);

                let createdParentFolderManagerShape = this.renderFolderManagerShape(createdParentShape, 'left');
                this.renderEdgeShape(createdParentShape, createdParentFolderManagerShape);

                beforeShape = createdParentFolderManagerShape;
                // add lane child
                this.addChildToLane(createdParentShape);

            } else if(shape.shape instanceof EDShape) {
                // parent 가 ED 인 경우는 없을 것 이다.
                // 예외를 위해 else if 문 미리 작성
                ;

            } else {
                ;
            }
        }
        return beforeShape;
    }

    renderShareSource(sourceShape, beforeShape) {
        sourceShape = this.changeSharedInformation(sourceShape);

        // draw source
        let createdSourceShape = null;
        if(sourceShape.shape instanceof FolderShape) {
            createdSourceShape = this.renderFolderShape(sourceShape.shape, beforeShape);
            this.renderEdgeShape(beforeShape, createdSourceShape);

            let createdSourceFolderManagerShape = this.renderFolderManagerShape(createdSourceShape, 'left');
            this.renderEdgeShape(createdSourceShape, createdSourceFolderManagerShape);

            beforeShape = createdSourceFolderManagerShape;

        } else if(sourceShape.shape instanceof EDShape) {
            createdSourceShape = this.renderFolderShape(sourceShape.shape, beforeShape);
            this.renderEdgeShape(beforeShape, createdSourceShape);

        } else {
            ;
        }
        // add lane child
        this.addChildToLane(createdSourceShape);

        return beforeShape;
    }

    renderShareChild(sourceShape, beforeShape, targetShape) {
        if(sourceShape.shape.folderShapes.length > 0) {
            sourceShape.shape.folderShapes = this.changeSharedInformation(sourceShape.shape.folderShapes, targetShape);

            for(let i in sourceShape.shape.folderShapes) {
                let childFolderShape = sourceShape.shape.folderShapes[i];

                let createdChildShape = this.renderFolderShape(childFolderShape, beforeShape);
                this.renderEdgeShape(beforeShape, createdChildShape);

                let createdChildFolderManagerShape = this.renderFolderManagerShape(createdChildShape, 'left');
                this.renderEdgeShape(createdChildShape, createdChildFolderManagerShape);

                // add lane child
                this.addChildToLane(createdChildShape);

                if(childFolderShape.folderShapes.length > 0) {
                    this.renderShareRecursive(childFolderShape, beforeShape, targetShape);

                } else if(childFolderShape.edShapes.length > 0) {
                    childFolderShape.edShapes = this.changeSharedInformation(childFolderShape.edShapes, targetShape);

                    for(let i in childFolderShape.edShapes) {
                        let childFolderEDShapes = childFolderShape.edShapes[i];

                        let createdChildFolderEDShapes = this.renderEDShape(childFolderEDShapes, createdChildFolderManagerShape);
                        this.renderEdgeShape(createdChildFolderManagerShape, createdChildFolderEDShapes);

                        // add lane child
                        this.addChildToLane(createdChildFolderEDShapes);
                    }

                } else {
                    ;
                }
            }

        } else if(sourceShape.shape.edShapes.length > 0) {
            sourceShape.shape.edShapes = this.changeSharedInformation(sourceShape.shape.edShapes, targetShape);

            for(let i in sourceShape.shape.edShapes) {
                let childFolderEDShapes = sourceShape.shape.edShapes[i];

                let createdChildFolderEDShapes = this.renderEDShape(childFolderEDShapes, beforeShape);
                this.renderEdgeShape(beforeShape, createdChildFolderEDShapes);

                // add lane child
                this.addChildToLane(createdChildFolderEDShapes);
            }

        } else {
            ;
        }
    }

    renderShareRecursive(sourceShape, beforeShape, targetShape) {
        if(sourceShape.shape.folderShapes.length > 0) {
            sourceShape.shape.folderShapes = this.changeSharedInformation(sourceShape.shape.folderShapes, targetShape);

            for (let i in sourceShape.shape.folderShapes) {
                let childFolderShape = sourceShape.shape.folderShapes[i];

                let createdChildShape = this.renderFolderShape(childFolderShape, beforeShape);
                this.renderEdgeShape(beforeShape, createdChildShape);

                let createdChildFolderManagerShape = this.renderFolderManagerShape(createdChildShape, 'left');
                this.renderEdgeShape(createdChildShape, createdChildFolderManagerShape);

                // add lane child
                this.addChildToLane(createdChildShape);

                if (childFolderShape.folderShapes.length > 0) {
                    this.renderShareRecursive(childFolderShape, beforeShape);

                } else if (childFolderShape.edShapes.length > 0) {
                    childFolderShape.edShapes = this.changeSharedInformation(childFolderShape.edShapes, targetShape);

                    for(let i in childFolderShape.edShapes) {
                        let childFolderEDShapes = childFolderShape.edShapes[i];

                        let createdChildFolderEDShapes = this.renderEDShape(childFolderEDShapes, createdChildFolderManagerShape);
                        this.renderEdgeShape(createdChildFolderManagerShape, createdChildFolderEDShapes);

                        // add lane child
                        this.addChildToLane(createdChildFolderEDShapes);
                    }
                }
            }
        }

    }

    isInTarget(ui) {
        let targetShape = null;
        let myWorkFlowLaneChild = [];

        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each((index, element) => {
            if(element.shape.laneType == 'left' || element.shape.laneType == 'center') {
                if(typeof element.shape.children != 'undefined' && element.shape.children.length > 0) {
                    myWorkFlowLaneChild = myWorkFlowLaneChild.concat(element.shape.children);
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
                    if(standardArray.length > 0) {
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

    findSourceShapeParent(sourceShape, targetAllElement) {
        let sourceShapeParent = null;
        for(let i in targetAllElement) {
            let targetElement = targetAllElement[i];

            if(targetElement.shape.id == sourceShape.shape.parentId) {
                sourceShapeParent = targetElement;
                break;
            }

        }
        return sourceShapeParent;
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

    changeSharedInformation(object, targetShape) {
        if(object instanceof Array) {
            // 최상위 레벨 폴더만 parentId 변경
            // 모든 레벨에 - 를 붙여야 한다. (방향이 반대이므로)
            for (let i in object) {
                if(typeof object[i].shape !== 'undefined') {
                    if (object[i].shape.level == 1) {
                        object[i].shape.parentId = targetShape.shape.id;
                    }
                    object[i].shape.level = -(object[i].shape.level);
                    object[i].shape.direction = 'left';

                } else {
                    if (object[i].level == 1) {
                        object[i].parentId = targetShape.id;
                    }
                    object[i].level = -(object[i].level);
                    object[i].direction = 'left';
                }
            }
            return object;

        } else {
            object.shape.level = -(object.shape.level);
            object.shape.direction = 'left';

            return object;
        }
    }
}