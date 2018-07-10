'use strict';

import FoodModel from '../models/m-shop'
import BaseCompoent from './base-componet'

/**
 * 商品类
 */
class Shop extends BaseCompoent {
  constructor() {
    super()
  }
  //获取商铺列表
  async getList(req, res, next) {
    const {
      latitude,
      longitude,
      offset = 0,
      limit = 20
    } = req.query;

  }
}

export default new Shop()
