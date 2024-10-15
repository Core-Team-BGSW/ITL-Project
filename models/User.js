// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   }
//   // Add more fields as needed
// });

// // Hash the password before saving the user
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;


// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ensure that 'id' is unique
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


