/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
class ActivityShape extends OG.shape.ImageShape {
    constructor(name) {
        super('/resources/activity.svg', name);

        this.SHAPE_ID = 'OG.shape.doosan.activity';
        this.LABEL_EDITABLE = false;
        this.label = name;
    }
}