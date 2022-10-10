const { model } = require('mongoose')
const { mealPlan } = require('../schemas')

const MealPlan = model('MealPlan', mealPlan)
                        
module.exports = MealPlan
