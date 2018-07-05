import mongoose from 'mongoose';


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


const Cities = mongoose.model('Cities', citySchema);
