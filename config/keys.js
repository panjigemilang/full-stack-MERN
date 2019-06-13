    // if (process.env.NODE_ENV === 'production') {
    //     module.exports = require('./keys_prod');
    // } else {
    //     module.exports = require('./keys_dev');
    // }

    // module.exports = require('./keys_dev');

    // const mongo = require('mongoose');
    // const uname = "panjigemilang";
    // const upass = "xtremesuper98";

    // module.exports = {
    //     mongoURI: mongo.connect("mongodb+srv://${user}:${pass}~@devconnector-vasnt.mongodb.net/test?retryWrites=true", {
    //         uri_decode_auth: true
    //     }, function (err, db) {

    //     })
    // }

    // const mongoURI = "mongodb+srv://panjigemilang:xtremesuper98@tmcluster-li9pg.mongodb.net/test?retryWrites=true";

    module.exports = {
        mongoURI: "mongodb+srv://panjigemilang:xtremesuper98@devconnector-vasnt.mongodb.net/test?retryWrites=true&w=majority",
        secretorKey: "secret"
    }