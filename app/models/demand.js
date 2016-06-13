var mongoose = require('mongoose');
var DemandSchema = require('../schemas/demand');
//生成模型
var Demand = mongoose.model('Demand', DemandSchema);

module.exports = Demand