/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
class Activity extends Node {
    constructor() {
        super();

        this._folders = [];

    }

    set folders(folders) {
        this._folders = folders;
    }

    get folders() {
        return this._folders;
    }

    createShape() {

    }
}