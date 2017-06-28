class RouteDispatch {

  parseLocation(location) { //从url中解析，调用组件，参数
    let search = location.search; //?后的参数
    let searchParams = [];
    let ComponentPath = reactApp.params.entry;
    if (search) { //？号后面的参数 ?id=12 => {id:2}
      searchParams = reactApp.GetRequest(search.substr(1));
    }
    let pathname = location.pathname.substr(1).trim('/');
    if (pathname) {
      ////pathinfo 参数， 如：/index/index/id/12=> {id:2}
      let strs = pathname.split("/");
      let control = strs[0] ? strs[0] : 'index';
      let method = strs[1] ? strs[1] : 'index';
      ComponentPath = control + "/" + method;
      let arr = {};
      for (let i = 2; i < strs.length; i += 2) {
        let key = strs[i]; // && !$.isNumeric(key)
        if (typeof(key) == "string" && key && !$.isNumeric(key)) {
          searchParams[key] = strs[i + 1] ? strs[i + 1] : '';
        }
      }
    }
    //数组转json
    let jsonSearchParams = {};
    for (let k in searchParams) {
      jsonSearchParams[k] = searchParams[k];
    }
    return {
      ComponentPath: ComponentPath,
      arg: jsonSearchParams
    };
  }


  dispatch(location) { //路由分发，默认
    let params = this.parseLocation(location);
    if (!params['ComponentPath']) {
      console.error("ComponentPath undefinded", params);
      return false;
    }
    let componentName = reactApp.ucfirst(params['ComponentPath']);
    let cb = (component) => {
      const ConnectComponent = withRouter(component);
      ReactDOM.render(
        <Router >
          <ConnectComponent arg={params.arg}/>
         </Router>, document.getElementById('app'));
    }
    reactApp.components[componentName](cb);;

  }
}

export default RouteDispatch;