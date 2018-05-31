export default {

  /*====================基地址=======================*/
  // baseUrl: 'http://10.100.12.17:20202/app/mock/25',
  baseUrl: 'http://10.100.12.43:9081',

  // baseUrl: '//ypt.tonghuafund.com/api',

  // baseUrl: 'http://172.22.191.165:9081',

  /*====================url后缀======================*/

  /*校验手机是否已注册*/
  checkPhoneIsExist: '/user/checkPhoneIsExist',

  /*获取验证码*/
  captcha: '/user/captcha',

  /*校验验证码*/
  checkCaptcha: '/user/checkCaptcha',

  /*注册*/
  register: '/user/register',

  /*公告*/
  notice: '/account/bulletin',

  /*登录*/
  login: '/user/login',

  /*授权*/
  authorize: '/user/authorize',

  /*首次登录回调接口*/
  loginCb: '/user/firstLogin',

  /*重置密码*/
  resetPassword: '/user/resetPassword',

  /*换卡请求*/
  changeBankCardReq: '/h5/changeBankCardReq',

  /*设置交易密码*/
  payPassword: '/user/payPassword/set',

  /*换卡验证码验证*/
  changeBankCardVerifySmsCode: '/h5/changeBankCardVerifySmsCode',

  /*累计收益*/
  getTotalProfit: '/account/totalProfit',

  /*万份收益和七日年化数据*/
  getWeekProfit: '/account/profit',

  /*首页*/
  getHomeData: '/account/info',

  /*校验交易密码*/
  payPasswordVerify: '/user/payPassword/verify',

  /*校验身份证是否可用*/
  checkIdCardNo: '/account/checkIdCardNo',

  /*校验身份证是否可用（忘记交易密码专用）*/
  checkIdCardNoPwd: '/user/checkIdCard',

  /*校验银行卡密码是否可用*/
  bankAccountNo: '/account/bankAccountNo',

  /*用户账单列表*/
  getBillList: '/order/billList',

  /*用户申购账单详情  /order/recharge/billDetail/:txnId*/
  getRechargeDetial: '/order/recharge/billDetail/',

  /*用户赎回账单详情  /order/withdraw/billDetail/:txnId*/
  getWithdrawDetial: '/order/withdraw/billDetail/',

  /*用户银行卡*/
  getBankList: '/user/bankList',

  //支持银行卡列表
  supportBank:'/account/bank',

  /*卡Bin*/
  getCardBin: '/user/cardBin',

  /*开户/换卡模块 / 开户验证短信验证码*/
  verifyCreateAccountSms: '/user/verifyCreateAccountSms',

  /*获取用户信息*/
  getUserInfo: '/user/basicInfo',

  /*开户*/
  createUserAccount: '/user/createUserAccount',

  /*用户申购,充值请求*/
  getRecharge: '/order/recharge',

  /*申购,获取用户四要素列表*/
  userSecurityInfoList: '/order/findUserSecurityInfoList',

  /*申购,转入结果详情*/
  rechargeResultDetail: '/order/recharge/resultDetail/',

  /*用户赎回,提现请求*/
  getWithdraw: '/order/withdraw',

  /*赎回,提现四要素列表*/
  withdrawUserSecurityInfoList: '/order/withdrawUserSecurityInfoList',

  /*赎回,转出结果详情*/
  withdrawResultDetail: '/order/withdraw/resultDetail/',

  /*获取用户是否开户，设置交易密码*/
  getBindOrPassword: '/user/status',

  /*赎回到账时间，当日可提现次数*/
  getDayWidthdrawTime: '/order/toDayCanWithdrawTime',

  /*获取客服电话*/
  getCustomerTel: '/user/customerService',

  /*获取申购相关时间*/
  getRechangeTime: '/order/rechargeTime',

  /*基金业绩表现*/
  getPerformance: '/account/performance',

  /*资产配置*/
  getAssetAllocation:'/account/assetAllocation',

  /*基金概况*/
  getFundInfo:'/fund/basicInfo',

  /*基金公司*/
  getFundCompany:'/fund/companyInfo',

  /*基金经理*/
  getFundManage:'/fund/managerInfo',

  /*我的奖励*/
  getPrizeList:'/prize/list',

  /*领取京东卡*/
  getJDPrize:'/prize/jd',

  /*领取话费*/
  getMobileRechange:'/prize/mobileRecharge',

  /*投资激活弹窗*/
  getPrizeDialog:'/prize/dialog',

  //新手福利
  usrWelfare:'welfare/show',
  //领取新手福利接口
  activeCoupon:'/welfare/receive',

  //获取邀请有礼首页
  getIndexContent:'/invite/getIndexContentByUserId',

  //获取历史获奖列表
  getHistoryPrizeList:'/invite/winPrizeHistoryList',

  //获取微信签名返回信息
  getWechatSDKSign:'/wechat/jssdkSign',

  //我的邀请
  getMyInviteRecord:'/invite/getMyInviteContent',

  //我的推荐奖励
  getMyInvitePrize:'/invite/getMyInvitePrizeContent',

  //查询脱敏手机号
  getDesensitizePhone: '/user/desensitizePhone',

  //获取京东卡号
  getJDCardNum:'/prize/getJd',

  //新手活动万份收益和七日收益
  welfareProfit: '/welfare/profit',

  //活动落地页 接受邀请
  acceptInvite: '/user/acceptInvite'

}
