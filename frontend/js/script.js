
//Selectionne de la section pour les recettes
var sectionRecipe = document.getElementById('recipes');

//Url de l'API utilisé
const url = "https://recipepuppyproxy.herokuapp.com/api/?q=";

//TODO: rendre dynamique
const matrix = [["carrot", "tomato", "milk", "flour", "eggs"],
                ["beef", "chicken", "lamb", "pork"],
                ["vegetarian"],
                ["vegan"]];

//Récupération des ressources sur l'api
function fetchData(page, query){
  fetch(url + query + "&p=" + page)
    .then(
      function(res){
        console.log("La réponse renvoie le status: ", res.status);
        res.json().then(
          function(data){
            for(var i = 0; i < 3; i++){
              //Création des élements
              var sectionPP = document.createElement("section");
              var divImage = document.createElement("div");
              var image = document.createElement("img");
              var divRecipe = document.createElement("div");
              var recipeTitle = document.createElement("h2");
              var ulIngredients = document.createElement("ul");
              var href = document.createElement("a");

              //Ajout des attributs
              sectionPP.setAttribute("class", "premier_plan");
              divImage.setAttribute("class", "image");
              divRecipe.setAttribute("class", "content");
              href.setAttribute("href", data.results[i].href);

              //Ajout des noeuds pour l'image
              divImage.appendChild(image);
              sectionPP.appendChild(divImage);
              
              //Attribution d'une image à la recette
              if(data.results[i].thumbnail==""){
                image.setAttribute("src", "fig/unavailable.jpg");
              }else{
                image.setAttribute("src", data.results[i].thumbnail);
              }
              image.style.height = '500px';
              image.style.width = '500px';
              
              //Ajout des noeuds pour la recette
              divRecipe.appendChild(recipeTitle);
              
              //Ecriture de la réponse dans HTML
              recipeTitle.innerHTML = data.results[i].title;
              var ingredientArray = data.results[i].ingredients.split(", ");
              for(var i = 0; i < ingredientArray.length; i++){
                var item = document.createElement("li");
                ulIngredients.appendChild(item);
                item.innerHTML = ingredientArray[i];
              }

              divRecipe.appendChild(href);
              href.innerHTML = "Lien vers la recette";
              
              divRecipe.appendChild(ulIngredients);

              sectionPP.appendChild(divRecipe);
              sectionRecipe.appendChild(sectionPP);
            }
          }
        );
      }
    ).catch(
      function(err){
        console.log("Erreur de fetch: ", err);
      }
    );
}

function clearSection(section){
  while(section.firstChild){
    section.removeChild(section.firstChild);
  }
}

//choices: random = 0, carnivore = 1, vegetarien = 2, vegan = 3
function generateAction(choice){
  clearSection(sectionRecipe);
  for(var i = 0; i < 3; i++){
    //Recherche de recette dans une page aléatoire
    var page = Math.ceil(Math.random() * 10);
    var queryLines = Math.floor(Math.random() * 3);;
    if(choice !== 0) queryLines = choice;
    
  
    var numberQuery = matrix[queryLines].length;  
    var queryCol = Math.floor(Math.random() * numberQuery);
    
    var query = matrix[queryLines][queryCol];
    fetchData(page, query);
  }
}
