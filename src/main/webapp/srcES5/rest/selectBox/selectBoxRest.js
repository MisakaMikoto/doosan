'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var SelectBoxRest = function (_Rest) {
	_inherits(SelectBoxRest, _Rest);

	function SelectBoxRest() {
		_classCallCheck(this, SelectBoxRest);

		var _this = _possibleConstructorReturn(this, (SelectBoxRest.__proto__ || Object.getPrototypeOf(SelectBoxRest)).call(this));

		_this._wfId = parent.top.aras != null && typeof parent.top.aras != 'undefined' ? parent.top.thisItem.getID() : '';
		_this._stdYN = parent.top.aras != null && typeof parent.top.aras != 'undefined' ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
		_this._projectId = "49BEBF8A1CDA4B96BF0A0C31EBB4B449";
		_this._canvas = '';
		return _this;
	}

	_createClass(SelectBoxRest, [{
		key: 'bindEvent',
		value: function bindEvent() {
			var _this2 = this;

			$('#discipline').change(function () {
				_this2.reload();
			});

			$('#disciplineSpec').change(function () {
				_this2.reload();
			});

			$('#bg').change(function () {
				_this2.reload();
			});

			$('#targetOtherWorkflow').change(function () {
				var wfId = $('#targetOtherWorkflow').val();
				// init
				_this2.emptyOtherWorkFlow();

				// create load aras data
				var select = new Select();
				var outResult = select.reload('DHI_WF_EDITOR_STRUCTURE', wfId, _this2.stdYN);

				// load editor
				var editorLayout = new EditorLayout();
				editorLayout.type = editorLayout;
				editorLayout.canvas = _this2.canvas;

				// create test data
				var parser = new Parser();
				var otherWorkFlowData = parser.createOtherWorkFlowData(outResult.nodeList);

				editorLayout.otherWorkFlowData = otherWorkFlowData;
				editorLayout.drawOtherWorkFlow();
				//editorLayout.sendLaneToBack();

				$('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
					$(element).attr('_selected', 'true');
				});
				_this2.canvas._HANDLER.sendToBack();
			});
		}
	}, {
		key: 'load',
		value: function load() {
			var pDatainitCB = "{kind: 'Init', discLine: '', discSpec: '', bg: '', wf_id: '" + this.wfId + "', stdYN: '" + this.stdYN + "', project_id: '" + this.projectId + "', REL_WF_ID: ''}";

			this.type = 'POST';
			this.url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
			this.data = pDatainitCB;
			this.callback = this.renderSelectBox;
			this.call();
		}
	}, {
		key: 'reload',
		value: function reload() {
			var pDatainitCB = "{kind: '', discLine: '" + $("#discipline").val() + "', discSpec: '" + $("#disciplineSpec").val() + "', bg: '" + $("#bg").val() + "', wf_id: '" + this.wfId + "', stdYN: '" + this.stdYN + "', project_id: '" + this.projectId + "', REL_WF_ID: ''}";

			this.type = 'POST';
			this.url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
			this.data = pDatainitCB;
			this.callback = this.renderOtherWorkFlowBox;
			this.call();
		}
	}, {
		key: 'renderSelectBox',
		value: function renderSelectBox(response) {
			var json = jQuery.parseJSON(response.d);

			if (json.rtn) {
				var discipline = jQuery.parseJSON(json.data);
				var disciplineSpec = jQuery.parseJSON(json.data1);
				var bg = jQuery.parseJSON(json.data2);

				for (var i in discipline.data) {
					this.appendSelectBoxElement($('#discipline'), discipline.data[i].LABEL, discipline.data[i].VALUE);
				}

				for (var _i in disciplineSpec.data) {
					this.appendSelectBoxElement($('#disciplineSpec'), disciplineSpec.data[_i].LABEL, disciplineSpec.data[_i].VALUE);
				}

				for (var _i2 in bg.data) {
					this.appendSelectBoxElement($('#bg'), bg.data[_i2].LABEL, bg.data[_i2].VALUE);
				}
			}
		}
	}, {
		key: 'renderOtherWorkFlowBox',
		value: function renderOtherWorkFlowBox(response) {
			var json = jQuery.parseJSON(response.d);
			if (json.rtn) {
				var otherWorkFlows = jQuery.parseJSON(json.data);

				for (var i in otherWorkFlows.data) {
					this.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[i].LABEL, otherWorkFlows.data[i].VALUE);
				}
			}
		}
	}, {
		key: 'emptyOtherWorkFlow',
		value: function emptyOtherWorkFlow() {
			$('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function (index, element) {
				var laneChildren = element.shape.children;
				for (var i in laneChildren) {
					$('#' + i).remove();
				}
				$(element).remove();
			});
		}
	}, {
		key: 'appendSelectBoxElement',
		value: function appendSelectBoxElement(element, label, value) {
			element.append($('<option>', {
				value: value,
				text: label
			}));
		}
	}, {
		key: 'wfId',
		set: function set(wfId) {
			this._wfId = wfId;
		},
		get: function get() {
			return this._wfId;
		}
	}, {
		key: 'stdYN',
		set: function set(stdYN) {
			this._stdYN = stdYN;
		},
		get: function get() {
			return this._stdYN;
		}
	}, {
		key: 'projectId',
		set: function set(projectId) {
			this._projectId = projectId;
		},
		get: function get() {
			return this._projectId;
		}
	}, {
		key: 'canvas',
		set: function set(canvas) {
			this._canvas = canvas;
		},
		get: function get() {
			return this._canvas;
		}
	}]);

	return SelectBoxRest;
}(Rest);