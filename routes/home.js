import express from 'express'

const router = express.Router();

import fType from '../controller/c-foodType'
import shop from '../controller/c-shop'

//获取主页获取分类
router.use('/foodType', fType.getType);

//获取主页商铺列表
router.get('/shopList', shop.getList);

export default router
