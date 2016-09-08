/**
 * Created by uengine on 2016. 8. 6..
 */
class Layout {
    constructor(canvas) {
        this._canvas = canvas;

        this._activityShapes = '';
        this._folderShapes = [];
        this._edShapes = [];

        this._type = '';
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    get canvas() {
        return this._canvas;
    }

    set activityShapes(activityShapes) {
        this._activityShapes = activityShapes;
    }

    get activityShapes() {
        return this._activityShapes;
    }

    set folderShapes(folderShapes) {
        this._folderShapes = folderShapes;
    }

    get folderShapes() {
        return this._folderShapes;
    }

    set edShapes(edShapes) {
        this._edShapes = edShapes;
    }

    get edShapes() {
        return this._edShapes;
    }

    set type(type) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    createCanvas(canvasId) {
        let canvas = new OG.Canvas(canvasId, [1980, 600]);
        canvas = this.configurationCanvas(canvas);
        this.canvas = canvas;
    }

    configurationCanvas(canvas) {
        canvas.initConfig({
            selectable       : true,
            dragSelectable   : true,
            movable          : false,
            resizable        : false,
            connectable      : true,
            connectCloneable : true,
            connectRequired  : true,
            labelEditable    : true,
            groupDropable    : true,
            collapsible      : true,
            enableHotKey     : true,
            enableContextMenu: false
        });
        return canvas;
    }

    draw(activityJSONData) {
        let workFlowType = activityJSONData.workFlowType;

        let activityShapes = activityJSONData.activityShapes;
        if(typeof activityShapes != 'undefined' && activityShapes.length > 0) {
            let beforeLastIndex = 0;

            for(let i in activityShapes) {
                let activityShape = activityShapes[i];
                activityShape.level = 0;
                activityShape.index = beforeLastIndex + Number(i);
                activityShape.workFlowType = workFlowType;

                let createdActivityShape = this.type.renderActivityShape(activityShape);

                let createdLeftActivityFolderManager = null;
                let createdRightActivityFolderManager = null;

                if(workFlowType == 'myWorkFlow') {
                    createdLeftActivityFolderManager = this.type.renderFolderManagerShape(createdActivityShape, 'left');
                    this.type.renderEdgeShape(createdActivityShape, createdLeftActivityFolderManager);
                }

                createdRightActivityFolderManager = this.type.renderFolderManagerShape(createdActivityShape, 'right');
                this.type.renderEdgeShape(createdActivityShape, createdRightActivityFolderManager);

                // find folders
                let leftFolderShapes = activityShape.leftFolderShapes;
                if(typeof leftFolderShapes != 'undefined' && leftFolderShapes.length > 0) {
                    for(let j in leftFolderShapes) {
                        if (activityShape.id == leftFolderShapes[j].parentId) {
                            let folderShape = leftFolderShapes[j];
                            folderShape.parentId = activityShape.id;
                            folderShape.level = activityShape.level - 1;
                            folderShape.index = beforeLastIndex + activityShape.index;
                            folderShape.workFlowType = workFlowType;

                            let createdFolderShape = this.type.renderFolderShape(folderShape, createdLeftActivityFolderManager);
                            this.type.renderEdgeShape(createdLeftActivityFolderManager, createdFolderShape);

                            let createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, 'left');
                            this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                            // find child folder
                            let childFolderShapes = folderShape.folderShapes;
                            if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                                beforeLastIndex = this.recursiveFolder(childFolderShapes, createdFolderCollapseShape, 'left', workFlowType);
                            }

                            // find eds
                            let edShapes = leftFolderShapes[j].edShapes;
                            if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                                for(let k in edShapes) {
                                    if(folderShape.id == edShapes[k].parentId) {
                                        let edShape = edShapes[k];
                                        edShape.parentId = folderShape.id;
                                        edShape.level = folderShape.level - 1;
                                        edShape.index = folderShape.index + Number(k);
                                        edShape.workFlowType = workFlowType;

                                        let createdEDShape = this.type.renderEDShape(edShape, createdFolderCollapseShape);
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
                let rightFolderShapes = activityShape.rightFolderShapes;
                if(typeof rightFolderShapes != 'undefined' && rightFolderShapes.length > 0) {
                    for(let j in rightFolderShapes) {
                        if (activityShape.id == rightFolderShapes[j].parentId) {
                            let folderShape = rightFolderShapes[j];
                            folderShape.parentId = activityShape.id;
                            folderShape.level = activityShape.level + 1;
                            folderShape.index = beforeLastIndex + activityShape.index;
                            folderShape.workFlowType = workFlowType;

                            let createdFolderShape = this.type.renderFolderShape(folderShape, createdRightActivityFolderManager);
                            this.type.renderEdgeShape(createdRightActivityFolderManager, createdFolderShape);

                            let createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, 'right');
                            this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                            // find child folder
                            let childFolderShapes = folderShape.folderShapes;
                            if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                                beforeLastIndex = this.recursiveFolder(childFolderShapes, createdFolderCollapseShape, 'right', workFlowType);
                            }

                            // find eds
                            let edShapes = rightFolderShapes[j].edShapes;
                            if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                                for(let k in edShapes) {
                                    if(folderShape.id == edShapes[k].parentId) {
                                        let edShape = edShapes[k];
                                        edShape.parentId = folderShape.id;
                                        edShape.level = folderShape.level + 1;
                                        edShape.index = folderShape.index + Number(k);
                                        edShape.workFlowType = workFlowType;

                                        let createdEDShape = this.type.renderEDShape(edShape, createdFolderCollapseShape);
                                        this.type.renderEdgeShape(createdFolderCollapseShape, createdEDShape);
                                        beforeLastIndex += 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        let laneShapes = activityJSONData.laneShapes;
        if(typeof laneShapes != 'undefined' && laneShapes.length > 0) {
            for(let i in laneShapes) {
                this.type.renderLaneShape(laneShapes[i], workFlowType);
            }
        }
        this.sendLaneToBack();
        this.replaceTop();
    }

    recursiveFolder(folderShapes, rootCollapseShape, direction, workFlowType) {
        let beforeLastIndex = rootCollapseShape.shape.index;

        // find folder
        if(typeof folderShapes != 'undefined' && folderShapes.length > 0) {
            for(let i in folderShapes) {
                if (rootCollapseShape.shape.parentId == folderShapes[i].parentId) {
                    let folderShape = folderShapes[i];
                    folderShape.parentId = rootCollapseShape.shape.parentId;

                    if(direction == 'left') {
                        folderShape.level = rootCollapseShape.shape.level - 1;

                    } else {
                        folderShape.level = rootCollapseShape.shape.level + 1
                    }
                    folderShape.index = beforeLastIndex;
                    folderShape.workFlowType = workFlowType;

                    let createdFolderShape = this.type.renderFolderShape(folderShape, rootCollapseShape);
                    this.type.renderEdgeShape(rootCollapseShape, createdFolderShape);

                    var createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, direction);
                    this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                    let childFolderShapes = folderShape.folderShapes;
                    if(typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                        this.recursiveFolder(childFolderShapes, createdFolderShape, direction);
                    }
                    // save last index and level
                    beforeLastIndex = folderShape.index;

                    // find eds
                    let edShapes = folderShapes[i].edShapes;
                    if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                        for(let j in edShapes) {
                            if(folderShape.id == edShapes[j].parentId) {
                                let edShape = edShapes[j];
                                edShape.parentId = folderShape.id;

                                if(direction == 'left') {
                                    edShape.level = folderShape.level - 1;

                                } else {
                                    edShape.level = folderShape.level + 1;
                                }
                                edShape.index = folderShape.index + Number(j);
                                edShape.workFlowType = workFlowType;

                                let createdEDShape = this.type.renderEDShape(edShape, createdFolderCollapseShape);
                                this.type.renderEdgeShape(createdFolderCollapseShape, createdEDShape);
                                beforeLastIndex += 1;
                            }
                        }
                    }
                }
            }
        }
        return beforeLastIndex;
    }

    sendLaneToBack() {
        $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element) => {
            $(element).attr('_selected', 'true');
        });

        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each((index, element) => {
           $(element).attr('_selected', 'true');
        });
        this.canvas._HANDLER.sendToBack();
    }

    replaceTop() {
        let fixedOtherWorkFlowWidth = 0;
        $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element) => {
            fixedOtherWorkFlowWidth += element.shape.width;
        });

        $('#otherWorkFlow').width(fixedOtherWorkFlowWidth);
        $('#myWorkFlow').width($(window).width() - $('#otherWorkFlow').width());

    }

    getFirstOtherFLowLaneShape() {
        let standardLaneShape = $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]')[0];
        $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element) => {
            if (standardLaneShape.shape.x > element.shape.x) {
                standardLaneShape = element;
            }
        });
        return standardLaneShape;
    }

    getLastOtherFLowLaneShape() {
        let standardLaneShape = $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]')[0];
        $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element) => {
            if (standardLaneShape.shape.x < element.shape.x) {
                standardLaneShape = element;
            }
        });
        return standardLaneShape;
    }

    getFirstMyFLowLaneShape() {
        let standardLaneShape = $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]')[0];
        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each((index, element) => {
            if (standardLaneShape.shape.x > element.shape.x) {
                standardLaneShape = element;
            }
        });
        return standardLaneShape;
    }

    getCenterMyFLowLaneShape() {
        let centerMyFlowLane = null;
        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each((index, element) => {
            if(element.shape.laneType == 'center') {
                centerMyFlowLane = element;
                return false;
            }
        });
        return centerMyFlowLane;
    }

    getLastMyFLowLaneShape() {
        let standardLaneShape = $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]')[0];
        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each((index, element) => {
            if (standardLaneShape.shape.x < element.shape.x) {
                standardLaneShape = element;
            }
        });
        return standardLaneShape;
    }

    getShapeLeftAllChildren(shape, children) {
        let nextShapes = this.canvas._RENDERER.getNextShapes(shape);
        if(nextShapes.length > 0) {
            for(let i in nextShapes) {
                if( (nextShapes[i].shape instanceof FolderShape || nextShapes[i].shape instanceof EDShape)
                    && (nextShapes[i].shape.direction == 'left') ) {
                    children.push(nextShapes[i]);
                }
                this.getShapeLeftAllChildren(nextShapes[i], children);
            }
        }
        return children;
    }

    getShapeRightAllChildren(shape, children) {
        let nextShapes = this.canvas._RENDERER.getNextShapes(shape);
        if(nextShapes.length > 0) {
            for(let i in nextShapes) {
                if( (nextShapes[i].shape instanceof FolderShape || nextShapes[i].shape instanceof EDShape)
                    && (nextShapes[i].shape.direction == 'right') ) {
                    children.push(nextShapes[i]);
                }
                this.getShapeRightAllChildren(nextShapes[i], children);
            }
        }
        return children;
    }

    setReplaceLaneChildren(laneShape) {
        let replaceChildren = [];
        let children = laneShape.children;
        for(let i in children) {
            $('[_shape="IMAGE"]').each((index, element) => {
                if(element.shape.fId == children[i]) {
                    replaceChildren.push(element.id);

                    // add folderManager
                    // critical
                    let folderManager = this.canvas._RENDERER.getNextShapes($('#' + element.id));
                    if(folderManager.length > 0) {
                        replaceChildren.push(folderManager[0].id);
                    }
                }
            });
        }
        laneShape.children = replaceChildren;
        return laneShape;
    }

    // critical method
    replace(targetShape, targetLane) {
        // replace function operate not root folderManager
        if(!(this.canvas._RENDERER.getPrevShapes(targetShape)[0].shape instanceof ActivityShape)) {
            let changeIndex = 0;
            let children = null;

            if(targetShape.shape.direction == 'left') {
                children = this.getShapeLeftAllChildren(targetShape, []);

            } else {
                children = this.getShapeRightAllChildren(targetShape, []);
            }

            let lastPositionChild = children[children.length - 1];

            for(let i in targetLane.shape.children) {
                let offset = [];
                let x = 0;
                let y = 0;

                let child = $('#' + targetLane.shape.children[i])[0];
                if(targetShape.shape.type == 'close') {
                    changeIndex = lastPositionChild.shape.index - targetShape.shape.index;

                    if (child.shape.index > lastPositionChild.shape.index) {
                        y -= 90 * changeIndex;
                    }

                } else {
                    changeIndex = lastPositionChild.shape.index;

                    if (children.length > 1 && targetShape.shape.index < child.shape.index && changeIndex < child.shape.index) {
                        y += 90 * changeIndex;
                    }
                }

                offset.push(x);
                offset.push(y);
                this.canvas._RENDERER.move(child, offset);
            }
        }
    }
}