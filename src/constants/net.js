/**
 * 这里设置axios 请求头相关 以及响应头相关的常量配置
 */
export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_FORMURL = 'application/x-www-form-urlencoded';
//请求成功的code
export const CODE_SUCCESS = 200;
//客户端请求资源或者地址错误
export const CODE_NOT_FOUND = 404;
//请求的地址已经永久性地转移到了新的地址
export const CODE_PERMENTLY_REDIRECT = 304;
//请求的服务器端错误
export const CODE_SERVER_ERROR = 403;
//权限不够，需要登录
export const NEED_AUTH = 401;
