'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Rest = function () {
	function Rest() {
		_classCallCheck(this, Rest);

		this._type = '';
		this._url = '';
		this._data = '';
		this._contentType = "application/json; charset=utf-8";
		this._dataType = 'json';
		this.callback = '';
	}

	_createClass(Rest, [{
		key: 'call',
		value: function call() {
			var self = this;

			$.ajax({
				type: this.type,
				url: this.url,
				data: this.data,
				contentType: this.contentType,
				dataType: this.dataType,
				success: function success(response) {
					var callback = $.proxy(self.callback, self);
					callback(response);
				}
			});
		}
	}, {
		key: 'type',
		set: function set(type) {
			this._type = type;
		},
		get: function get() {
			return this._type;
		}
	}, {
		key: 'url',
		set: function set(url) {
			this._url = url;
		},
		get: function get() {
			return this._url;
		}
	}, {
		key: 'data',
		set: function set(data) {
			this._data = data;
		},
		get: function get() {
			return this._data;
		}
	}, {
		key: 'contentType',
		set: function set(contentType) {
			this._contentType = contentType;
		},
		get: function get() {
			return this._contentType;
		}
	}, {
		key: 'dataType',
		set: function set(dataType) {
			this._dataType = dataType;
		},
		get: function get() {
			return this._dataType;
		}
	}, {
		key: 'callback',
		set: function set(callback) {
			this._callback = callback;
		},
		get: function get() {
			return this._callback;
		}
	}]);

	return Rest;
}();