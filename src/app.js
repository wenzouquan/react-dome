import {
    Route,
    HashRouter as Router,
    NavLink,
    Switch,
    withRouter,
} from 'react-router-dom';
import {
    connect,
    Provider
} from 'react-redux'

import {
    createStore,
} from 'redux'

import {
    createHashHistory
} from 'history';
import Config from './config'
import $ from 'n-zepto'
window.$ = $;
window.Router = Router;
window.Route = Route;
window.NavLink = NavLink;
window.Switch = Switch;
window.withRouter = withRouter;
window.ReactDom = window.ReactDOM;
class App {
    constructor(config = {}) {
        this.stores = {}; //所有store
        this.components = {}; //所有路由模块
        this.params = {
            versions: '6.7',
            userVersions: '2.4',
            debug: true
        };
        for (let key in config) {
            this.params[key] = config[key];
        }
        this.history = createHashHistory();
    }
    getStore(path, props, reducer) { //redux 的 store ，用于数据管理
        let storeName = this.ucfirst(path);
        let store;
        if (store = this.stores[storeName]) { //存在，且请求参数没有变化，返回store,参数发生变化需要重新实例化
            let newArg = JSON.stringify(props.match.params);
            let oldArg = JSON.stringify(store.getState().params);
            if (newArg == oldArg) {
                return store;
            }
        }

        // let reducer = require("./modules/" + path + ".store.js").default;
        reducer.props = props;
        reducer.getStore = () => {
            return store
        }
        store = createStore(reducer);
        store.call = (type, params = {}) => {
            params['type'] = type;
            return store.dispatch(params);
        }
        store.setState = (params = {}) => {
            params['type'] = 'setState';
            params['states'] = params;
            return store.dispatch(params);
        }

        store.watch = (listenKey, fn) => { //监听store里对象是否发生变化
            let currentValue = JSON.stringify(store.getState()[listenKey]);
            let unsubscribe = store.subscribe(function() {
                let previousValue = currentValue
                currentValue = JSON.stringify(store.getState()[listenKey]);
                if (currentValue != previousValue) {
                    fn ? fn(currentValue, previousValue) : '';
                }
            })
            return unsubscribe;
        }
        this.stores[storeName] = store;
        //调用初始化函数
        store.call('init');
        // let initFn = reducer.init;
        // if (typeof(initFn) == 'function') {
        //     store.call('init');
        // }
        return store;
    }


    reducer(params = {}) { /*//store state 数据层*/

        params.setState = function(states) {
            for (let key in states) {
                this.state[key] = states[key];
            }
        }
        return function returnReducer(state = params['state'], action = {}) {
            //url 带过来的参数
            state['params'] = returnReducer.props.match.params;
            for (let key in params) {
                returnReducer[key] = params[key];
            }
            returnReducer.state = state;
            if (params[action['type']]) {
                params[action['type']].call(returnReducer, action);
                //params[action['type']](action.key, action.value);
            }
            // console.log(state.params.id);
            return {
                ...state
            };
        }

    }
    ucfirst(str) { //首字母大写 "index/a" => "IndexA"
        if (typeof(str) !== "string") {
            return "";
        }
        var strs = str.split("/");
        var res = "";
        for (var i in strs) {
            str = strs[i];
            //var str = str.toLowerCase();
            str = str.replace(/\b\w+\b/g, function(word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            res += str;
        }
        return res;
    }

    connect(mapDispatchToProps, component, reducer, storePath, mapStateToProps) {
        // mapDispatchToProps:方法  ,component 纯组件  ,reducer store ,storePath store文件路径   mapStateToProps
        let storeName = this.ucfirst(storePath);
        if (typeof(mapStateToProps) != "function") {
            mapStateToProps = (state) => {
                return {
                    state: state
                }
            }
        }
        const C = connect(mapStateToProps, mapDispatchToProps)(component);
        const _this = this;
        class newComponent extends React.Component {
            shouldComponentUpdate(nextProps, nextState) {
                return false;
            }
            render() {
                this.props.match.params = this.props.arg;
                const store = _this.getStore(storePath, this.props, reducer);
                return (
                    <div>  <Provider store={store}><C /></Provider></div>
                );
            }
        }
        return newComponent;
    }

    run() { //执行react
        // 监听当前的地址变换
        const RouteDispatch = require("./RouteDispatch.js").default;
        let RouteDispatchClass = new RouteDispatch();
        const unlisten = this.history.listen(location => {
            RouteDispatchClass.dispatch(location);
        })
        RouteDispatchClass.dispatch(this.history.location);
    }
    GetRequest(str) { //url参数
        var theRequest = new Object();
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var v = strs[i].split("=")[1];
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
        return theRequest;
    }
}
window.reactApp = new App(Config);
export default reactApp;