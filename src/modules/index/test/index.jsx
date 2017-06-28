//视图组件
import indexReducer from "./index.store.js"
class indexComponent extends React.Component {
    render() {
      const {
        state,
        add
      } = this.props;
      return (
        <%- include('__MOD__/index/test/index.html') %>
      )
    }
  }
  //动作方法
function mapDispatchToProps(dispatch) {
  return {
    add: (_this) => dispatch({
      type: 'Dec',
      event: _this
    })
  }
}
let componentName = "index/test";
const connectComponent = reactApp.connect(mapDispatchToProps, indexComponent, indexReducer,componentName);
export default connectComponent;