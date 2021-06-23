
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
              var divButton = document.createElement("div");
              var button = document.createElement("button");
              var divSelect = document.createElement("div");
              var select = document.createElement("select");
              var optionDefault = document.createElement("option");
              var option1 = document.createElement("option");
              var option2 = document.createElement("option");
              var option3 = document.createElement("option");
              var option4 = document.createElement("option");
              var option5 = document.createElement("option");
              var href = document.createElement("a");

              //Ajout des attributs
              sectionPP.setAttribute("class", "premier_plan");
              divImage.setAttribute("class", "image");
              divRecipe.setAttribute("class", "content");
              divSelect.setAttribute("class", "image");
              select.setAttribute("name", "choice");
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

              optionDefault.setAttribute("value", "");
              optionDefault.setAttribute("class", "others");
              optionDefault.setAttribute("selected", "");
              option1.setAttribute("value", 1);
              option1.setAttribute("class", "others");
              option2.setAttribute("value", 2);
              option2.setAttribute("class", "others");
              option3.setAttribute("value", 3);
              option3.setAttribute("class", "others");
              option4.setAttribute("value", 4);
              option4.setAttribute("class", "others");
              option5.setAttribute("value", 5);
              option5.setAttribute("class", "others");
              divButton.setAttribute("class", "image");

              button.innerHTML = "Like";
              button.onclick = function () {
                liked(userEmail, data.results[i].href, select.value);
              }

              select.style.background = 'black';
              optionDefault.innerHTML = "Notez la recette!";
              option1.innerHTML = "1";
              option2.innerHTML = "2";
              option3.innerHTML = "3";
              option4.innerHTML = "4";
              option5.innerHTML = "5";

              divRecipe.appendChild(href);
              href.innerHTML = "Lien vers la recette";
              
              divRecipe.appendChild(ulIngredients);

              select.appendChild(optionDefault);
              select.appendChild(option1);
              select.appendChild(option2);
              select.appendChild(option3);
              select.appendChild(option4);
              select.appendChild(option5);
              divSelect.appendChild(select);

              sectionPP.appendChild(divRecipe);
              sectionPP.appendChild(divSelect);

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

async function liked (userEmail, url, value) {
  var bodySend = {
    "userEmail": userEmail,
    "href": url,
    "note": value
  }

  await fetch('http://localhost:8080/api/v1/topChoice/post/', {
    method: "POST",
    headers : myHeader,
    body: JSON.stringify(bodySend),
  })
  window.location.reload();
}