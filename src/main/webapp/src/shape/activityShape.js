/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
class ActivityShape extends ImageShape {
    constructor(name) {
        super('/resources/activity.svg', name);
        this.SHAPE_ID = 'OG.shape.doosan.activity';

        this._leftFolderShapes = [];
        this._rightFolderShapes = [];
    }

    set leftFolderShapes(leftFolderShapes) {
        this._leftFolderShapes = leftFolderShapes;
    }

    get leftFolderShapes() {
        return this._leftFolderShapes;
    }

    set rightFolderShapes(rightFolderShapes) {
        this._leftFolderShapes = rightFolderShapes;
    }

    get rightFolderShapes() {
        return this._rightFolderShapes;
    }
}