/**
 * 获取用户基本信息的方法
 */
//导入http类 这是一个单例类

import {USER_KEY} from '../constants/constants';
import {getData, storeData, toast, insert, queryAll, queryOne} from './untils';
import CodePush from 'react-native-code-push';

/**
 *
 */
export const getUserInfo = async () => {
  const userinfo = await getData(USER_KEY, true);
  return userinfo;
};
/**
 *
 * @param {*} user
 */
export const setUserInfo = async user => {
  const result = await storeData(USER_KEY, user);
  return result;
};
/**
 *
 */

export const checkUpdate = () => {
  CodePush.checkForUpdate().then(update => {
    if (!update) {
      toast('版本已经是最新的！');
    } else {
      //进行更新
      syncImmediate();
    }
  });
};
/**
 *
 */
export const appInfo = () => {
  CodePush.getCurrentPackage().then(info => {
    toast(info, 3000);
  });
};
/**
 *
 */
export const syncImmediate = () => {
  CodePush.sync({
    //安装模式
    //ON_NEXT_RESUME 下次恢复到前台时
    //ON_NEXT_RESTART 下一次重启时
    //IMMEDIATE 马上更新
    installMode: CodePush.InstallMode.IMMEDIATE,
    //对话框
    updateDialog: {
      //是否显示更新描述
      appendReleaseDescription: true,
      //更新描述的前缀。 默认为"Description"
      descriptionPrefix: '更新内容：',
      //强制更新按钮文字，默认为continue
      mandatoryContinueButtonLabel: '立即更新',
      //强制更新时的信息. 默认为"An update is available that must be installed."
      mandatoryUpdateMessage: '必须更新后才能使用',
      //非强制更新时，按钮文字,默认为"ignore"
      optionalIgnoreButtonLabel: '稍后',
      //非强制更新时，确认按钮文字. 默认为"Install"
      optionalInstallButtonLabel: '后台更新',
      //非强制更新时，检查到更新的消息文本
      optionalUpdateMessage: '有新版本了，是否更新？',
      //Alert窗口的标题
      title: '更新提示',
    },
  });
};

//新增阅读功能 先在数据库中增加表 阅读历史表
/**
 *
 * @param {*} query
 * @param {*} history
 */
export const addReadHistory = (query = '', history = {}) => {
  insert('RespositoryHistories', `name="${query}"`, {
    name: query,
    data: JSON.stringify(history),
    time: Date.now().toString(),
  });
};
/**
 *
 */
export const getreadHistories = () => {
  let histories = queryAll('RespositoryHistories', 20); //最多可以去除20条数据
  let data = [];
  //这里进行处理
  histories.forEach((item, index) => {
    data.push(JSON.parse(item.data));
  });
  return data;
};
