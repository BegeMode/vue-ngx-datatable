/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author @BegeMode
*/
module.exports = function(content) {
	this.cacheable && this.cacheable();
	if (this.resourceQuery.includes('?vue&type=template')) {
		// html template requires from .vue file
		// will not create module, it will have done vue-loader
		return content;
	}
	this.value = content;
	return "module.exports = " + JSON.stringify(content);
}
module.exports.seperable = true;