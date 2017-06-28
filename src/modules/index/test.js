//返回
export default (cb) => {
	require.ensure([], (require) => {
		let connectComponent = require("./test/index.jsx").default;
		cb(connectComponent);
	}, 'modules/index/test');
}