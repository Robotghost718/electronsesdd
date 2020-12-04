// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const tableify = require('tableify')

serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  tableHTML = tableify(ports)
  document.getElementById('ports').innerHTML = tableHTML
})

var sp = new serialport('/dev/tty.usbserial-AK08TZHG', {
  baudRate: 115200,
});
function writeonSer(data){
  //Write the data to serial port.
  sp.write( data, function(err) {
      if (err) {
          return console.log('Error on write: ', err.message);
      }
      console.log('message written');
  });

}
document.getElementById('button').onclick = function(e){
  //send ctrl+c to serialport
  writeonSer('\x03');
}