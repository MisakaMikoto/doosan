<html>
    <head>
        <title>DooSan OpenGraph</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">

        <!-- included jquery, jquery-ui, jquery.contextmenu, opengraph -->
        <script type="text/javascript" src="/lib/jquery-1.11.1/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.css"></script>
        <script type="text/javascript" src="/lib/contextmenu/jquery.contextMenu-min.js"></script>
        <script type="text/javascript" src="/lib/contextmenu/jquery.contextMenu.css"></script>

        <!-- opengraph -->
        <script type="text/javascript" src="/lib/opengraph/OpenGraph-0.1.1-SNAPSHOT.js"></script>

        <!-- layout -->
        <script type="text/javascript" src="/src/layout/prototype/layout.js"></script>
        <script type="text/javascript" src="/src/layout/editor/editorLayout.js"></script>
        <script type="text/javascript" src="/src/layout/monitoring/monitoringLayout.js"></script>

        <!-- renderer -->
        <script type="text/javascript" src="/src/renderer/prototype/renderer.js"></script>
        <script type="text/javascript" src="/src/renderer/shapeRenderer.js"></script>
        <script type="text/javascript" src="/src/renderer/edgeRenderer.js"></script>

        <!-- shape -->
        <script type="text/javascript" src="/src/shape/prototype/imageShape.js"></script>
        <script type="text/javascript" src="/src/shape/activityShape.js"></script>
        <script type="text/javascript" src="/src/shape/edShape.js"></script>
        <script type="text/javascript" src="/src/shape/folderShape.js"></script>
        <script type="text/javascript" src="/src/shape/folderManager.js"></script>

        <!-- shape event -->
        <script type="text/javascript" src="/src/shape/event/folderManagerEvent.js"></script>

        <!-- parser -->
        <script type="text/javascript" src="/src/util/parser.js"></script>

        <script type="text/javascript">
            $(document).ready(function() {
                // create test data
                let monitoringData = Parser.createMonitoringTestData();
                let editorData = Parser.createEditorTestData();

//                 create commonLayout
                let monitoringLayout = new MonitoringLayout();
                monitoringLayout.type = monitoringLayout;
                monitoringLayout.createCanvas('canvas');
                monitoringLayout.data = monitoringData;
                monitoringLayout.drawMonitoring();

//                let editorLayout = new EditorLayout();
//                editorLayout.type = editorLayout;
//                editorLayout.createCanvas('canvas');
//                editorLayout.data = editorData;
//                editorLayout.drawEditor();

                // collapse unbind
//                let folderManagerEvent = new FolderManagerEvent(editorLayout.canvas);
                let folderManagerEvent = new FolderManagerEvent(monitoringLayout.canvas);
                folderManagerEvent.unbind();
                folderManagerEvent.bind();
            });
        </script>
    </head>
    <body>
        <div align="center">
            <div id="canvas" style="overflow:auto; width: 950px; height: 600px;">
            </div>
        </div>
    </body>
</html>