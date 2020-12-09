const http = require('http');
const express = require('express')

const app = express()
app.get('/', function(req, res) {
    res.json({
        'status': 'working'
    })
});


app.listen(3000, function() {
    console.log('Server working');
})