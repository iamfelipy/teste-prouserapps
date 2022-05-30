const stringify = require('csv-stringify');
const fs = require("fs");
   
// Read users.json file
fs.readFile("ips.json", function(err, data) {
      
    // Check for errors
    if (err) throw err;
   
    // Converting to JSON
    const todosIps = JSON.parse(data);
    let ipsNaCampanha = [];
    let ipsForaDaCampanha = [];
    
    let regexCampanha = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?) ENCONTRADO/;
    let regexForaDaCampanha = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?) NÃO ENCONTRADO/;
    let ipv4 = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

    todosIps.forEach(v => {
        const { jsonPayload: {message} } =  v;
        if(regexCampanha.test(message)) {
            ipsNaCampanha.push([ipv4.exec(message)[0]]);
        }else if (regexForaDaCampanha.test(message)){
            ipsForaDaCampanha.push([ipv4.exec(message)[0]]);
        }
    });  

    stringify.stringify(ipsNaCampanha, function(err, output) {
        fs.writeFile('ips-valid.csv', output, 'utf8', function(err) {
          if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
          } else {
            console.log('It\'s saved ips-valid!');
          }
        });
    });
    stringify.stringify(ipsForaDaCampanha, function(err, output) {
        fs.writeFile('ips-to-block.csv', output, 'utf8', function(err) {
          if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
          } else {
            console.log('It\'s saved ips-to-block!');
          }
        });
    });

    // verificação rapida
    // console.log("todosIps");
    // todosIps.slice(0,10).forEach(v => {
    //     const { jsonPayload: {message} } =  v;
    //     console.log(message);
    // });
    // console.log("ipsNaCampanha");
    // console.log(ipsNaCampanha.slice(0,10));
    // console.log("ipsForaDaCampanha");
    // console.log(ipsForaDaCampanha.slice(0,10));
});
