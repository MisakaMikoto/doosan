/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
class Aras {
	constructor() {
		 this._arasObject = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.aras : '';
		 this._body = '';
	}
	set arasObject(arasObject) {
		this._arasObject = arasObject;
	}
	get arasObject() {
		return this._arasObject;
	}
	
	set body(body) {
		this._body = body;
	}
	
	get body() {
		return this._body;
	}
	
	applyMethod(methodName) {
		let inn = this.arasObject.newIOMInnovator();
        return inn.applyMethod(methodName, this.body);
	}
}