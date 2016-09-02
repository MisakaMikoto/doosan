'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
var Parser = function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: 'strToJson',
        value: function strToJson(strObject) {
            return JSON.parse(objectStr);
        }
    }, {
        key: 'jsonToStr',
        value: function jsonToStr(jsonObject) {
            return JSON.stringify(jsonObject);
        }
    }], [{
        key: 'createOtherWorkFlowData',
        value: function createOtherWorkFlowData() {
            var data = new Object();
            data.activityShapes = [];
            data.laneShapes = [];
            data.workFlowType = 'otherWorkFlow';

            var activity1 = new ActivityShape("Air Flow ra...");
            activity1.id = 'Activity1';
            activity1.name = 'Air Flow rate, Air system concept';
            activity1.parentId = '';

            // first folders
            var f1 = new FolderShape("F1");
            f1.id = 'F1';
            f1.name = 'F1';
            f1.parentId = 'Activity1';
            f1.direction = 'right';

            // child folder
            var f1_1 = new FolderShape("F1-1");
            f1_1.id = 'F1-1';
            f1_1.name = 'F1-1';
            f1_1.parentId = 'F1';
            f1_1.direction = 'right';

            // child folder
            var f1_2 = new FolderShape("F1-2");
            f1_2.id = 'F1-2';
            f1_2.name = 'F1-2';
            f1_2.parentId = 'F1';
            f1_2.direction = 'right';

            // second folder
            var f2 = new FolderShape("F2");
            f2.id = 'F2';
            f2.name = 'F2';
            f2.parentId = 'Activity1';
            f2.direction = 'right';

            // first ed
            var ed1 = new EDShape("System Descr...");
            ed1.id = 'ED1';
            ed1.name = 'System Description - Compressed Air System';
            ed1.parentId = 'F1-1';
            ed1.direction = 'right';

            // second ed
            var ed2 = new EDShape("PS&I Diagram...");
            ed2.id = 'ED2';
            ed2.name = 'PS&I Diagram - Instrument Air System(2/2)';
            ed2.parentId = 'F1-2';
            ed2.direction = 'right';

            // third ed
            var ed3 = new EDShape("PS&I Diagram...");
            ed3.id = 'ED3';
            ed3.name = 'PS&I Diagram - Instrument Air System(1/2)';
            ed3.parentId = 'F2';
            ed3.direction = 'right';

            // forth ed
            var ed4 = new EDShape("PS&I Diagram...");
            ed4.id = 'ED4';
            ed4.name = 'PS&I Diagram - Instrument Air System';
            ed4.parentId = 'F1-1';
            ed4.direction = 'right';

            var lane1 = new LaneShape('otherWorkFlowLane');
            lane1.id = 'otherWorkFlowLane';
            lane1.name = 'otherWorkFlowLane';
            lane1.children = ['Activity1'];
            lane1.laneType = 'center';

            var lane2 = new LaneShape('otherWorkFlowLane');
            lane2.id = 'otherWorkFlowLane';
            lane2.name = 'otherWorkFlowLane';
            lane2.children = ['F1', 'F1-1', 'F1-2', 'F2', 'ED1', 'ED2', 'ED3', 'ED4'];
            lane2.laneType = 'right';

            f1_1.edShapes.push(ed1);
            f1_2.edShapes.push(ed2);
            f2.edShapes.push(ed3);
            f1_1.edShapes.push(ed4);

            f1.folderShapes.push(f1_1);
            f1.folderShapes.push(f1_2);

            activity1.rightFolderShapes.push(f1);
            activity1.rightFolderShapes.push(f2);
            data.activityShapes.push(activity1);

            data.laneShapes.push(lane1);
            data.laneShapes.push(lane2);

            return data;
        }
    }, {
        key: 'createMyWorkFlowData',
        value: function createMyWorkFlowData() {
            var data = new Object();
            data.activityShapes = [];
            data.laneShapes = [];
            data.workFlowType = 'myWorkFlow';

            var activity2 = new ActivityShape("Line List");
            activity2.id = 'Activity2';
            activity2.name = 'Line List 작성';
            activity2.parentId = '';

            var activity3 = new ActivityShape("FA");
            activity3.id = 'Activity3';
            activity3.name = 'FA 제출';
            activity3.parentId = '';

            // first folders
            var f10 = new FolderShape("F10");
            f10.id = 'F10';
            f10.name = 'F10';
            f10.parentId = 'Activity2';
            f10.direction = 'right';

            // second folder
            var f20 = new FolderShape("F20");
            f20.id = 'F20';
            f20.name = 'F20';
            f20.parentId = 'Activity2';
            f20.direction = 'right';

            // child folder
            var f10_1 = new FolderShape("F10-1");
            f10_1.id = 'F10-1';
            f10_1.name = 'F10-1';
            f10_1.parentId = 'F10';
            f10_1.direction = 'right';

            // child folder
            var f10_2 = new FolderShape("F10-2");
            f10_2.id = 'F10-2';
            f10_2.name = 'F10-2';
            f10_2.parentId = 'F10';
            f10_2.direction = 'right';

            // first ed
            var ed10 = new EDShape("Process desi...");
            ed10.id = 'ED10';
            ed10.name = 'Process design data for Compressed air system';
            ed10.parentId = 'F10-1';
            ed10.direction = 'right';

            // second ed
            var ed20 = new EDShape("Terminal Poi...");
            ed20.id = 'ED2';
            ed20.name = 'Terminal Point List';
            ed20.parentId = 'F10-2';
            ed20.direction = 'right';

            // third ed
            var ed30 = new EDShape("PDF");
            ed30.id = 'ED30';
            ed30.name = 'PDF';
            ed30.parentId = 'F20';
            ed30.direction = 'right';

            // forth ed
            var ed40 = new EDShape("Line List");
            ed40.id = 'ED40';
            ed40.name = 'Line List';
            ed40.parentId = 'F10-1';
            ed40.direction = 'right';

            var lane1 = new LaneShape('myWorkFlowLane');
            lane1.id = 'myWorkFlowLane';
            lane1.name = 'myWorkFlowLane';
            lane1.children = ['Activity2', 'Activity3'];
            lane1.laneType = 'center';

            var lane2 = new LaneShape('myWorkFlowLane');
            lane2.id = 'myWorkFlowLane';
            lane2.name = 'myWorkFlowLane';
            lane2.children = ['F1', 'F1-1', 'F1-2', 'F2', 'ED1', 'ED2', 'ED3', 'ED4'];
            lane2.laneType = 'right';

            var lane3 = new LaneShape('myWorkFlowLane');
            lane3.id = 'myWorkFlowLane';
            lane3.name = 'myWorkFlowLane';
            lane3.laneType = 'left';

            f10_1.edShapes.push(ed10);
            f10_2.edShapes.push(ed20);
            f20.edShapes.push(ed30);
            f10_1.edShapes.push(ed40);

            f10.folderShapes.push(f10_1);
            f10.folderShapes.push(f10_2);

            activity2.rightFolderShapes.push(f10);
            activity2.rightFolderShapes.push(f20);

            data.activityShapes.push(activity2);
            data.activityShapes.push(activity3);
            // 반드시 순서대로 넣어야 한다. left, center, right
            data.laneShapes.push(lane3);
            data.laneShapes.push(lane1);
            data.laneShapes.push(lane2);

            return data;
        }
    }, {
        key: 'createMonitoringTestData',
        value: function createMonitoringTestData() {
            var data = new Object();
            data.activityShapes = [];
            data.laneShapes = [];
            data.workFlowType = 'myWorkFlow';

            var activity1 = new ActivityShape("Line List");
            activity1.id = 'Activity1';
            activity1.name = 'Line List 작성';
            activity1.parentId = '';

            var activity2 = new ActivityShape("FA");
            activity2.id = 'Activity2';
            activity2.name = 'FA 제출';
            activity2.parentId = '';

            // first folders
            var f10 = new FolderShape("F10");
            f10.id = 'F10';
            f10.name = 'F10';
            f10.parentId = 'Activity1';
            f10.direction = 'right';

            // second folder
            var f20 = new FolderShape("F20");
            f20.id = 'F20';
            f20.name = 'F20';
            f20.parentId = 'Activity1';
            f20.direction = 'right';

            // child folder
            var f10_1 = new FolderShape("F10-1");
            f10_1.id = 'F10-1';
            f10_1.name = 'F10-1';
            f10_1.parentId = 'F10';
            f10_1.direction = 'right';

            // child folder
            var f10_2 = new FolderShape("F10-2");
            f10_2.id = 'F10-2';
            f10_2.name = 'F10-2';
            f10_2.parentId = 'F10';
            f10_2.direction = 'right';

            // first ed
            var ed10 = new EDShape("Process desi...");
            ed10.id = 'ED10';
            ed10.name = 'Process design data for Compressed air system';
            ed10.parentId = 'F10-1';
            ed10.direction = 'right';

            // second ed
            var ed20 = new EDShape("Terminal Poi...");
            ed20.id = 'ED20';
            ed20.name = 'Terminal Point List';
            ed20.parentId = 'F10-2';
            ed20.direction = 'right';

            // third ed
            var ed30 = new EDShape("PDF");
            ed30.id = 'ED30';
            ed30.name = 'PDF';
            ed30.parentId = 'F20';
            ed30.direction = 'right';

            // forth ed
            var ed40 = new EDShape("Line List");
            ed40.id = 'ED40';
            ed40.name = 'Line List';
            ed40.parentId = 'F10-1';
            ed40.direction = 'right';

            var lane1 = new LaneShape('myWorkFlowLane');
            lane1.id = 'myWorkFlowLane';
            lane1.name = 'myWorkFlowLane';
            lane1.children = ['Activity1'];
            lane1.laneType = 'center';

            var lane2 = new LaneShape('myWorkFlowLane');
            lane2.id = 'myWorkFlowLane';
            lane2.name = 'myWorkFlowLane';
            lane2.children = ['F10', 'F10-1', 'F10-2', 'F20', 'ED10', 'ED20', 'ED30', 'ED40'];
            lane2.laneType = 'right';

            var lane3 = new LaneShape('myWorkFlowLane');
            lane3.id = 'myWorkFlowLane';
            lane3.name = 'myWorkFlowLane';
            lane3.children = ['F1', 'F1-1', 'F1-2', 'F2', 'ED1', 'ED2', 'ED3', 'ED4'];
            lane3.laneType = 'left';

            f10_1.edShapes.push(ed10);
            f10_2.edShapes.push(ed20);
            f20.edShapes.push(ed30);
            f10_1.edShapes.push(ed40);

            f10.folderShapes.push(f10_1);
            f10.folderShapes.push(f10_2);

            activity1.rightFolderShapes.push(f10);
            activity1.rightFolderShapes.push(f20);

            // first folders
            var f1 = new FolderShape("F1");
            f1.id = 'F1';
            f1.name = 'F1';
            f1.parentId = 'Activity1';
            f1.direction = 'left';

            // child folder
            var f1_1 = new FolderShape("F1-1");
            f1_1.id = 'F1-1';
            f1_1.name = 'F1-1';
            f1_1.parentId = 'F1';
            f1_1.direction = 'left';

            // child folder
            var f1_2 = new FolderShape("F1-2");
            f1_2.id = 'F1-2';
            f1_2.name = 'F1-2';
            f1_2.parentId = 'F1';
            f1_2.direction = 'left';

            // second folder
            var f2 = new FolderShape("F2");
            f2.id = 'F2';
            f2.name = 'F2';
            f2.parentId = 'Activity1';
            f2.direction = 'left';

            // first ed
            var ed1 = new EDShape("System Descr...");
            ed1.id = 'ED1';
            ed1.name = 'System Description - Compressed Air System';
            ed1.parentId = 'F1-1';
            ed1.direction = 'left';

            // second ed
            var ed2 = new EDShape("PS&I Diagram...");
            ed2.id = 'ED2';
            ed2.name = 'PS&I Diagram - Instrument Air System(2/2)';
            ed2.parentId = 'F1-2';
            ed2.direction = 'left';

            // third ed
            var ed3 = new EDShape("PS&I Diagram...");
            ed3.id = 'ED3';
            ed3.name = 'PS&I Diagram - Instrument Air System(1/2)';
            ed3.parentId = 'F2';
            ed3.direction = 'left';

            // forth ed
            var ed4 = new EDShape("PS&I Diagram...");
            ed4.id = 'ED4';
            ed4.name = 'PS&I Diagram - Instrument Air System';
            ed4.parentId = 'F1-1';
            ed4.direction = 'left';

            f1_1.edShapes.push(ed1);
            f1_2.edShapes.push(ed2);
            f2.edShapes.push(ed3);
            f1_1.edShapes.push(ed4);

            f1.folderShapes.push(f1_1);
            f1.folderShapes.push(f1_2);

            activity1.leftFolderShapes.push(f1);
            activity1.leftFolderShapes.push(f2);

            data.activityShapes.push(activity1);
            data.activityShapes.push(activity2);

            data.laneShapes.push(lane1);
            data.laneShapes.push(lane2);
            data.laneShapes.push(lane3);

            return data;
        }
    }]);

    return Parser;
}();