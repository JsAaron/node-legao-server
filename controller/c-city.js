import Cities from '../models/m-city'

/**
 * 城市控制器
 */
import BaseCompoent from './base-componet'

class City extends BaseCompoent {
    constructor() {
        super()
        this.pois = this.pois.bind(this);
    }
    async getCity(req, res, next) {
        const type = req.query.type;
        let cityInfo
        //热门城市
        if (type === 'hot') {
            cityInfo = await Cities.cityHot();
        }
        res.send(cityInfo);
    }
    /**
     * 获取定位地址
     * @param {} req 
     * @param {*} res 
     * @param {*} next 
     */
    async pois(req, res, next) {
        const geohash = req.params.geohash;
        try {
            if (geohash.indexOf(',') == -1) {
                throw new Error('参数错误')
            }
        } catch (err) {
            console.log('参数错误');
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误',
            })
            return
        }
        const poisArr = geohash.split(',');
        try {
            const data = await this.getpois(poisArr[0], poisArr[1]);
            const address = {
                address: data.result.address,
                city: data.result.address_component.province,
                geohash,
                latitude: poisArr[0],
                longitude: poisArr[1],
                name: data.result.formatted_addresses.recommend,
            }
            res.send(address);
        } catch (err) {
            console.log('getpois返回信息失败');
            res.send({
                status: 0,
                type: 'ERROR_DATA',
                message: '获取数据失败',
            })
        }
    }
}


export default new City()