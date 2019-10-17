const app = require('express')();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let port = 8080;
app.use(session(
    {secret: 'mySecret'},
    {httpOnly: true},
    {secure: true}));

// app.use(cookieParser());

app.get('/setSession', (req, res) => {
    req.session.message = "hello";
    res.end('Session set')
});
app.get('/readSession', (req, res) => {
    res.json(req.session);
});






app.get('/' , function (req,res) {
    res.send('Main page !');
    res.end();
});

app.get('/login' , function (req,res) {
    res.sendFile(path.join(__dirname , './login.html'));
});

// app.get('/register' , function (req,res) {
//     res.sendFile(path.join(__dirname , './register.html'));
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));