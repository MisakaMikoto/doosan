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

    static createMonitoringTestData() {
        let data = new Object();
        data.activityShapes = [];

        let activity0 = new ActivityShape();
        activity0.id = 'activity0';
        activity0.name = 'activity0';
        activity0.parentId = '';

        // first folders
        let folder0 = new FolderShape();
        folder0.id = 'folder0';
        folder0.name = 'folder0';
        folder0.parentId = 'activity0';
        folder0.direction = 'left';

        // child folder
        let folder01 = new FolderShape();
        folder01.id = 'folder01';
        folder01.name = 'folder01';
        folder01.parentId = 'folder0';
        folder01.direction = 'left';

        // child folder
        let folder02 = new FolderShape();
        folder02.id = 'folder02';
        folder02.name = 'folder02';
        folder02.parentId = 'folder0';
        folder02.direction = 'left';

        // second folder
        let folder1 = new FolderShape();
        folder1.id = 'folder1';
        folder1.name = 'folder1';
        folder1.parentId = 'activity0';
        folder1.direction = 'left';

        // first ed
        let ed0 = new EDShape();
        ed0.id = 'ed0';
        ed0.name = 'ed0';
        ed0.parentId = 'folder01';
        ed0.direction = 'left';

        // second ed
        let ed1 = new EDShape();
        ed1.id = 'ed1';
        ed1.name = 'ed1';
        ed1.parentId = 'folder02';
        ed1.direction = 'left';

        // third ed
        let ed2 = new EDShape();
        ed2.id = 'ed2';
        ed2.name = 'ed2';
        ed2.parentId = 'folder1';
        ed2.direction = 'left';

        // forth ed
        let ed3 = new EDShape();
        ed3.id = 'ed3';
        ed3.name = 'ed3';
        ed3.parentId = 'folder01';
        ed3.direction = 'left';

        folder01.edShapes.push(ed0);
        folder01.edShapes.push(ed3);
        folder02.edShapes.push(ed1);
        folder1.edShapes.push(ed2);

        folder0.folderShapes.push(folder01);
        folder0.folderShapes.push(folder02);

        activity0.leftFolderShapes.push(folder0);
        activity0.leftFolderShapes.push(folder1);

        // first folders
        let folderA = new FolderShape();
        folderA.id = 'folderA';
        folderA.name = 'folderA';
        folderA.parentId = 'activity0';
        folderA.direction = 'right';

        // child folder
        let folderAA = new FolderShape();
        folderAA.id = 'folderAA';
        folderAA.name = 'folderAA';
        folderAA.parentId = 'folderA';
        folderAA.direction = 'right';

        // child folder
        let folderAB = new FolderShape();
        folderAB.id = 'folderAB';
        folderAB.name = 'folderAB';
        folderAB.parentId = 'folderA';
        folderAB.direction = 'right';

        // second folder
        let folderB = new FolderShape();
        folderB.id = 'folderB';
        folderB.name = 'folderB';
        folderB.parentId = 'activity0';
        folderB.direction = 'right';

        // first ed
        let edA = new EDShape();
        edA.id = 'edA';
        edA.name = 'edA';
        edA.parentId = 'folderAA';
        edA.direction = 'right';

        // second ed
        let edB = new EDShape();
        edB.id = 'edB';
        edB.name = 'edB';
        edB.parentId = 'folderAB';
        edB.direction = 'right';

        // third ed
        let edC = new EDShape();
        edC.id = 'edC';
        edC.name = 'edC';
        edC.parentId = 'folderB';
        edC.direction = 'right';

        // forth ed
        let edD = new EDShape();
        edD.id = 'edD';
        edD.name = 'edD';
        edD.parentId = 'folderAA';
        edD.direction = 'right';

        folderAA.edShapes.push(edA);
        folderAA.edShapes.push(edD);
        folderAB.edShapes.push(edB);
        folderB.edShapes.push(edC);

        folderA.folderShapes.push(folderAA);
        folderA.folderShapes.push(folderAB);

        activity0.rightFolderShapes.push(folderA);
        activity0.rightFolderShapes.push(folderB);

        data.activityShapes.push(activity0);

        return data;
    }

    static createEditorTestData() {
        let data = new Object();
        data.activityShapes = [];

        let activity0 = new ActivityShape();
        activity0.id = 'activity0';
        activity0.name = 'activity0';
        activity0.parentId = '';
        activity0.direction = 'left';

        // first folders
        let folder0 = new FolderShape();
        folder0.id = 'folder0';
        folder0.name = 'folder0';
        folder0.parentId = 'activity0';
        folder0.direction = 'left';

        // child folder
        let folder01 = new FolderShape();
        folder01.id = 'folder01';
        folder01.name = 'folder01';
        folder01.parentId = 'folder0';
        folder01.direction = 'left';

        // child folder
        let folder02 = new FolderShape();
        folder02.id = 'folder02';
        folder02.name = 'folder02';
        folder02.parentId = 'folder0';
        folder02.direction = 'left';

        // second folder
        let folder1 = new FolderShape();
        folder1.id = 'folder1';
        folder1.name = 'folder1';
        folder1.parentId = 'activity0';
        folder1.direction = 'left';

        // first ed
        let ed0 = new EDShape();
        ed0.id = 'ed0';
        ed0.name = 'ed0';
        ed0.parentId = 'folder01';
        ed0.direction = 'left';

        // second ed
        let ed1 = new EDShape();
        ed1.id = 'ed1';
        ed1.name = 'ed1';
        ed1.parentId = 'folder02';
        ed1.direction = 'left';

        // third ed
        let ed2 = new EDShape();
        ed2.id = 'ed2';
        ed2.name = 'ed2';
        ed2.parentId = 'folder1';
        ed2.direction = 'left';

        // forth ed
        let ed3 = new EDShape();
        ed3.id = 'ed3';
        ed3.name = 'ed3';
        ed3.parentId = 'folder01';
        ed3.direction = 'left';

        folder01.edShapes.push(ed0);
        folder01.edShapes.push(ed3);
        folder02.edShapes.push(ed1);
        folder1.edShapes.push(ed2);

        folder0.folderShapes.push(folder01);
        folder0.folderShapes.push(folder02);

        activity0.leftFolderShapes.push(folder0);
        activity0.leftFolderShapes.push(folder1);

        data.activityShapes.push(activity0);

        let activity1 = new ActivityShape();
        activity1.id = 'activity1';
        activity1.name = 'activity1';
        activity1.parentId = '';
        activity1.direction = 'right';

        // first folders
        let folderA = new FolderShape();
        folderA.id = 'folderA';
        folderA.name = 'folderA';
        folderA.parentId = 'activity1';
        folderA.direction = 'right';

        // child folder
        let folderAA = new FolderShape();
        folderAA.id = 'folderAA';
        folderAA.name = 'folderAA';
        folderAA.parentId = 'folderA';
        folderAA.direction = 'right';

        // child folder
        let folderAB = new FolderShape();
        folderAB.id = 'folderAB';
        folderAB.name = 'folderAB';
        folderAB.parentId = 'folderA';
        folderAB.direction = 'right';

        // second folder
        let folderB = new FolderShape();
        folderB.id = 'folderB';
        folderB.name = 'folderB';
        folderB.parentId = 'activity1';
        folderB.direction = 'right';

        // first ed
        let edA = new EDShape();
        edA.id = 'edA';
        edA.name = 'edA';
        edA.parentId = 'folderAA';
        edA.direction = 'right';

        // second ed
        let edB = new EDShape();
        edB.id = 'edB';
        edB.name = 'edB';
        edB.parentId = 'folderAB';
        edB.direction = 'right';

        // third ed
        let edC = new EDShape();
        edC.id = 'edC';
        edC.name = 'edC';
        edC.parentId = 'folderB';
        edC.direction = 'right';

        // forth ed
        let edD = new EDShape();
        edD.id = 'edD';
        edD.name = 'edD';
        edD.parentId = 'folderAA';
        edD.direction = 'right';

        folderAA.edShapes.push(edA);
        folderAA.edShapes.push(edD);
        folderAB.edShapes.push(edB);
        folderB.edShapes.push(edC);

        folderA.folderShapes.push(folderAA);
        folderA.folderShapes.push(folderAB);

        activity1.rightFolderShapes.push(folderA);
        activity1.rightFolderShapes.push(folderB);

        data.activityShapes.push(activity1);

        return data;
    }
}