var mongoose = require('mongoose');
var ProductSchema = require('../schemas/product');
//生成模型
var Product = mongoose.model('Product', ProductSchema);

module.exports = Product