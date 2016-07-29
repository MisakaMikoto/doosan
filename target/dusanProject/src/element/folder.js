/**
 * Created by MisakaMikoto on 2016. 7. 28..
 */
class Folder extends Node {
    constructor() {
        super();

        this._folders = [];
        this._eds = [];
    }

    set folders(folders) {
        this._folders = folders;
    }

    get folders() {
        return this._folders;
    }

    set eds(eds) {
        this._eds = eds;
    }

    get eds() {
        return this._eds;
    }
}