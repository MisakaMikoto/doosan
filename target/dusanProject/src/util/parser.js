/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
class Parser {
    constructor() {
    }

    strToJson(strObject) {
        return JSON.parse(objectStr);
    }

    jsonToStr(jsonObject) {
        return JSON.stringify(jsonObject);
    }

    createTestData() {
        let data = new Object();
        let activity = new Activity();
        activity.id = 0;
        activity.name = 0;

        for(let i = 0; i < 3; i++) {
            if(i == 1) {
                for(let j = 0; j < 2; j++) {
                    let folder = new Folder();
                    folder.id = j;
                    folder.name = j;

                    let ed = new ED();
                    ed.id = 1;
                    ed.name = 1;

                    folder.eds.push(ed);
                    activity.folders.push(folder);
                }

            } else if(i == 2) {
                let folder = new Folder();
                folder.id = 1;
                folder.name = 1;

                for(let j = 0; j < 2; j++) {
                    let ed = new ED();
                    ed.id = j;
                    ed.name = j;
                    folder.eds.push(ed);
                }
                activity.folders.push(folder);

            } else {
                let folder = new Folder();
                folder.id = 1;
                folder.name = 1;

                let ed = new ED();
                ed.id = 1;
                ed.name = 1;

                folder.eds.push(ed);
                activity.folders.push(folder);
            }
        }
        data.activity = activity;
        return data;
    }
}