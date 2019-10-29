const express = require('express')
const port = process.env.port || 3000
const serverComunication = require('./src/serverComunication')
const { spawn } = require('child_process');
const app = express()

bsnRunning = false

app.get('/', function (req, res) {    
    res.send('ok');
});

app.get('/start', function (req, res) {    
    if(childs.length >= 1) {
        res.send('already running')
    }
    else {
        var ls = spawn('bash', ['../run.sh']);
        childs.push(ls)
        console.log(childs.length)
        res.send('started');
    }
    
});

app.get('/stop', function (req, res) {   
    if(bsnRunning == false) {
        res.send('bsn is not running');    
    } 
    else {
        var ls = await spawn('pkill', ['-f', 'ros']);
        ls.
        res.send('stopped');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
serverComunication.pingServer(port)