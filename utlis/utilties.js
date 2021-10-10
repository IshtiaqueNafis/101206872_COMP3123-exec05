const fs = require('fs');
const pathResolver = require('path')

let rawData = fs.readFileSync(pathResolver.join(__dirname,'.././user.json'));
let data = JSON.parse(rawData);
console.log(data)

const convertToJavascriptObject = value => JSON.parse(value.split('=').pop());


const checkCredentials = (userParam) => {
    const userFile = data
    const checkObject = {status: false, message: ""}
    if (userParam.username === userFile.username && userParam.password === userFile.password) {
        checkObject.status = true;
        checkObject.message = "User Is valid"
    } else if (userParam.username !== userFile.username && userParam.password === userFile.password) {
        checkObject.message = "Username Is invalid"
    } else {
        checkObject.message = "Password is invalid"
    }
    return checkObject
}
module.exports = {checkCredentials,data,convertToJavascriptObject}