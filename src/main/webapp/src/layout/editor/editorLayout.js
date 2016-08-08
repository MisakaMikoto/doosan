/**
 * Created by MisakaMikoto on 2016. 8. 6..
 */
class EditorLayout extends Layout {
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

    drawEditor() {
        this.draw(this.data);
    }

    renderActivityShape(activityShape) {
        activityShape.width = 50;
        activityShape.height = 50;

        if(activityShape.direction == 'left') {
            activityShape.x = $('#canvas').width() - 50

        } else {
            activityShape.x = 50;
        }
        activityShape.y = 90 * (activityShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = activityShape;
        return shapeRenderer.render(this.canvas);
    }

    renderFolderShape(folderShape) {
        folderShape.width = 50;
        folderShape.height = 50;

        if(folderShape.direction == 'left') {
            folderShape.x = ($('#canvas').width() - 50) - (folderShape.width / 2) + (120 * folderShape.level);

        } else {
            folderShape.x = 50 + (folderShape.width / 2) + (120 * folderShape.level);
        }
        folderShape.y = 90 * (folderShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = folderShape;
        return shapeRenderer.render(this.canvas);
    }

    renderEDShape(edShape) {
        edShape.width = 50;
        edShape.height = 50;

        if(edShape.direction == 'left') {
            edShape.x = ($('#canvas').width() - 50) - (edShape.width / 2) + (120 * edShape.level);

        } else {
            edShape.x = 50 + (edShape.width / 2) + (120 * edShape.level);
        }
        edShape.y = 90 * (edShape.index + 1);

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = edShape;
        return shapeRenderer.render(this.canvas);
    }

    renderEdgeShape(fromShape, toShape) {
        let edgeRenderer = new EdgeRenderer();
        edgeRenderer.from = fromShape;
        edgeRenderer.to = toShape;
        edgeRenderer.render(this.canvas);
    }

    renderFolderManagerShape(shape, direction) {
        let folderManager = new FolderManager();
        folderManager.id = shape.shape.id + "collapse";
        folderManager.width = 30;
        folderManager.height = 30;

        folderManager.level = shape.shape.level;
        folderManager.index = shape.shape.index;

        if(direction == 'left') {
            folderManager.x = shape.shape.x - 55;
            folderManager.direction = 'left';

        } else {
            folderManager.x = shape.shape.x + 55;
            folderManager.direction = 'right';
        }
        folderManager.y = shape.shape.y;
        folderManager.parentId = shape.shape.id;
        folderManager.type = 'close';

        let shapeRenderer = new ShapeRenderer();
        shapeRenderer.shape = folderManager;
        return shapeRenderer.render(this.canvas);
    }
}