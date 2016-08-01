/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
class Node {
    constructor() {
        this._id = '';
        this._name = '';
        this._parentId = '';
        this._level = '';

        this._from = '';
        this._to = '';

        this._x = '';
        this._y = '';

        this._width = '';
        this._height = '';

        this._index = '';
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set parentId(parentId) {
        this._parentId = parentId;
    }

    get parentId() {
        return this._parentId;
    }

    set level(level) {
        this._level = Number(level);
    }

    get level() {
        return Number(this._level);
    }

    set to(to) {
        this._to = to;
    }

    get to() {
        return this._to;
    }

    set from(from) {
        this._from = from;
    }

    get from() {
        return this._from;
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

    set index(index) {
        this._index = Number(index);
    }

    get index() {
        return Number(this._index);
    }

}