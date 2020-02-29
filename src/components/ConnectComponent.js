//这个文件很重要用来让每个组件都可以使用store
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions';
console.log(typeof actions);

//HOC高阶组件
export default function ConnectCommponent({
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  LayoutComponent,
}) {
  return connect(
    mapStateToProps ||
      function(state) {
        return {};
      },
    mapDispatchToProps ||
      function(dispatch) {
        return {
          actions: bindActionCreators(actions, dispatch),
        };
      },
    mergeProps,
  )(LayoutComponent);
}
