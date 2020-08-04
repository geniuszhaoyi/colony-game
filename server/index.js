const express = require("express");
const path = require("path");

const app = express();

// // PWAs want HTTPS!
// function checkHttps(request, response, next) {
//     // Check the protocol — if http, redirect to https.
//     if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
//         return next();
//     } else {
//         response.redirect("https://" + request.hostname + request.url);
//     }
// }

// app.all("*", checkHttps);

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
    console.log("❇️ Received GET request to /api/ping");
    response.send("pong!");
});

const Ctrls = require('./controllers/index.ts');
Object.keys(Ctrls).forEach((key) => {
    if (Ctrls.hasOwnProperty(key) && key !== 'default') {
        const obj = Ctrls[key];
        const { method, cb } = obj;
        let api_path = obj.path;
        if (!api_path.startsWith('/api')) {
            api_path = path.join('/api', api_path).replace(/\\/g,"/");
        }
        app[method](api_path, cb);
    }
})

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
    port = process.env.PORT || 3000;
    app.use(express.static(path.join(__dirname, "../build")));
    app.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "../build", "index.html"), {root: __dirname});
    });
} else {
    port = 3001;
    console.log("⚠️ Not seeing your changes as you develop?");
    console.log(
        "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
    );
}

// Start the listener!
const listener = app.listen(port, () => {
    console.log("❇️ Express server is running on port", listener.address().port);
});
