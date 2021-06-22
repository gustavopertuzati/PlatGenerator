const fs = require('fs');

const filePath = "./modules/meals.json";

function getFavoriteMeals(userEmail, limit = 5){
    
    let rtn;
    let file = fs.readFileSync(filePath,'utf-8');
    let fileData = JSON.parse(file.toString());
    fileData['content'].forEach( element => {
        if(element.userEmail === userEmail){             
            rtn = JSON.stringify(element.likes);
        }
    });

    return rtn;
}

function postLikedMeal(userEmail, urlMeal, value){
    fs.readFile(filePath, 'utf-8', function(err, data){
        if(err) throw err;
        let fileData = JSON.parse(data);
        fileData['content'].forEach(element => {
            if(element.userEmail === userEmail){
                element.likes.push({href:urlMeal, note:value});
                fs.writeFile(filePath,JSON.stringify(fileData), (err) => {
                    if(err) throw err;
                });
                return true;
            }
        });
    })
}

function putLikedMeal(userEmail, urlMeal,newNote){
    let file = fs.readFileSync(filePath,'utf-8');
    let fileData = JSON.parse(file.toString());
    fileData['content'].forEach( element => {
        if(element.userEmail === userEmail){             
            element.likes.forEach(mealNote => {
               if(mealNote.href === urlMeal){
                    mealNote.note = newNote;
                    fs.writeFile(filePath,JSON.stringify(fileData), (err) => {
                        if(err) throw err;
                    });
                    return true;
                } 
            });
        }
    });
}

function deleteLikedMeal(userEmail, urlMeal){

    fs.readFile(filePath, 'utf-8', function(err, data){
        if(err) throw err;
        let fileData = JSON.parse(data);
        fileData['content'].forEach(element => {
            if(element.userEmail === userEmail){
                element.likes = element.likes.filter( (el) => el.href !== urlMeal);
                fs.writeFile(filePath,JSON.stringify(fileData), (err) => {
                    if(err) throw err;
                });
                return true;
            }
        });
    })
}
//postLikedMeal("test@hesge.ch","test2", 2);
module.exports = { getFavoriteMeals, postLikedMeal, putLikedMeal, deleteLikedMeal };