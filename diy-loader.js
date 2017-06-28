var diyLoader = {
	ejs: function(source, loaderOptions) {
		var ejsObj = require("ejs");
		var rootPath = __dirname;
		source = source.replace(/__ROOT__/g, rootPath);
		source = source.replace(/__MOD__/g, rootPath + "/src/modules");
		source = ejsObj.render(source, loaderOptions);
		return source;
	}
}


module.exports = diyLoader