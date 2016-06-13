var mongoose = require('mongoose');

var DemandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: String,
	num: String,
	description: String,
	datefrom: String,
	dateto: String,	
	meta: {
		createAt: {
			type: Date,
			defualt: Date.now()
		},
		updateAt: {
			type: Date,
			defualt: Date.now()
		}
	},
	user: String
});

//对save方法做预处理
DemandSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

DemandSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

module.exports = DemandSchema