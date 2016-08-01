/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
class Layout {
    constructor() {
        this._canvas = '';
        this._layers = [];
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    get canvas() {
        return this._canvas;
    }

    set layers(layers) {
        this._layers = layers;
    }

    get layers() {
        return this._layers;
    }

    addLayer(layer) {
        this.layers.push(layer);
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

    createLayer(jsonData) {
        let layer = new Layer();
        for(let i in jsonData) {
            let createdLayer = layer.create(jsonData[i], i);
            this.addLayer(createdLayer);
        }
    }

    drawLayerShape() {
        // activity count == layers size
        let layers = this.layers;
        for(let i in layers) {
            var activityShape = this.renderActivityShape(layers[i].activity);

            let folders = layers[i].folders;
            if(folders !== 'undefined' && folders.length > 0) {
                for (let j in folders) {
                    var folderShape = null;
                    // folder parent activity
                    if(layers[i].activity.id == folders[j].parentId) {
                        folderShape = this.renderFolderShape(folders[j]);
                        this.renderEdgeShape(activityShape, folderShape);

                    // folder parent folder
                    } else {
                        let cloneFolders = folders;
                        for(let k in cloneFolders) {
                            if(cloneFolders[k].id == folders[j].parentId) {
                                let parentFolderShape = this.renderFolderShape(cloneFolders[k]);
                                folderShape = this.renderFolderShape(folders[j]);

                                this.renderEdgeShape(parentFolderShape, folderShape);
                            }
                        }
                    }

                    let eds = layers[i].eds;
                    if (eds !== 'undefined' && eds.length > 0) {
                        for (let l in eds) {
                            if(folders[j].id == eds[l].parentId) {
                                let edShape = this.renderEDShape(eds[l]);
                                this.renderEdgeShape(folderShape, edShape);
                            }
                        }
                    }
                }
            }
        }
    }

    renderActivityShape(activity) {
        let shapeRenderer = new ShapeRenderer();
        activity.width = 50;
        activity.height = 50;
        activity.x = $('#canvas').width() / 2 - (activity.width / 2);
        activity.y = 75 * (activity.index + 1);
        shapeRenderer.shape = new ActivityShape(activity.name.toString());
        return shapeRenderer.render(this.canvas, activity);
    }

    renderFolderShape(folder) {
        let shapeRenderer = new ShapeRenderer();
        folder.width = 50;
        folder.height = 50;
        folder.x = $('#canvas').width() / 2 - (folder.width / 2) - (120 * folder.level);
        folder.y = 75 * (folder.index + 1);
        shapeRenderer.shape = new FolderShape(folder.name.toString());
        return shapeRenderer.render(this.canvas, folder);
    }

    renderEDShape(ed) {
        let shapeRenderer = new ShapeRenderer();
        ed.width = 50;
        ed.height = 50;
        ed.x = $('#canvas').width() / 2 - (ed.width / 2) - (120 * ed.level);
        ed.y = 75 * (ed.index + 1);
        shapeRenderer.shape = new EDShape(ed.name.toString());
        return shapeRenderer.render(this.canvas, ed);
    }

    renderEdgeShape(fromShape, toShape) {
        let edgeRenderer = new EdgeRenderer();
        return edgeRenderer.render(this.canvas, fromShape, toShape);
    }
}
