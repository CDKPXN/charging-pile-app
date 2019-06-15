const CarName = [['WEY','奥迪','拜腾', '宝骏', '宝马', '宝沃', '保时捷', '北京现代', '北汽新能源','奔驰','比亚迪','别克','长安','长城','川汽','大运','大众','电咖','东风',
'东风日产','东南','广汽','国金','海马','汉腾','华晨宝马','华泰','吉利','江淮','江铃','捷豹','凯迪拉克','康迪','力帆','奇瑞','启辰','上汽大通','上汽名爵','上汽荣威','特斯拉',
'腾势','威马','蔚来','沃尔沃','小鹏','新特','野马','一汽','云度','之诺','知豆','众泰']]
const CarType = function(val){
    let carType = []
    if(val == 'WEY'){
        carType = [['P8 PHEV']]
    }else if(val == '奥迪'){
        carType = [['A3 e-tron','e-tron']]
    }else if(val == '拜腾'){
        carType = [['Concept']]
    }else if(val == '宝骏'){
        carType = [['E100']]
    }else if(val == '宝马'){
        carType =[['i3','i8','X1']]
    }else if(val == '宝沃'){
        carType =[['BXi7']]
    }else if(val == '保时捷'){
        carType =[['Panamera Plua-in']]
    }else if(val == '北京现代'){
        carType =[['伊兰特EV']]
    }else if(val == '北汽新能源'){
        carType =[['EC180','EC200','EC3','EH300','ET480','EC180','EU200','EU260','EU300','EU400','EC180','EU5','EV150','EV200','EX200','EX260','EX300','LITE','绅宝ES210','威旺307EV',]]
    }else if(val == '奔驰'){
        carType =[['EQC']]
    }else if(val == '比亚迪'){
        carType =[['E5','e5 450','e6','秦Pro','秦EV','秦EV450','秦PHEV','宋DM','宋EV','宋EV400','唐','元DM','元EV',]]
    }else if(val == '别克'){
        carType =[['VELITE 5']]
    }else if(val == '长安'){
        carType =[['CS15EV','CS75 PHEV','奔奔EV','福特蒙迪欧','逸动EV','逸动PHEV']]
    }else if(val == '长城'){
        carType =[['C30EV','欧拉iQ']]
    }else if(val == '川汽'){
        carType =[['野马']]
    }else if(val == '大运'){
        carType =[['E3']]
    }else if(val == '大众'){
        carType =[['e-golf','e-up','高尔夫GTE']]
    }else if(val == '电咖'){
        carType =[['EV10']]
    }else if(val == '东风'){
        carType =[['E30','E30L','风神A60','风神E70','景逸S50EV','小康EC36']]
    }else if(val == '东风日产'){
        carType =[['轩逸纯电']]
    }else if(val == '东南'){
        carType =[['DX3']]
    }else if(val == '广汽'){
        carType =[['GA5插混','传祺GA3S PHEV','传祺GA5 PHEV','传祺GE3','传祺GS4 PHEV']]
    }else if(val == '国金'){
        carType =[['GM3']]
    }else if(val == '海马'){
        carType =[['@3','爱尚EV']]
    }else if(val == '汉腾'){
        carType =[['X7']]
    }else if(val == '华晨宝马'){
        carType =[['530Le插混']]
    }else if(val == '华泰'){
        carType =[['EV160','iEV230','XEV260']]
    }else if(val == '吉利'){
        carType =[['GSe','博瑞GE phev','帝豪EV300','帝豪EV450','帝豪PHEV']]
    }else if(val == '江淮'){
        carType =[['iEV3','iEV4','iEV5','iEV6E','iEV6S','iev7','iEV7S','iEVA50']]
    }else if(val == '江铃'){
        carType =[['E100','E160','E200','E200S']]
    }else if(val == '捷豹'){
        carType =[['I-PACE']]
    }else if(val == '凯迪拉克'){
        carType =[['GT6混动']]
    }else if(val == '康迪'){
        carType =[['K17']]
    }else if(val == '力帆'){
        carType =[['330EV','620EV']]
    }else if(val == '奇瑞'){
        carType =[['eQ','eQ1','QQ3ev','艾瑞泽5e','瑞虎3xe','瑞麟M1-EV']]
    }else if(val == '启辰'){
        carType =[['晨风']]
    }else if(val == '上汽大通'){
        carType =[['EG10']]
    }else if(val == '上汽名爵'){
        carType =[['名爵6']]
    }else if(val == '上汽荣威'){
        carType =[['e50','e550','e950','Ei5','ei6','eRX5','ERX5','Marvel X']]
    }else if(val == '特斯拉'){
        carType =[['Model 3','Model S','Model X']]
    }else if(val == '腾势'){
        carType =[['300','400','500']]
    }else if(val == '威马'){
        carType =[['EX5 300','EX5 400','EX5 500','EX5 Pro 300','EX5 Pro 400']]
    }else if(val == '蔚来'){
        carType =[['ES8']]
    }else if(val == '沃尔沃'){
        carType =[['S60L','S90 PHEV','XC60 PHEV','XC90 PHEV']]
    }else if(val == '小鹏'){
        carType =[['G3']]
    }else if(val == '新特'){
        carType =[['DEV 1']]
    }else if(val == '野马'){
        carType =[['EC30','EC70']]
    }else if(val == '一汽'){
        carType =[['奔腾B30EV','骏派A70E']]
    }else if(val == '云度'){
        carType =[['π1','π3','π4']]
    }else if(val == '之诺'){
        carType =[['1E']]
    }else if(val == '知豆'){
        carType =[['D1','D2','D2S','D3','E20']]
    }else{
        carType =[['E200','T300','Z500EV','云100','芝麻E30']]
    }
    return carType
}
module.exports = {
    CarName,
    CarType
}   