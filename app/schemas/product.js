var mongoose = require('mongoose');

var ProcuctSchema = new mongoose.Schema({
	productname: {
		type: String,
		required: true
	},
	type: String,
	num: Number,
	img: String,
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
	owner: {
		type: String,
		required: true
	}
});

//对save方法做预处理
ProcuctSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

ProcuctSchema.statics = {
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

module.exports = ProcuctSchema