var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
var shell = require('shelljs');
var email = require('./email');
var describe = {
};
var exports = module.exports = {};

exports.imprimir = function(callback) {

        ec2.describeVolumes(describe, function (err, data) {
                if (err) {
                        print(err, err.stack);
                } else {
                        var texto = ''
                        for (var i = 0; i < data.Volumes.length; i++) {
                                texto += data.Volumes[i].VolumeId + '<br>';
                        }

                        if (callback)
                        callback(texto);
                }
        });
}

// ec2.describeVolumes(describe, function(err, data) {
//         if (err){ 
//                 console.log(err, err.stack);
//         }else {
//                 for(var i = 0; i < data.Volumes.length; i++){
//                         console.log(data.Volumes[i].VolumeId);
//                 }
//         }
// });

return exports;