export  function getDictionaryName(code) {

    var arr = [{
        code: '010601',
        name: '温度',
        img: ''
    }, {
        code: '010602',
        name: '振动',
        img: ''
    }, {
        code: '010603',
        name: '电量',
        img: ''
    }, {
        code: '010604',
        name: '浓度',
        img: ''
    }, {
        code: '010605',
        name: '环境温度',
        img: ''
    }, {
        code: "010606",
        name: '液位',
        img: ''
    }, {
        code: "010686",
        name: '其他',
        img: ''
    }, {
        code: "010687",
        name: '断纤',
        img: ''
    }, {
        code: "010688",
        name: '温速',
        img: ''
    }, {
        code: "010689",
        name: '温差',
        img: ''
    }, {
        code: "01",
        name: '一级',
        img: ''
    }, {
        code: "02",
        name: '二级',
        img: ''
    }, {
        code: "03",
        name: '三级',
        img: ''
    }]


    for (var i = 0; i < arr.length; i++) {
        var ob = arr[i]
        var code1 = ob['code']
        var name1 = ob['name']
        var img1 = ob['img']
        if (code == code1) {
            return name1
        }
    }

    return ''
    // var name=''
    //
    // //6位数
    // if(code=="010601"){
    //     name='温度'
    // }else if(code=="010602"){
    //     name='振动'
    // }else if(code=="010603"){
    //     name='电量'
    // }else if(code=="010604"){
    //     name='浓度'
    // }else if(code=="010605"){
    //     name='环境温度'
    // }else if(code=="010606"){
    //     name='液位'
    // }else if(code=="010686"){
    //     name='其他'
    // }else if(code=="010687"){
    //     name='断纤'
    // }else if(code=="010688"){
    //     name='温速'
    // }else if(code=="010689"){
    //     name='温差'
    // }
    //
    //
    //
    // //2位数
    // if(code=="01"){
    //     name='一级'
    // }else if(code=="02"){
    //     name='二级'
    // }else if(code=="03"){
    //     name='三级'
    // }
    // return name;
}

export function getDictionary(str, alarm) {

    var arr = [{
        code: '010601',
        name: '温度',
        unit: '温度（℃）',
        img: 'wendu.gif'
    }, {
        code: "010686",
        name: '其他',
        img: 'alarm.png'
    }, {
        code: '010602',
        name: '振动',
        unit: '振幅',
        img: 'zhendong-info.gif'
    }, {
        code: "010687",
        name: '断纤',
        img: 'duanxian.gif'
    }, {
        code: "010688",
        name: '温速',
        unit: '温度（℃）',
        img: 'wensu.gif'
    }, {
        code: "010689",
        name: '温差',
        unit: '温度（℃）',
        img: 'wencha.gif'
    }, {
        code: "01",
        name: '一级',
        img: 'alarm.png'
    }, {
        code: "02",
        name: '二级',
        img: 'alarm.png'
    }, {
        code: "03",
        name: '三级',
        img: 'alarm.png'
    }, {
        code: '010603',
        name: '应变',
        img: 'alarm.png',
        unit: 'με'
    }]


    for (var i = 0; i < arr.length; i++) {
        var ob = arr[i]
        var code1 = ob['code']
        var name1 = ob['name']
        var img1 = ob['img']
        if (str == code1 || str == name1) {
            if (!alarm) {
                ob['img'] = ob['img'].split(".")[0] + "_early." + ob['img'].split(".")[1]
            }else{
                if(alarm=="预警"){
                    ob['img'] = ob['img'].split(".")[0] + "_early." + ob['img'].split(".")[1]
                }
            }
            return ob
        }
    }

    return {}
}
