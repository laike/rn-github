/**
 * 这里返回一个realm对象给外界调用
 */
//注意在新版本中我们不需要传入schema先
import schema from './schema';
import Realm from 'realm';
let realm = new Realm({
  schema,
  schemaVersion: 0,
});
export default realm;
