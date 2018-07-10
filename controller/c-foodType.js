'use strict';

import FoodModel from '../models/m-foodType'

class FoodType {
    constructor() {}
    async getType(req, res, next) {
        const types = await FoodModel.find({}, '-_id');
        res.send(types);
    }
}

export default new FoodType()
