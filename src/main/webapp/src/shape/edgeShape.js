/**
 * Created by MisakaMikoto on 2016. 8. 17..
 */
class EdgeShape extends OG.EdgeShape {
    constructor([x, y], [width, height]){
        super([x, y], [width, height]);

        this.SHAPE_ID = 'OG.shape.doosan.edge';

        this.SELECTABLE = false;
        this.LABEL_EDITABLE = false;
        this.RESIZABLE = false;
        this.MOVABLE = false;

        this.CONNECT_CLONEABLE = false;
        this.CONNECTABLE = false;
        this.DELETABLE = false;
    }
}
