import Ids from '../models/m-ids'
import fetch from 'node-fetch';

/**
 * 基础控制组件
 */
export default class BaseComponent {
    constructor() {
		this.tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
		this.tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
		this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
		this.baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
		this.baidukey2 = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
        this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
    }
    //获取id列表
    async getId(type) {
        if (!this.idList.includes(type)) {
            console.log('id类型错误');
            throw new Error('id类型错误');
            return
        }
        try {
            const idData = await Ids.findOne();
            idData[type]++;
            await idData.save();
            return idData[type]
        } catch (err) {
            console.log('获取ID数据失败');
            throw new Error(err)
        }
    }

    /**
     * 通过geohash获取精确位置
     * @param {*} lat 
     * @param {*} lng 
     */
    async getpois(lat, lng) {
        try {
            const res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', {
                key: this.tencentkey,
                location: lat + ',' + lng
            })
            if (res.status == 0) {
                return res
            } else {
                throw new Error('通过获geohash取具体位置失败');
            }
        } catch (err) {
            console.log('getpois获取定位失败')
            throw new Error(err);
        }
    }

    //测量距离
    async getDistance(from, to, type) {
        try {
            let res
            res = await this.fetch('http://api.map.baidu.com/routematrix/v2/driving', {
                ak: this.baidukey,
                output: 'json',
                origins: from,
                destinations: to,
            })
            if (res.status !== 0) {
                res = await this.fetch('http://api.map.baidu.com/routematrix/v2/driving', {
                    ak: this.baidukey2,
                    output: 'json',
                    origins: from,
                    destinations: to,
                })
            }
            if (res.status == 0) {
                const positionArr = [];
                let timevalue;
                res.result.forEach(item => {
                    timevalue = parseInt(item.duration.value) + 1200;
                    let durationtime = Math.ceil(timevalue % 3600 / 60) + '分钟';
                    if (Math.floor(timevalue / 3600)) {
                        durationtime = Math.floor(timevalue / 3600) + '小时' + durationtime;
                    }
                    positionArr.push({
                        distance: item.distance.text,
                        order_lead_time: durationtime,
                    })
                })
                if (type == 'tiemvalue') {
                    return timevalue
                } else {
                    return positionArr
                }
            } else {
                throw new Error('调用百度地图测距失败');
            }
        } catch (err) {
            console.log('获取位置距离失败')
            throw new Error(err);
        }
    }
    //获取数据
    async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
        type = type.toUpperCase();
        resType = resType.toUpperCase();
        if (type == 'GET') {
            let dataStr = ''; //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            })

            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
        }

        let requestConfig = {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        let responseJson;
        try {
            const response = await fetch(url, requestConfig);
            if (resType === 'TEXT') {
                responseJson = await response.text();
            } else {
                responseJson = await response.json();
            }
        } catch (err) {
            console.log('获取http数据失败', err);
            throw new Error(err)
        }
        return responseJson
    }
}