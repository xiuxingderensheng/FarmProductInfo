var mongoose = require('mongoose');
var NewsSchema = require('../schemas/news');
//生成模型
var News = mongoose.model('News', NewsSchema);

module.exports = News