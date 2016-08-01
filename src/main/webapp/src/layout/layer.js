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
        var beforeLastIndex = 0;

        let activity = new Activity();
        activity.id = activityJSONData.id;
        activity.name = activityJSONData.name;
        activity.level = activityLevel;
        activity.index = beforeLastIndex;

        // find folders
        let folderJSONData = activityJSONData.folders;
        if(folderJSONData !== 'undefined' && folderJSONData.length > 0) {
            let folderLevel = activityLevel + 1;

            for(let i in folderJSONData) {
                if(activity.id == folderJSONData[i].parentId) {
                    let folder = new Folder();
                    folder.id = folderJSONData[i].id;
                    folder.name = folderJSONData[i].name;
                    folder.parentId = activity.id;
                    folder.level = folderLevel;

                    // find child folder
                    let childFolderJSONData = folderJSONData[i].folders;
                    if(childFolderJSONData !== 'undefined' && childFolderJSONData.length > 0) {
                        beforeLastIndex = this.recursiveFolder(childFolderJSONData, folder);
                    }

                    if(i == 0) {
                        folder.index = activity.index;

                    } else {
                        folder.index = beforeLastIndex + Number(i);
                    }
                    this.folders.push(folder);

                    // find eds
                    let edJSONData = folderJSONData[i].eds;
                    if(edJSONData !== 'undefined' && edJSONData.length > 0) {
                        let edLevel = folderLevel + 1;

                        for(let j in edJSONData) {
                            if(folderJSONData[i].id == edJSONData[j].parentId) {
                                let ed = new ED();
                                ed.id = edJSONData[j].id;
                                ed.name = edJSONData[j].name;
                                ed.parentId = folder.id;
                                ed.level = edLevel;

                                if(j == 0) {
                                    ed.index = folder.index;

                                } else {
                                    ed.index = folder.index + Number(j);
                                }
                                this.eds.push(ed);
                            }
                        }
                    }
                }
            }
        }
        this.activity = activity;
        return this;
    }

    recursiveFolder(folderJSONData, rootFolder) {
        var beforeLastIndex = 0;
        // find folder
        if(folderJSONData !== 'undefined' && folderJSONData.length > 0) {
            let folderLevel = rootFolder.level + 1;

            for(let i in folderJSONData) {
                let folder = new Folder();
                folder.id = folderJSONData[i].id;
                folder.name = folderJSONData[i].name;
                folder.parentId = rootFolder.id;
                folder.level = folderLevel;
                folder.index = rootFolder.index + Number(i);
                this.folders.push(folder);

                // save last index
                beforeLastIndex = folder.index;

                // find eds
                let edJSONData = folderJSONData[i].eds;
                if(edJSONData !== 'undefined' && edJSONData.length > 0) {
                    let edLevel = folderLevel + 1;

                    for(let j in edJSONData) {
                        if(folderJSONData[i].id == edJSONData[j].parentId) {
                            let ed = new ED();
                            ed.id = edJSONData[j].id;
                            ed.name = edJSONData[j].name;
                            ed.parentId = folder.id;
                            ed.level = edLevel;

                            if (j == 0) {
                                ed.index = folder.index;

                            } else {
                                ed.index = folder.index + Number(j);
                            }
                            this.eds.push(ed);
                        }
                    }
                }

                let childFolderJSONData = folderJSONData[i].folders;
                if(childFolderJSONData !== 'undefined' && childFolderJSONData.length > 0) {
                    recursiveFolder(childFolderJSONData, folder);

                }
            }
        }
        return beforeLastIndex;
    }
}
