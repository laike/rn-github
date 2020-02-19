/**
 * 这里返回一个realm对象给外界调用
 */
//注意在新版本中我们不需要传入schema先
import schema from './schema';
import Realm from 'realm';
//这里我们做一个单例模型防止多次初始化
class Db {
  static instance = null;
  static getInstance() {
    if (Db.instance) {
      return Db.instance;
    } else {
      //初始化
      return (Db.instance = new Realm({
        schema,
        schemaVersion: 5,
      }));
    }
  }
}

export default Db.getInstance();
