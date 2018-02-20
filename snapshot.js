var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

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
  OwnerIds: ['948449127817']
};

ec2.describeSnapshots(params, function (err, data) {
  var obj = [];
  if (err) {
    console.log(err, err.stack);
  } else {
    for (var i = 0; i < data.Snapshots.length; i++) {
      obj.push(data.Snapshots[i].SnapshotId); //+ ' - ' + data.Snapshots[i].StartTime);           
    }
  }

  var now = new Date();
  now.setDate(now.getDate() - 5);

  console.log('Apagando Snapshots.')
  for (i = 0; i < obj.length; i++) {
    var params = {
      SnapshotId: obj[i]
    };
    if (data.Snapshots[i].StartTime > now) {
      console.log(data.Snapshots[i].StartTime);
      ec2.deleteSnapshot(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log('Snapshots apagados com sucesso: ' + params.SnapshotId + ' ' + dataAtualFormatada() + '.');           // successful response
      });
    }
  }

});

var describe = {};
ec2.describeVolumes(describe, function (err, data) {
  var obj = [];
  if (err) {
    console.log(err, err.stack);
  } else {
    for (var i = 0; i < data.Volumes.length; i++) {
      obj.push(data.Volumes[i].VolumeId)
    }
  }


  //console.log(obj)
  console.log('Criando Snapshots.')
  for (i = 0; i < obj.length; i++) {
    var params = {
      VolumeId: obj[i],
      Description: "Meu Snapshot " + obj[i] + " " + dataAtualFormatada() + "."
    };
    ec2.createSnapshot(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data.Description + ' - ' + data.State);           // successful response
    })
  }

});