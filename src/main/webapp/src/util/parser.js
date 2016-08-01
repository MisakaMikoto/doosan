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
        activity.id = 'activity0';
        activity.name = 'activity0';
        activity.from = '';
        activity.to = 'folder0, folder1, folder2, folder3';
        activity.parentId = '';

        // first folder
        let folder0 = new Folder();
        folder0.id = 'folder0';
        folder0.name = 'folder0';
        folder0.from = 'activity0';
        folder0.to = 'folder01';
        folder0.parentId = 'activity0';

        // child folder
        let folder01 = new Folder();
        folder01.id = 'folder01';
        folder01.name = 'folder01';
        folder01.from = 'folder0';
        folder01.to = 'ed0';
        folder01.parentId = 'folder0';

        // child folder
        let folder02 = new Folder();
        folder02.id = 'folder02';
        folder02.name = 'folder02';
        folder02.from = 'folder0';
        folder02.to = ' ed1';
        folder02.parentId = 'folder0';

        // second folder
        let folder1 = new Folder();
        folder1.id = 'folder1'
        folder1.name = 'folder1';
        folder1.from = 'activity0';
        folder1.to = 'ed2';
        folder1.parentId = 'activity0';

        // first ed
        let ed0 = new ED();
        ed0.id = 'ed0';
        ed0.name = 'ed0';
        ed0.from = 'folder01';
        ed0.to = '';
        ed0.parentId = 'folder01';

        // second ed
        let ed1 = new ED();
        ed1.id = 'ed1';
        ed1.name = 'ed1';
        ed1.from = 'folder02';
        ed1.to = '';
        ed1.parentId = 'folder02';

        // third ed
        let ed2 = new ED();
        ed2.id = 'ed2';
        ed2.name = 'ed2';
        ed2.from = 'folder1';
        ed2.to = '';
        ed2.parentId = 'folder1';

        folder01.eds.push(ed0);
        folder02.eds.push(ed1);
        folder1.eds.push(ed2);

        folder0.folders.push(folder01);
        folder0.folders.push(folder02);

        activity.folders.push(folder0);
        activity.folders.push(folder1);

        data.activity = activity;

        return data;
    }
}