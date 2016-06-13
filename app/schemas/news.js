var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
	type: String,
	title: {
		type: String,
		unique: true,
		required: true
	},
	content: String,
	author: String,
	meta: {
		createAt: {
			type: Date,
			defualt: Date.now()
		},
		updateAt: {
			type: Date,
			defualt: Date.now()
		}
	}
});

//对save方法做预处理
NewsSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

NewsSchema.statics = {
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

module.exports = NewsSchema