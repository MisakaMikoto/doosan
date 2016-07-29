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
        canvas._CONFIG.DEFAULT_STYLE.EDGE["edge-type"] = "bezier";
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
            this.addLayer(layer.create(jsonData[i], i));
        }
    }

    drawLayer() {
        // activity count == layers size
        let layers = this.layers;
        for(let i in layers) {
            this.renderActivityShape(layers[i], i);

            let folders = layers[i].folders;
            if(folders !== 'undefined' && folders.length > 0) {
                for (let j in folders) {
                    this.renderFolderShape(folders[j], j);
                }
            }

            let eds = layers[i].eds;
            if(eds !== 'undefined' && eds.length > 0) {
                for(let j in eds) {
                    this.renderEDShape(eds[j], j);
                }
            }
        }
    }

    renderActivityShape(activity, index) {
        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.width = 50;
        shapeRenderer.height = 50;
        shapeRenderer.x = $('#canvas').width() / 2 - (shapeRenderer.width / 2);
        shapeRenderer.y = 75 * (Number(index) + 1);
        shapeRenderer.shape = new ActivityShape('activity');
        shapeRenderer.render(this.canvas);
    }

    renderFolderShape(folder, index) {
        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.width = 50;
        shapeRenderer.height = 50;
        shapeRenderer.x = $('#canvas').width() / 2 - (shapeRenderer.width / 2) - (75 * folder.level);
        shapeRenderer.y = 75 * (Number(index) + 1);
        shapeRenderer.shape = new ActivityShape('folder');
        shapeRenderer.render(this.canvas);
    }

    renderEDShape(ed, index) {
        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.width = 50;
        shapeRenderer.height = 50;
        shapeRenderer.x = $('#canvas').width() / 2 - (shapeRenderer.width / 2) - (75 * ed.level);
        shapeRenderer.y = 75 * (Number(index) + 1);
        shapeRenderer.shape = new ActivityShape('ed');
        shapeRenderer.render(this.canvas);
    }
}
