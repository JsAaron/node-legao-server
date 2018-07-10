'use strict';

import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
  address: String, //地址
  distance: { type: String, default: "" }, //距离
  location: { type: [Number], index: '2d' }, //坐标
  id: Number, //编号
  category: String, //分类
  image_path: { type: String, default: "" }, //图片地址
  latitude: Number, //维度
  longitude: Number, //经度
  name: { //商店名称
    type: String,
    required: true
  },
  //提示信息
  promotion_info: { type: String, default: "欢迎光临，用餐高峰请提前下单，谢谢" }
});

//二级索引，primary_key 主键
shopSchema.index({ id: 1 })

const Shop = mongoose.model('Shop', shopSchema);
console.log(1)
export default Shop
