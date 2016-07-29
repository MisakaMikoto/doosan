/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class EDShape extends OG.shape.ImageShape {
    constructor(name) {
        super('/resources/ed.svg', name);

        this.SHAPE_ID = 'OG.shape.doosan.ed';
        this.LABEL_EDITABLE = false;
        this.label = name;
    }
}