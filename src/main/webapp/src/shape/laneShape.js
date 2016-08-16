/**
 * Created by MisakaMikoto on 2016. 8. 9..
 */
class LaneShape extends OG.GroupShape {
    constructor(workFlowType){
        super();

        this.SHAPE_ID = 'OG.shape.doosan.' + workFlowType;

        this.LABEL_EDITABLE = false;
        this.RESIZABLE = false;
        this.MOVABLE = false;

        this.CONNECT_CLONEABLE = false;
        this.CONNECTABLE = false;
        this.DELETABLE = false;

        this._children = '';
        this._laneType = '';
    }

    set children(children) {
        this._children = children;
    }

    get children() {
        return this._children;
    }

    set laneType(laneType) {
        this._laneType = laneType;
    }

    get laneType() {
        return this._laneType;
    }
}
