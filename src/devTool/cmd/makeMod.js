var path = require('path');
var fs = require('fs');
var cmdLib = require('./lib.js');
var rootPath = path.resolve(path.resolve(path.resolve(__dirname, '..'), ".."), "..");
var modPath = rootPath + "/src/modules";
//生成主文件
var args = JSON.parse(process.env.npm_config_argv).original;
var modName = args[2];
if (!(modName && modName.indexOf("/") > 0)) {
	console.log("文件模块必需 ”index/test“ 格式");
	return false;
}
var PathName = modName.split("/")[1];
var data = {
	modName: cmdLib.ucfirst(modName),
	PathName: PathName,
	shortPath: modName
}

fs.exists(modPath + "/" + PathName, function(exists) {
	exists ? callback() : cmdLib.mkdirs(modPath + "/" + modName, callback);
})


function callback() {
	//生成store
	var fileStore = modPath + "/" + modName + "/index.store.js";
	//console.log(fileStore);
	fs.exists(fileStore, function(exists) {
		exists ? console.log(fileStore, '：文件生成失败，文件已存在,') : cmdLib.renderTo(rootPath + '/src/devTool/ejs/mod/index/index.store.ejs', data, fileStore);
	});

	//生成主文件
	var fileIndex = modPath + "/" + modName + ".js";
	fs.exists(fileIndex, function(exists) {
		if (exists) {
			console.log(fileIndex, '：生成失败，文件已存在,')
		} else {
			cmdLib.renderTo(rootPath + '/src/devTool/ejs/mod/index.ejs', data, fileIndex);
			require('./makeEntry.js');
		}
	});

	//生成 jsx
	var fileJsx = modPath + "/" + modName + "/index.jsx";
	fs.exists(fileJsx, function(exists) {
		exists ? console.log(fileJsx, '：生成失败，文件已存在,') : cmdLib.renderTo(rootPath + '/src/devTool/ejs/mod/index/index.jsx.ejs', data, fileJsx);
	});

	//生成 html
	var fileHtml = modPath + "/" + modName + "/index.html";
	fs.exists(fileHtml, function(exists) {
		exists ? console.log(fileHtml, '：生成失败，文件已存在,') : cmdLib.renderTo(rootPath + '/src/devTool/ejs/mod/index/index.html', data, fileHtml);
	});

}