var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	sex: {
		type: String,
		enum: ['男', '女', '保密']
	},
	tel: Number,
	birthday: String,
	address: String,
	pictrue: String,
	introduction: String,
	role: {
		type: Number,
		default: 0
	},
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
UserSchema.pre('save', function(next) {
	var user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if (err) return cb(err);

			cb(null, isMatch);
		});
	}
}

UserSchema.statics = {
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

module.exports = UserSchema