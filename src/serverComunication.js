const request = require('request')
const serverUrl = 'http://192.168.5.105:8081'

function pingServer(port) {
    var url = serverUrl + '/bsnRegister'

    request.post(
        url,        
        {json: {'port': port}}
        ,
        function (error, response, body) {
            if (!error && response.statusCode == 200 && response.body == 'ok') {
                console.log('Registered succesfully to server')
            }
            else { 
                console.log('Could not register to server')
            }
        }
    );
}

module.exports.pingServer = pingServer