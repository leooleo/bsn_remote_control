const express = require('express')
const port = process.env.port || 8080
const serverComunication = require('./src/serverComunication')
const { spawn, exec } = require('child_process');
const sleep = require('system-sleep')
const cors = require('cors')
const app = express()

app.use(cors())

bsnRunning = false

commands = [
    ['../configurations/knowledge_repository/', 'roslaunch data_access.launch'],
    ['../configurations/system_manager/', 'roslaunch enactor.launch'],
    ['../configurations/logging_infrastructure/', 'roslaunch logger.launch'],
    ['../configurations/target_system/', 'roslaunch probe.launch'],
    ['../configurations/target_system/', 'roslaunch effector.launch'],
    ['../configurations/target_system/', 'roslaunch g4t1.launch'],
    ['../configurations/target_system/', 'roslaunch g3t1_1.launch'],
    ['../configurations/target_system/', 'roslaunch g3t1_2.launch'],
    ['../configurations/target_system/', 'roslaunch g3t1_3.launch'],
    ['../configurations/target_system/', 'roslaunch g3t1_4.launch'],
    ['../configurations/target_system/', 'roslaunch g3t1_5.launch'],
    ['../configurations/simulation/', 'roslaunch injector.launch'],
    ['../configurations/system_manager/', 'roslaunch engine.launch'],
]

app.get('/', function (req, res) {
    res.send('ok');
});

app.get('/start', function (req, res) {
    if (bsnRunning) {
        res.send('already running')
    }
    else {
        exec('roscore');
        sleep(5000)
        for (var i = 0; i < commands.length; i++) {

            // spawn('gnome-terminal', ['--working-directory=catkin_ws/src/bsn_ros/' + commands[i][0], '-e', commands[i][1]])
            exec(commands[i][1], { cwd: commands[i][0] })
            sleep(1000)
        }
        res.send('started');
        bsnRunning = true
    }

});

app.get('/stop', function (req, res) {
    if (bsnRunning == false) {
        res.send('bsn is not running');
    }
    else {
        var ls = spawn('pkill', ['-f', 'ros']);
        res.send('stopped');
        bsnRunning = false
    }
});

app.get('/isActive', function (req, res) {
    res.send(bsnRunning.toString())
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
serverComunication.pingServer(port)