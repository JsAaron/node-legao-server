'use strict';

import FoodModel from '../models/m-shop'
import ShopModel from '../models/m-shop'
import BaseCompoent from './base-componet'


/**
 * 商品类
 */
class Shop extends BaseCompoent {
  constructor() {
    super()
    this.getList = this.getList.bind(this);
  }
  //获取商铺列表
  async getList(req, res, next) {
    const {
      latitude,
      longitude,
      offset = 0,
      limit = 20
    } = req.query;

    try {
      if (!latitude) {
        throw new Error('latitude参数错误')
      } else if (!longitude) {
        throw new Error('longitude参数错误');
      }
    } catch (err) {
      console.log('latitude,longitude参数错误');
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return
    }
    const restaurants = await ShopModel.find({}, '-_id').limit(Number(limit)).skip(Number(offset))

    //
    const from = latitude + ',' + longitude;
    let to = '';

    //获取百度地图测局所需经度纬度
    restaurants.forEach((item, index) => {
      const slpitStr = (index == restaurants.length - 1) ? '' : '|';
      to += item.latitude + ',' + item.longitude + slpitStr;
    })


    try {
      if (restaurants.length) {
        //获取距离信息，并合并到数据中
        const distance_duration = await this.getDistance(from, to)
        restaurants.map((item, index) => {
          return Object.assign(item, distance_duration[index])
        })
      }
    } catch (err) {
      // 百度地图达到上限后会导致加车失败，需优化
      console.log('从addressComoponent获取测距数据失败', err);
      restaurants.map((item, index) => {
        return Object.assign(item, {
          distance: '10公里',
          order_lead_time: '40分钟'
        })
      })
    }

    try {
      res.send(restaurants)
    } catch (err) {
      res.send({
        status: 0,
        type: 'ERROR_GET_SHOP_LIST',
        message: '获取店铺列表数据失败'
      })
    }

  }
}

export default new Shop()