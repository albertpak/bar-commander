const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
	fullname: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	create: {
		type: Date,
		default: Date.now
	},
	admin: {
		type: Boolean,
		default: false
	},
	restaurants: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Restaurant'
	}
});

UserSchema.pre('save', async function () {
	try {
		const user = this,
			SALT_FACTOR = 5;

		if (!user.isModified('password')) return;

		const salt = await bcrypt.genSalt(SALT_FACTOR)

		const hash = await bcrypt.hash(user.password, salt, null)

		user.password = hash;

		return;

	} catch (error) {
		return Promise.reject(error);
	}

});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) { return cb(err); }

		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema);