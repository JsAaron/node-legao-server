'use strict';

import express from 'express';
const router = express.Router();
import Category from '../controller/shopping/category'

//食品详细页面，左边分类
router.get('/v2/restaurant/category', Category.getCategories);

export default router