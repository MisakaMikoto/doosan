/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
class SelectBoxRest extends Rest {
	constructor() {
		super();
		
		this._wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
		this._stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
		this._projectId = "49BEBF8A1CDA4B96BF0A0C31EBB4B449";
		this._canvas = '';
	}
	
	set wfId(wfId) {
		this._wfId = wfId;
	}
	
	get wfId() {
		return this._wfId;
	}
	
	set stdYN(stdYN) {
		this._stdYN = stdYN;
	}
	
	get stdYN() {
		return this._stdYN;
	}
	
	set projectId(projectId) {
		this._projectId = projectId;
	}
	
	get projectId() {
		return this._projectId;
	}
	
	set canvas(canvas) {
		this._canvas = canvas;
	}
	
	get canvas() {
		return this._canvas;
	}
	
	bindEvent() {
		$('#discipline').change(() => {
			this.reload();
	    });
		
		$('#disciplineSpec').change(() => {
			this.reload();
	    });
		
		$('#bg').change(() => {
			this.reload();
	    });
		
		$('#targetOtherWorkflow').change(() => {
			let wfId = $('#targetOtherWorkflow').val();
			// init
			this.emptyOtherWorkFlow();
			
			// create load aras data
        	let select = new Select();
        	let outResult = select.reload('DHI_WF_EDITOR_STRUCTURE', wfId, this.stdYN);
        	
        	// load editor
            let editorLayout = new EditorLayout();
            editorLayout.type = editorLayout;
            editorLayout.canvas = this.canvas;
            
			// create test data
            let parser = new Parser();
            let otherWorkFlowData = parser.createOtherWorkFlowData(outResult.nodeList);
            
            editorLayout.otherWorkFlowData = otherWorkFlowData;
            editorLayout.drawOtherWorkFlow();
            //editorLayout.sendLaneToBack();
            
            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element) => {
                $(element).attr('_selected', 'true');
            });
            this.canvas._HANDLER.sendToBack();
		});
	}
	
	load() {
		let pDatainitCB = "{kind: 'Init', discLine: '', discSpec: '', bg: '', wf_id: '" + this.wfId + "', stdYN: '" + this.stdYN + "', project_id: '" + this.projectId + "', REL_WF_ID: ''}";
		
		this.type = 'POST';
		this.url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
		this.data = pDatainitCB;
		this.callback = this.renderSelectBox;
		this.call();
	}
	
	reload() {
		let pDatainitCB = "{kind: '', discLine: '" + $("#discipline").val() + "', discSpec: '" + $("#disciplineSpec").val() + "', bg: '" + $("#bg").val()
								+ "', wf_id: '" + this.wfId + "', stdYN: '" + this.stdYN + "', project_id: '" + this.projectId + "', REL_WF_ID: ''}";
		
		this.type = 'POST';
		this.url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
		this.data = pDatainitCB;
		this.callback = this.renderOtherWorkFlowBox;
		this.call();
	}
	
	renderSelectBox(response) {
		let json = jQuery.parseJSON(response.d);
		
		if(json.rtn) {
			let discipline = jQuery.parseJSON(json.data);
			let disciplineSpec = jQuery.parseJSON(json.data1);
			let bg = jQuery.parseJSON(json.data2);
	
			for(let i in discipline.data) {
				this.appendSelectBoxElement($('#discipline'), discipline.data[i].LABEL, discipline.data[i].VALUE);
			}
			
			for(let i in disciplineSpec.data) {
				this.appendSelectBoxElement($('#disciplineSpec'), disciplineSpec.data[i].LABEL, disciplineSpec.data[i].VALUE);
			}
			
			for(let i in bg.data) {
				this.appendSelectBoxElement($('#bg'), bg.data[i].LABEL, bg.data[i].VALUE);
			}
		}
	}
	
	renderOtherWorkFlowBox(response) {
		let json = jQuery.parseJSON(response.d);
		if(json.rtn) {
			let otherWorkFlows = jQuery.parseJSON(json.data);
			
			for(let i in otherWorkFlows.data) {
				this.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[i].LABEL, otherWorkFlows.data[i].VALUE);
			}
		}
	}
	
	emptyOtherWorkFlow() {
		$('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each((index, element)=> {
			let laneChildren = element.shape.children;
			for(let i in laneChildren) {
				$('#' + i).remove();
			}
			$(element).remove();
		});
	}
	
	appendSelectBoxElement(element, label, value) {
		element.append($('<option>', {
		    value: value,
		    text: label
		}));
	}
}