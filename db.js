const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
////username, password, salt, etc available due to passport-local-mongoose


const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('Account', UserSchema);    //created our model here




// DB config
const db_config = require('./config/keys').mongoURI;

mongoose.connect(db_config, {useNewUrlParser: true
                            ,useUnifiedTopology: true})
                .then(()=>{ console.log('MongoDB connected') })
                .catch(error => console.log(error));




// const conn = mongoose.createConnection('mongodb+srv://woo:January2011@mycluster-uk96g.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
//
//
//
// const Account = conn.model('Account', UserSchema)
//
// // const m = new MyModel;
// // m.save(); // works?
//
// UserSchema.plugin(passportLocalMongoose);
//
//
// //If you use multiple connections, you should make sure you export schemas, not models.
// module.exports = UserSchema
