/**
 * 这里返回一个realm对象给外界调用
 */
import schema from './schema';
import realm from 'realm';
const Realm = realm.open({
  schema,
});
export default Realm;
