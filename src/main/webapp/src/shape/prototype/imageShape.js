/**
 * Created by MisakaMikoto on 2016. 8. 2..
 */
class ImageShape extends OG.shape.ImageShape {
    constructor(src, name) {
        super(src, name);

        this._src = src;

        this.LABEL_EDITABLE = false;
        this.RESIZABLE = false;
        this.MOVABLE = false;

        this.CONNECT_CLONEABLE = false;
        this.CONNECTABLE = false;
        this.DELETABLE = false;

        this.label = name;

        this._x = '';
        this._y = '';

        this._width = '';
        this._height = '';

        this._level = '';
        this._index = '';

        this._parentId = '';
        this._direction = '';
        this._workFlowType = '';
    }

    set src(src) {
        this._src = src;
    }

    get src() {
        return this._src;
    }

    set x(x) {
        this._x = Number(x);
    }

    get x() {
        return Number(this._x);
    }

    set y(y) {
        this._y = Number(y);
    }

    get y() {
        return Number(this._y);
    }

    set width(width) {
        this._width = Number(width);
    }

    get width() {
        return Number(this._width);
    }

    set height(height) {
        this._height = Number(height);
    }

    get height() {
        return Number(this._height);
    }

    set level(level) {
        this._level = Number(level);
    }

    get level() {
        return this._level;
    }

    set index(index) {
        this._index = Number(index);
    }

    get index() {
        return Number(this._index);
    }

    set parentId(parentId) {
        this._parentId = parentId;
    }

    get parentId() {
        return this._parentId;
    }

    set direction(direction) {
        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }

    set workFlowType(workFlowType) {
        this._workFlowType = workFlowType;
    }

    get workFlowType() {
        return this._workFlowType;
    }
}