const build = {
  staticUrl: 'http://qrcodep.westlakevr.cn/', // 静态资源路径
  commonUrl: 'http://qrcodep.qimiaowa.com',
  authUrl: 'http://qrcode.qimiaowa.com'
};
const build_dev = {
  staticUrl: 'http://qrcodep.westlakevr.cn:9003/', // 静态资源路径
  commonUrl: 'http://qrcodep.qimiaowa.com:9003',
  authUrl: 'http://qrcode.qimiaowa.com:9005'
};

module.exports = {build, build_dev};
