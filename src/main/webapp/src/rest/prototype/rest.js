/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
class Rest {
	constructor() {
		this._type = '';
		this._url = '';
		this._data = '';
		this._contentType = "application/json; charset=utf-8";
		this._dataType = 'json';
		this.callback = '';
	}
	
	set type(type) {
		this._type = type;
	}
	
	get type() {
		return this._type;
	}
	
	set url(url) {
		this._url = url;
	}
	
	get url() {
		return this._url;
	}
	
	set data(data) {
		this._data = data;
	}
	
	get data() {
		return this._data;
	}
	
	set contentType(contentType) {
		this._contentType = contentType;
	}
	
	get contentType() {
		return this._contentType;
	}
	
	set dataType(dataType) {
		this._dataType = dataType;
	}
	
	get dataType() {
		return this._dataType;
	}
	
	set callback(callback) {
		this._callback = callback;
	}
	
	get callback() {
		return this._callback;
	}
	
	call() {
		let self = this;
		
		$.ajax({
			type: this.type,
	         url: this.url,
	         data: this.data,
	         contentType: this.contentType,
	         dataType: this.dataType,
	         success: function (response) {
	        	 let callback = $.proxy(self.callback, self);
	        	 callback(response);
	         }
		});
	}
}