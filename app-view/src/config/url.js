let domain = "http://chargingpile.companiontek.com/"
const PLATFORM="http://192.168.0.107:8083";
const nomalURL="http://106.75.173.82"
// const nomalURL="http://192.168.0.117"
// const nomalURL="http://106.75.129.117"
// const LOCALSRC = "http://106.75.166.143:8082"
const LOCALSRC = nomalURL+":8082"
//const LOCALSRC = "http://localhost:8083"
//const LOCALSRC = "http://192.168.0.154:8083"
const TOKEN = sessionStorage.getItem('token')
module.exports = {

    "login" : domain + "/login?phoneNumber={0}&password={1}",
    "regist" : domain + "/register",
    "scanQRCode" : domain + "/ScanQRCode?phoneNumber={0}&QRCode={1}",
    "modelSelection" : domain + "/modelSelection",
    "weChatConfig" : domain + "/weChatConfig?url={0}",
    "getCabinetInfo" : domain + "/getCabinetInfo",
    "stopCharging" : domain + "/stopCharging?phoneNumber={0}&QRCode={1}&stopSign=stopCharging",
    "getUnfinishOrder" : domain + "/getUnfinishOrder?phoneNumber={0}",
    "getRealInfo" : domain + "/getRealInfo?QRCode={0}",
    "getUserInfo" : domain + "/getUserInfo?phoneNumber={0}",
    "setUserInfo" : domain + "/setUserInfo",
    "getOrderList" : domain + "/getOrderList?phoneNumber={0}",
    "feedback" : domain + "/feedback",
    "BindPhoneNumber" : domain + "/BindPhoneNumber?phoneNumber={0}&openid={1}",
    "getRechargeRecord"  : domain + "/getRechargeRecord?phoneNumber={0}",
    "getNews"  : domain + "/getNews?",
   	"Auth" : domain + "/Wechat/Auth",
    "sendSmsCode" : "http://sms.jiangukj.com/SendSms.aspx",
    "createCharge" : domain + "/pingppCreateCharge",
    "getUserAccount" : domain + "/getUserAccount?phoneNumber={0}",
    LOCALSRC,
    TOKEN,
    PLATFORM,
    nomalURL
}

