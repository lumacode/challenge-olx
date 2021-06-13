const fs = require('fs');
const moment = require('moment');

const generateLog = (content) =>{

    const date = moment().format('YYYY-MM-DDTHH:mm');

    const file = fs.createWriteStream(`./logs/error.log`);
    fs.appendFile('./logs/error.log', `${date} - ${content}`, (err) => {
        if (err) throw err;
    });

}

module.exports = { generateLog }