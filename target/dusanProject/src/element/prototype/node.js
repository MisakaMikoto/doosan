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
        this._level = level;
    }

    get level() {
        return this._level;
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
}