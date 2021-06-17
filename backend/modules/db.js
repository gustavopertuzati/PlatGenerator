const fs = require('fs');

const filePath = "./modules/meals.json";

function getBestMeals(email, limit = 10){

    fs.readFile(filePath, function(err, data){
        if(err) throw err;
        let fileData = JSON.parse(data.toString());
        if(!Array.isArray(fileData[email])) {
            fileData[email] = [];
        }
        console.log(fileData[email]);
        /*var ids = Object.values(fileData)
            .flat()
            .reduce((acc, curr) => {
                acc[curr] ? acc[curr]++ : acc[curr] = 1
                return acc
            }, {});

        return Object.keys(ids)
            .sort()
            .map(key => ids[key]);
            */
    });

}

module.exports = { getBestMeals };