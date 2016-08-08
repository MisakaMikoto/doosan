/**
 * Created by uengine on 2016. 8. 6..
 */
class Layout {
    constructor() {
        this._canvas = '';

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
        let canvas = new OG.Canvas(canvasId, [1000, 600]);
        canvas = this.configurationCanvas(canvas);
        this.canvas = canvas;
    }

    configurationCanvas(canvas) {
        canvas.initConfig({
            selectable       : true,
            dragSelectable   : true,
            movable          : true,
            resizable        : true,
            connectable      : true,
            connectCloneable : true,
            connectRequired  : true,
            labelEditable    : true,
            groupDropable    : true,
            collapsible      : true,
            enableHotKey     : true,
            enableContextMenu: true
        });
        return canvas;
    }

    draw(activityJSONData) {
        let activityShapes = activityJSONData.activityShapes;
        if(typeof activityShapes != 'undefined' && activityShapes.length > 0) {
            let beforeLastIndex = 0;

            for(let i in activityShapes) {
                let activityShape = activityShapes[i];
                activityShape.level = 0;
                activityShape.index = beforeLastIndex;

                let createdActivityShape = this.type.renderActivityShape(activityShape);
                let createdLeftActivityCollapseShape = null;
                let createdRightActivityCollapseShape = null;

                if(this.type instanceof MonitoringLayout) {
                    createdLeftActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'left');
                    this.type.renderEdgeShape(createdActivityShape, createdLeftActivityCollapseShape);

                    createdRightActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'right');
                    this.type.renderEdgeShape(createdActivityShape, createdRightActivityCollapseShape);

                } else {
                    if(activityShape.direction == 'left') {
                        createdLeftActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'left');
                        this.type.renderEdgeShape(createdActivityShape, createdLeftActivityCollapseShape);

                    } else {
                        createdRightActivityCollapseShape = this.type.renderFolderManagerShape(createdActivityShape, 'right');
                        this.type.renderEdgeShape(createdActivityShape, createdRightActivityCollapseShape);
                    }
                }

                // find folders
                let leftFolderShapes = activityShape.leftFolderShapes;
                if(typeof leftFolderShapes != 'undefined' && leftFolderShapes.length > 0) {
                    for(let i in leftFolderShapes) {
                        if (activityShape.id == leftFolderShapes[i].parentId) {
                            let folderShape = leftFolderShapes[i];
                            folderShape.parentId = activityShape.id;
                            folderShape.level = activityShape.level - 1;
                            folderShape.index = beforeLastIndex + activityShape.index;

                            let createdFolderShape = this.type.renderFolderShape(folderShape);
                            this.type.renderEdgeShape(createdLeftActivityCollapseShape, createdFolderShape);

                            let createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, 'left');
                            this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                            // find child folder
                            let childFolderShapes = folderShape.folderShapes;
                            if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                                beforeLastIndex = this.recursiveFolder(childFolderShapes, createdFolderCollapseShape, 'left');
                            }

                            // find eds
                            let edShapes = leftFolderShapes[i].edShapes;
                            if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                                for(let i in edShapes) {
                                    if(folderShape.id == edShapes[i].parentId) {
                                        let edShape = edShapes[i];
                                        edShape.parentId = folderShape.id;
                                        edShape.level = folderShape.level - 1;
                                        edShape.index = folderShape.index + Number(i);

                                        let createdEDShape = this.type.renderEDShape(edShape);
                                        this.type.renderEdgeShape(createdFolderCollapseShape, createdEDShape);
                                        beforeLastIndex += 1;
                                    }
                                }
                            }
                        }
                    }
                }

                beforeLastIndex = 0;
                // find folders
                let rightFolderShapes = activityShape.rightFolderShapes;
                if(typeof rightFolderShapes != 'undefined' && rightFolderShapes.length > 0) {
                    for(let i in rightFolderShapes) {
                        if (activityShape.id == rightFolderShapes[i].parentId) {
                            let folderShape = rightFolderShapes[i];
                            folderShape.parentId = activityShape.id;
                            folderShape.level = activityShape.level + 1;
                            folderShape.index = beforeLastIndex + activityShape.index;

                            let createdFolderShape = this.type.renderFolderShape(folderShape);
                            this.type.renderEdgeShape(createdRightActivityCollapseShape, createdFolderShape);

                            let createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, 'right');
                            this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                            // find child folder
                            let childFolderShapes = folderShape.folderShapes;
                            if (typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                                beforeLastIndex = this.recursiveFolder(childFolderShapes, createdFolderCollapseShape, 'right');
                            }

                            // find eds
                            let edShapes = rightFolderShapes[i].edShapes;
                            if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                                for(let i in edShapes) {
                                    if(folderShape.id == edShapes[i].parentId) {
                                        let edShape = edShapes[i];
                                        edShape.parentId = folderShape.id;
                                        edShape.level = folderShape.level + 1;
                                        edShape.index = folderShape.index + Number(i);

                                        let createdEDShape = this.type.renderEDShape(edShape);
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
    }

    recursiveFolder(folderShapes, rootCollapseShape, direction) {
        var beforeLastIndex = rootCollapseShape.shape.index;

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

                    let createdFolderShape = this.type.renderFolderShape(folderShape, direction);
                    this.type.renderEdgeShape(rootCollapseShape, createdFolderShape);

                    var createdFolderCollapseShape = this.type.renderFolderManagerShape(createdFolderShape, direction);
                    this.type.renderEdgeShape(createdFolderShape, createdFolderCollapseShape);

                    let childFolderShapes = folderShape.folderShapes;
                    if(typeof childFolderShapes != 'undefined' && childFolderShapes.length > 0) {
                        recursiveFolder(childFolderShapes, createdFolderShape, direction);

                    }
                    // save last index
                    beforeLastIndex = folderShape.index;

                    // find eds
                    let edShapes = folderShapes[i].edShapes;
                    if(typeof edShapes != 'undefined' && edShapes.length > 0) {
                        for(let i in edShapes) {
                            if(folderShape.id == edShapes[i].parentId) {
                                let edShape = edShapes[i];
                                edShape.parentId = folderShape.id;

                                if(direction == 'left') {
                                    edShape.level = folderShape.level - 1;

                                } else {
                                    edShape.level = folderShape.level + 1;
                                }
                                edShape.index = folderShape.index + Number(i);

                                let createdEDShape = this.type.renderEDShape(edShape, direction);
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
}