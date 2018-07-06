import express from 'express'

const router = express.Router();


import CityController from '../controller/home/cities'


const cityController = new CityController()


//相应home下的二级路由
router.get('/cities', cityController.getCity);



export default router
