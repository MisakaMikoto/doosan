/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
class Layer {
    constructor() {
        this._activity = '';
        this._folders = [];
        this._eds = [];
    }

    set activity(activity) {
        this._activity = activity;
    }

    get activity() {
        return this._activity;
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

    create(activityJSONData) {
        var activityLevel = 0;

        let activity = new Activity();
        activity.id = activityJSONData.id;
        activity.name = activityJSONData.name;
        activity.level = activityLevel;

        // find folders
        let folderJSONData = activityJSONData._folders;
        if(folderJSONData !== 'undefined' && folderJSONData.length > 0) {
            let folderLevel = activityLevel + 1;

            for(let i in folderJSONData) {
                let folder = new Folder();
                folder.id = folderJSONData[i].id;
                folder.name = folderJSONData[i].name;
                folder.parentId = activity.id;
                folder.level = folderLevel;
                this.folders.push(folder);

                // find eds
                let edJSONData = folderJSONData[i]._eds;
                if(edJSONData !== 'undefined' && edJSONData.length > 0) {
                    let edLevel = folderLevel + 1;

                    for(let j in edJSONData) {
                        let ed = new ED();
                        ed.id = edJSONData[j].id;
                        ed.name = edJSONData[j].name;
                        ed.parentId = folder.id;
                        ed.level = edLevel;
                        this.eds.push(ed);
                    }
                }

                // find child folder
                let childFolderJSONData = folderJSONData[i]._folders;
                if(childFolderJSONData !== 'undefined' && childFolderJSONData.length > 0) {
                    recursiveFolder(childFolderJSONData, folder);
                }
            }
        }
        this.activity = activity;
        return this;
    }

    recursiveFolder(folderJSONData, rootFolder) {
        // find folder
        if(folderJSONData !== 'undefined' && folderJSONData.length > 0) {
            let folderLevel = rootFolder.level + 1;

            for(let i in folderJSONData) {
                let folder = new Folder();
                folder.id = folderJSONData[i].id;
                folder.name = folderJSONData[i].name;
                folder.parentId = rootFolder.id;
                folder.level = folderLevel;
                this.folders.push(folder);

                // find eds
                let edJSONData = folderJSONData[i]._eds;
                if(edJSONData !== 'undefined' && edJSONData.length > 0) {
                    let edLevel = folderLevel + 1;

                    for(let j in edJSONData) {
                        let ed = new ED();
                        ed.id = edJSONData[j].id;
                        ed.name = edJSONData[j].name;
                        ed.parentId = folder.id;
                        ed.level = edLevel;
                        this.eds.push(ed);
                    }
                }

                let childFolderJSONData = folderJSONData[i]._folders;
                if(childFolderJSONData !== 'undefined' && childFolderJSONData.length > 0) {
                    recursiveFolder(childFolderJSONData, folder);

                }
            }
        }
    }
}
