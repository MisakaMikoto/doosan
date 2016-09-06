/**
 * Created by MisakaMikoto on 2016. 8. 2..
 */
class FolderManager extends ImageShape {
    constructor(name) {
        super('./resources/collapse.svg', name);
        this.SHAPE_ID = 'OG.shape.doosan.folderManager';

        this._type = '';
    }

    set type(type) {
        this._type = type;
    }

    get type() {
        return this._type;
    }
}