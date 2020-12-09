exports.home = (req, res) => {
    res.json({
        "Jak tam": "fine!"
    })
}

exports.greeting = (req, res) => {
    let greet = req.params.greet;
    let name = req.params.name;
    res.json({
        'greeting': greet + ' ' + name + '!',
    })
}