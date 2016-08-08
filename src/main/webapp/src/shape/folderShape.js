/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class FolderShape extends ImageShape {
    constructor(name) {
        super('/resources/folder.svg', name);
        this.SHAPE_ID = 'OG.shape.doosan.folder';

        this._folderShapes = [];
        this._edShapes = [];
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
}