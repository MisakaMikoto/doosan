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
        <script type="text/javascript" src="/src/layout/layer.js"></script>
        <script type="text/javascript" src="/src/layout/layout.js"></script>

        <!-- object -->
        <script type="text/javascript" src="/src/element/prototype/node.js"></script>
        <script type="text/javascript" src="/src/element/activity.js"></script>
        <script type="text/javascript" src="/src/element/folder.js"></script>
        <script type="text/javascript" src="/src/element/ed.js"></script>

        <!-- renderer -->
        <script type="text/javascript" src="/src/renderer/prototype/renderer.js"></script>
        <script type="text/javascript" src="/src/renderer/shapeRenderer.js"></script>
        <script type="text/javascript" src="/src/renderer/edgeRenderer.js"></script>

        <!-- shape -->
        <script type="text/javascript" src="/src/shape/activityShape.js"></script>
        <script type="text/javascript" src="/src/shape/edShape.js"></script>
        <script type="text/javascript" src="/src/shape/folderShape.js"></script>

        <!-- parser -->
        <script type="text/javascript" src="/src/util/parser.js"></script>

        <script type="text/javascript">
            $(document).ready(function() {
                // create test data
                let parser = new Parser();
                let testData = parser.createTestData();

//                console.log(testData);

                // create commonLayout
                let layout = new Layout();
                layout.createCanvas('canvas');
                layout.createLayer(testData);
                layout.drawLayerShape();
//                layout.drawLayerEdge();
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