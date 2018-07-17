/**
 * 食品分类
 */
'use strict'

import BaseCompoent from '../base-componet'

class Category extends BaseCompoent{

    constructor(){
        super()
    }
    
	/**
     * 获取所有餐馆分类和数量
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
	async getCategories(req, res, next){
        console.log(123)
		// try{
		// 	const categories = await CategoryModel.find({}, '-_id');
		// 	res.send(categories);
		// }catch(err){
		// 	console.log('获取categories失败');
		// 	res.send({
		// 		status: 0,
		// 		type: 'ERROR_DATA',
		// 		message: '获取categories失败'
		// 	})
		// }
	}

}

export default new Category()