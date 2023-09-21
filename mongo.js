const mongoose = require ("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/waterAndElectricity1")      //"mongodb://0.0.0.0:27017/getngo"
.then(() => {
    console.log("conneted to mongoose")
  }).catch((error) => {
    console.log("error in conneting to mongoose:- " + error);
  })
const userSchema = new mongoose.Schema({
    username: String,
    email: String,

    data: [{
        date: String,
        time: String,
        global_active_power: String,
        global_reactive_power: String,
        voltage: String,
        global_intensity: String,
        sub_metering_1: String,
        sub_metering_2: String,
        sub_metering_3: String,
    }]
  });
  const User = mongoose.model('WaterAndElectricity', userSchema);
  module.exports = User;