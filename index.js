const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const {checkCredentials,data,convertToJavascriptObject} = require('./utlis/utilties')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



router.get("/", (req, res) => {
    res.send(`<h1> birds home page</h1>`)
})
router.get('/home', (req, res) => {
    res.render('home', {'title': `Welcome to ExpressJs Tutorial`})
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
    res.send(data);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:username&:password', (req, res) => {
    const userFromParameters =
        {
            username: convertToJavascriptObject(req.params.username),
            password: convertToJavascriptObject(req.params.password)
        };
    console.log(userFromParameters.username)
    const value = checkCredentials(userFromParameters)
    res.send(value)

});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:user', (req, res) => {

    const username = req.params.user.split("=").pop();
    res.send(`<b> ${username} successfully logout.<b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));