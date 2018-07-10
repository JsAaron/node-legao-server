'use strict';

import mongoose from 'mongoose'
import typeData from '../data/foodType'

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    id: Number,
    is_in_serving: Boolean,
    description: String,
    title: String,
    link: String,
    image_url: String,
    icon_url: String,
    title_color: String
});

const foodType = mongoose.model('foodType', foodSchema)

foodType.findOne((err, data) => {
    if (!data) {
        for (let i = 0; i < typeData.length; i++) {
            foodType.create(typeData[i]);
        }
    }
})

export default foodType
