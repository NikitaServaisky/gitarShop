const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@\..+/, 'Please enter a valid email address'],
  },
  tel: {
    type: String,
    required: true,
    match: [/^\d{d}$/, 'Please enter a valid 10-digit phone number'],
  },
  password: {
    type: String,
    required: true,
  },
});

//Has the password before savingthe user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

//method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('user', UserSchema);
