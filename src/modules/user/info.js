//返回
export default (cb) => {
	require.ensure([], (require) => {
		let connectComponent = require("./info/index.jsx").default;
		cb(connectComponent);
	}, 'modules/user/info');
}