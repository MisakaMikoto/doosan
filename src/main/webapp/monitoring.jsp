<%--
  Created by IntelliJ IDEA.
  User: MisakaMikoto
  Date: 2016. 8. 14.
  Time: 오후 3:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title> DooSan OpenGraph - Monitoring </title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">

  <!-- included jquery, jquery-ui, jquery.contextmenu, opengraph -->
  <script type="text/javascript" src="/lib/jquery-1.11.1/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.js"></script>
  <link rel="stylesheet" type="text/css" href="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.css"/>

  <script type="text/javascript" src="/lib/jquery-contextMenu/jquery.contextMenu.js"></script>
  <link rel="stylesheet" type="text/css" href="/lib/jquery-contextMenu/jquery.contextMenu.css"/>

  <!-- opengraph -->
  <script type="text/javascript" src="/lib/opengraph/OpenGraph-0.1.1-SNAPSHOT.js"></script>

  <!-- layout -->
  <script type="text/javascript" src="/src/layout/prototype/layout.js"></script>
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
  <script type="text/javascript" src="/src/shape/laneShape.js"></script>
  <script type="text/javascript" src="/src/shape/folderManager.js"></script>

  <!-- shape event -->
  <script type="text/javascript" src="/src/shape/event/prototype/shapeEvent.js"></script>
  <script type="text/javascript" src="/src/shape/event/activityEvent.js"></script>
  <script type="text/javascript" src="/src/shape/event/folderEvent.js"></script>
  <script type="text/javascript" src="/src/shape/event/edEvent.js"></script>
  <script type="text/javascript" src="/src/shape/event/edgeEvent.js"></script>

  <script type="text/javascript" src="/src/shape/event/folderManagerEvent.js"></script>

  <!-- parser -->
  <script type="text/javascript" src="/src/util/parser.js"></script>

  <!-- bootstrap -->
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

  <style type="text/css">
    .table tr th {
      width: 30%
    }
  </style>

  <script type="text/javascript">
    $(document).ready(function() {
      // create test data
      let monitoringData = Parser.createMonitoringTestData();

      // create commonLayout
      let monitoringLayout = new MonitoringLayout();
      monitoringLayout.type = monitoringLayout;
      monitoringLayout.createCanvas('canvas');
      monitoringLayout.data = monitoringData;
      monitoringLayout.drawMyWorkFlow();
    });
  </script>
</head>
<body>
<div align="center" id="container" style="width: 100%; height: 100%;">
  <div id="top" align="center"; style="width: 100%; height: 52%;">
    <div id="myWorkFlow" style="float: left; width: 100%">
      <table class="table">
        <tbody>
        <tr>
          <td>
            My WorkFlow
          </td>
        </tr>
        <tr class="success">
          <td>PROJECT CODE</td>
          <td>PROCESS ID</td>
          <td>STATE COLOR</td>
        </tr>

        <tr>
          <td>Y05A4U</td>
          <td>Y054AU-P-CO-0003-00</td>
          <td>BLUE</td>
        </tr>

        <tr class="success">
          <td>PROJECT NAME</td>
          <td>PROCESS NAME</td>
          <td>SUB PROCESS NAME</td>
        </tr>

        <tr>
          <td>주조 Handling Jig 제작</td>
          <td>EPC) Line List</td>
          <td>EPC) Line List</td>
        </tr>

        <tr>
          <td colspan="3" style="padding-left: 20px;">
            <div class="btn-group" style="float: left">
              <button type="button" class="btn btn-default"> - </button>
              <button type="button" class="btn btn-default"> Zoom </button>
              <button type="button" class="btn btn-default"> + </button>
              <button type="button" class="btn btn-default" style="margin-left: 20px;"> Refresh </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style="height: 48%;">
    <div id="canvas" style="overflow:auto; width: 100%; height: 600px;"></div>
    <span id="draggable" style="width: 50px; height: 50px;"></span>
  </div>
</div>

</body>
</html>
