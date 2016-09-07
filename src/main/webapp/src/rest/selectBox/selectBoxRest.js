/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
class SelectBoxRest extends Rest {
	constructor() {
		super();
		
		this._wfId = (typeof opener != 'undefined') ? opener.parent.top.thisItem.getID() : '';
		this._stdYN = (typeof opener != 'undefined') ? opener.parent.top.thisItem.getType() == 'DHI_WF_WF' ? 'Y' : 'N' : '';
		this._projectId = "49BEBF8A1CDA4B96BF0A0C31EBB4B449";
		this._initSelectBox = '<select id="otherWorkflow" class="form-control input-sm"><option value=""> -- select -- </option></select>';
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
	
	set initSelectBox(initSelectBox) {
		this._initSelectBox = initSelectBox;
	}
	
	get initSelectBox() {
		return this._initSelectBox;
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
		
		$('#otherWorkflow').change(() => {
			// create load aras data
        	let select = new Select();
        	let result = select.load('DHI_WF_EDITOR_STRUCTURE');
        	
        	// load editor
            let editorLayout = new EditorLayout();
            editorLayout.type = editorLayout;
            
			if(result.nodeList != null) {
				// create test data
                let parser = new Parser();
                let otherWorkFlowData = parser.createOtherWorkFlowData(result.nodeList);
                let myWorkFlowData = parser.createMyWorkFlowData(otherWorkFlowData);
                
                editorLayout.otherWorkFlowData = otherWorkFlowData;
                editorLayout.myWorkFlowData = myWorkFlowData;
                editorLayout.drawOtherWorkFlow();
                editorLayout.drawMyWorkFlow();
        	}
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
		let pDatainitCB = "{kind: '', discLine: '" + $("#discipline")[0].value + "', discSpec: '" + $("#disciplineSpec")[0].value + "', bg: '" + $("#bg")[0].value
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
			this.emptySelectBoxElement();
			let otherWorkFlows = jQuery.parseJSON(json.data);
			
			for(let i in otherWorkFlows.data) {
				this.appendSelectBoxElement($('#otherWorkflow'), otherWorkFlows.data[i].LABEL, otherWorkFlows.data[i].VALUE);
			}
		}
	}
	
	emptySelectBoxElement() {
		$('#otherWorkflow').remove();
		$('#otherWorkflowTd').append(this.initSelectBox);
	}
	
	appendSelectBoxElement(element, label, value) {
		element.append($('<option>', {
		    value: value,
		    text: label
		}));
	}
}