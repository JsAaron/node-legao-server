import mongoose from 'mongoose';
import cityData from '../data/cities'

const citySchema = new mongoose.Schema({
    data: {}
});

/**
 * 热门城市
 * @return {[type]} [description]
 */
citySchema.statics.cityHot = function() {
    return new Promise(async(resolve, reject) => {
        try {
            const city = await this.findOne();
            resolve(city.data.hotCities)
        } catch (err) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}


const citieModel = mongoose.model('Cities', citySchema);


// 查找是否有数据
// 如果不存在就导入
citieModel.findOne((err, data) => {
    if (!data) {
        citieModel.create({ data: cityData });
    }
});


export default citieModel
