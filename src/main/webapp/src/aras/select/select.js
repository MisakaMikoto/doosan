/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
class Select extends Aras {
	constructor() {
		super();
		this._selectMethodName = '';
	}
	
	set selectMethodName(selectMethodName) {
		this._selectMethodName = selectMethodName;
	}
	
	get selectMethodName() {
		return this._selectMethodName;
	}
	
	load(selectMethodName, inout) {
		this.selectMethodName = selectMethodName;
		
		let wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
		let stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
		
		let body = '<wf_id>' + wfId + '</wf_id>';
        body += '<std_yn>' + stdYN + '</std_yn>';
        body += '<inout>' + inout + '</inout>';
        
        this.body = body;
		
		if(typeof this.arasObject != 'undefined' || this.arasObject != null ) {
			return this.applyMethod(this.selectMethodName);
		}
	}
	
	reload(selectMethodName, wfId, stdYN) {
		this.selectMethodName = selectMethodName;
		
		let body = '<wf_id>' + wfId + '</wf_id>';
        body += '<std_yn>' + stdYN + '</std_yn>';
        body += '<inout>OUT</inout>';
        
        this.body = body;
		
		if(typeof this.arasObject != 'undefined' || this.arasObject != null ) {
			return this.applyMethod(this.selectMethodName);
		}
	}
}