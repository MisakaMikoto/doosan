/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class FolderShape extends OG.shape.ImageShape {
    constructor(name) {
        super('/resources/folder.svg', name);

        this.SHAPE_ID = 'OG.shape.doosan.folder';
        this.LABEL_EDITABLE = false;
        this.label = name;
    }
}