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
  <title> DooSan OpenGraph - Editor </title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- included jquery, jquery-ui, jquery.contextmenu, opengraph -->
  <script type="text/javascript" src="/lib/jquery-1.11.1/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.js"></script>
  <link rel="stylesheet" type="text/css" href="/lib/jquery-ui-1.11.0.custom/jquery-ui.min.css"/>

  <script type="text/javascript" src="/lib/jquery-contextMenu/jquery.contextMenu.js"></script>
  <link rel="stylesheet" type="text/css" href="/lib/jquery-contextMenu/jquery.contextMenu.css"/>

  <!-- opengraph -->
  <script type="text/javascript" src="/lib/opengraph/OpenGraph-0.1.1-SNAPSHOT.js"></script>

  <!-- layout -->
  <script type="text/javascript" src="/srcES5/layout/prototype/layout.js"></script>
  <script type="text/javascript" src="/srcES5/layout/editor/editorLayout.js"></script>
  <script type="text/javascript" src="/srcES5/layout/monitoring/monitoringLayout.js"></script>

  <!-- renderer -->
  <script type="text/javascript" src="/srcES5/renderer/prototype/renderer.js"></script>
  <script type="text/javascript" src="/srcES5/renderer/shapeRenderer.js"></script>
  <script type="text/javascript" src="/srcES5/renderer/edgeRenderer.js"></script>

  <!-- shape -->
  <script type="text/javascript" src="/srcES5/shape/prototype/imageShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/activityShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/edShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/folderShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/laneShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/edgeShape.js"></script>
  <script type="text/javascript" src="/srcES5/shape/folderManager.js"></script>

  <!-- shape event -->
  <script type="text/javascript" src="/srcES5/shape/event/prototype/shapeEvent.js"></script>
  <script type="text/javascript" src="/srcES5/shape/event/activityEvent.js"></script>
  <script type="text/javascript" src="/srcES5/shape/event/folderEvent.js"></script>
  <script type="text/javascript" src="/srcES5/shape/event/edEvent.js"></script>
  <script type="text/javascript" src="/srcES5/shape/event/edgeEvent.js"></script>

  <script type="text/javascript" src="/srcES5/shape/event/folderManagerEvent.js"></script>

  <!-- parser -->
  <script type="text/javascript" src="/srcES5/util/parser.js"></script>

  <!-- bootstrap -->
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

  <style type="text/css">
  </style>

  <script type="text/javascript">
    $(document).ready(function() {
      // create test data
      let otherWorkFlowData = Parser.createOtherWorkFlowData();
      let myWorkFlowData = Parser.createMyWorkFlowData(otherWorkFlowData);

      let editorLayout = new EditorLayout();
      editorLayout.type = editorLayout;
      editorLayout.createCanvas('canvas');
      editorLayout.otherWorkFlowData = otherWorkFlowData;
      editorLayout.myWorkFlowData = myWorkFlowData;
      editorLayout.drawOtherWorkFlow();
      editorLayout.drawMyWorkFlow();
    });
  </script>
</head>
<body>
<div align="center" id="container" style="width: 100%; height: 100%;">
  <div id="top" align="center"; style="width: 100%; height: 52%;">
    <div id="otherWorkFlow" style="float: left; width: 50%">
      <table class="table">
        <tbody>
        <tr>
          <td> Discipline
            <select class="form-control input-sm">
              <option> -- select -- </option>
              <option> Civil </option>
              <option> Electrical </option>
              <option> I&C </option>
            </select>
          </td>

          <td> Discipline Spec
            <select class="form-control input-sm">
              <option> -- select -- </option>
              <option> Boiler Area </option>
              <option> BOP Area </option>
              <option> Equipment </option>
            </select>
          </td>

          <td> BG
            <select class="form-control input-sm">
              <option> -- select -- </option>
              <option> EPC BG </option>
              <option> 터빈/발전기 BG </option>
              <option> 보일러 BG </option>
              <option> Water BG </option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="border-top: 0px;"> Other Workflow
            <select class="form-control input-sm">
              <option> Y05A4U-S-SY-0012-00 Compressed air system [Process] [System] [EPC BG] </option>
            </select>
          </td>
        </tr>

        <tr class="info">
          <td>PROJECT CODE</td>
          <td>PROCESS ID</td>
          <td>STATE COLOR</td>
        </tr>

        <tr>
          <td>Y05A4U</td>
          <td>Y054AU-S-SY-0012-00</td>
          <td>BLUE</td>
        </tr>

        <tr class="info">
          <td>PROJECT NAME</td>
          <td>PROCESS NAME</td>
          <td>SUB PROCESS NAME</td>
        </tr>

        <tr>
          <td>주조 Handling Jig 제작</td>
          <td>Compressed air system</td>
          <td>Compressed air system</td>
        </tr>

        <tr>
          <td colspan="3" style="padding-left: 20px;">
            <div class="btn-group">
              <button type="button" class="btn btn-default"> - </button>
              <button type="button" class="btn btn-default"> Zoom </button>
              <button type="button" class="btn btn-default"> + </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div id="myWorkFlow" style="float: left; width: 50%">
      <table class="table">
        <tbody>
        <tr rowspan="2" style="height: 136.5px">
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
          <td colspan="3" style="padding-right: 20px;">
            <div class="btn-group" style="float: right">
              <button type="button" class="btn btn-default"> Activity </button>
              <button type="button" class="btn btn-default"> Folder </button>
              <button type="button" class="btn btn-default"> ED </button>
              <button type="button" class="btn btn-default"> Refresh </button>
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