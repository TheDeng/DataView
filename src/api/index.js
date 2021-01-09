// 1 引入axios
import axios from "axios";



// 过滤器
// axios 请求过滤器
// axios 响应过滤器
// 1 判断状态码
// 2 不希望多了一层嵌套

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.status === 0){
    return response.data.message
  }else{
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
//添加baseURL

/**
 * 测试
 */
export const Test=()=>axios.get('/api/shops/')

/**
 * 注册接口
 */
export const Register = (code,passwd) => axios.get(`/api/sign_in?invite_code=${code}&passwd=${passwd}`);

/**
 * 登录接口
 */
export const Login = (code,passwd) => axios.get(`/api/log_in?id=${code}&passwd=${passwd}`);

/**
 * 获取邀请码接口
 */
export const getInviteCode = () => axios.get(`/api/get_invite_code`);
/**
 * 获取网络状态接口
 */
export const getNetwork=(ip,date)=>axios.get(`/api/get_network?ip=${ip}&date=${date}`)

/**
 * 获取重要进程运行状态
 */
export const getProcess=(ip,date)=>axios.get(`/api/get_process?ip=${ip}`)


/**
 * 获取性能监控数据
 */
export const getPerformance=(ip,date)=>axios.get(`/api/get_performance?ip=${ip}&date=${date}`)



/**
 * 获取服务器当日最大上传和下载速率
 */
export const getMaximumFlow=(ip,date)=>axios.get(`/api/get_maximum_flow?ip=${ip}&date=${date}`)
