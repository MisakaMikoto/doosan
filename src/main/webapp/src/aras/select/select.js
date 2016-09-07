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
	
	load(selectMethodName) {
		this.selectMethodName = selectMethodName;
		
		let wfId = (typeof opener != 'undefined') ? opener.parent.top.thisItem.getID() : '';
		let stdYN = (typeof opener != 'undefined') ? opener.parent.top.thisItem.getType() == 'DHI_WF_WF' ? 'Y' : 'N' : '';
		
		let body = '<wf_id>' + wfId + '</wf_id>';
        body += '<std_yn>' + stdYN + '</std_yn>';
        body += '<inout>OUT</inout>';
        
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