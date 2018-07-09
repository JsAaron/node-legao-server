import express from 'express'

const router = express.Router();

import fType from '../controller/home/c-foodType'
import sList from '../controller/home/c-shopList'

//主页获取分类
router.use('/foodType', fType.getType);

// 商铺列表
router.use('/shopList', sList.getList);

export default router
