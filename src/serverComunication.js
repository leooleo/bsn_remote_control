const request = require('request')
const serverUrl = 'https://bsnapi.herokuapp.com/'

function pingServer(port) {
    var url = serverUrl + 'bsnRegister'

    request.post(
        url,        
        {json: {'port': port}}
        ,
        function (error, response, body) {
            if (!error && response.statusCode == 200 && response.body == 'ok') {
                console.log('Registered succesfully to server')
            }
            else { 
                console.log(body)
                console.log(response.statusCode)
                console.log('Could not register to server. Trying again in 5 seconds...')
                setInterval(pingServer, 5000)
            }
        }
    );
}

module.exports.pingServer = pingServer