import Cities from '../models/cities'

/**
 * 城市控制器
 */
import AddressComponent from '../addressComponent'

class CityController extends AddressComponent {
    constructor() {
        super()
    }
    async getCity(req, res, next) {
        const type = req.query.type;
        let cityInfo
        //热门城市
        if (type === 'hot') {
            cityInfo = await Cities.cityHot();
        }
        res.send(cityInfo);
    }
}


export default CityController
