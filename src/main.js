/*gulp makeEntry  里生成main.js，main的模板在devTool里*/
import App from './app.js' 
  
App.components.IndexTest = require("./modules/index/test.js").default
  
App.components.UserIndex = require("./modules/user/index.js").default
  
App.components.UserInfo = require("./modules/user/info.js").default

App.run();