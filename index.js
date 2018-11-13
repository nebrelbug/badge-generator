let express = require('express');
let path = require('path');
let app = express();
var Sqrl = require('squirrelly')

let server = app.listen(8080, function () {
    console.log("listening to requests on port 8080");
});

Sqrl.defineHelper("returnColor", function (args, content, blocks) {
    var colorScheme = {
        brightgreen: "#4c1",
        green: "#97CA00",
        yellow: "#dfb317",
        yellowgreen: "#a4a61d",
        orange: "#fe7d37",
        red: "#e05d44",
        blue: "#007ec6",
        grey: "#555",
        gray: "#555",
        lightgrey: "#9f9f9f",
        lightgray: "#9f9f9f"
    }
    if (colorScheme.hasOwnProperty(args)) {
        console.log('That color is valid!')
        var result = colorScheme[args]
        console.log("Resulting Hex: " + result)
        return result
    } else {
        if (args) {
            return args
        } else {
            return "#4c1" // Default color of brightgreen
        }
    }
})

app.get('/:left/:right/:color', function (req, res) {
    var badge = Sqrl.renderFile(path.join(__dirname, 'template.svg'), req.params)
    res.writeHead(200, {
        "Content-Type": "image/svg+xml"
    })
    res.write(badge);
    res.end();
});