//返回
export default (cb) => {
	require.ensure([], (require) => {
		let connectComponent = require("./index/index.jsx").default;
		cb(connectComponent);
	}, 'modules/user/index');
}