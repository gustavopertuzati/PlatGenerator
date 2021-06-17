const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

window.onload = function(){
    update(10);
};

async function update(limit){
    let data;
    
    for(var i = 0; i < limit; i++){

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

