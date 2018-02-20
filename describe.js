var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
//var shell = require('shelljs');

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


var params = {
  OwnerIds: ['459992890540']
};

ec2.describeSnapshots(params, function (err, data) {
  var obj = [];
  if (err) {
    console.log(err, err.stack);
  } else {
    for (var i = 0; i < data.Snapshots.length; i++) {
      var recebeString = data.Snapshots[i].State;
      if (recebeString == "completed") {
        console.log("Snapshot gerado com sucesso!" + " - ID do Volume: " + data.Snapshots[i].VolumeId + ' - Descrição: ' + data.Snapshots[i].Description);
      } else {
        console.log("Verificar Status do Snapshot." + " - ID do Volume: " + data.Snapshots[i].VolumeId + ' - Descrição: ' + data.Snapshots[i].Description);
    
      } 
      // console.log(data.Snapshots[i].Description + ' - ' + data.Snapshots[i].State + ' - ' + data.Snapshots[i].StartTime);
    }
  }
  // function verificaString() {
  //   var recebeString = data.Snapshots[i].State;

  //   if (recebeString.toString == "completed") {
  //     console.log("Snapshot gerado com sucesso!");
  //   } else {
  //     console.log("Verificar Status do Snapshot." + " - " + data.Snapshots[i].Description );
  //   }
  // }
});
