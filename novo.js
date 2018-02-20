var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
var ec2 = new AWS.EC2({
    apiVersion: '2016-11-15'
});

function dataAtualFormatada() {
    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    var ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}

var now = new Date();
now.setDate(now.getDate() - 5);

var params = {
    OwnerIds: ['948449127817']
};
ec2.describeSnapshots(params, function (err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        for (var i = 0; i < data.Snapshots.length; i++) {

            // successful response
            if (data.Snapshots[i].StartTime > now) {
                console.log(data.Snapshots[i].StartTime);

            } else {
                console.log('Nada Encontrado')
            }
            //console.log(partesData);
            //var data = new Date(partesData[0], partesData[1], partesData[2]);
            //console.log(data);
        }
    }
});
