const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

//Selectionne de la section pour les recettes
var sectionRecipe = document.getElementById('recipes');

window.onload = function(){
    get(5);
};

async function get(limit)
{
    const userEmail = "test@hesge.ch";
    
    await fetch('http://localhost:8080/api/v1/topChoice/get/'+ userEmail + '/' + limit)
      .then( res => res.json().then( 
        data => {
          data = JSON.parse(data);
          data.forEach(element => {
            //création des éléments
            var sectionPP = document.createElement("section");
            var divRecipe = document.createElement("div");
            var href = document.createElement("a");

            //ajout attribut
            sectionPP.setAttribute("class", "premier_plan");
            divRecipe.setAttribute("class", "content");
            href.setAttribute("href", element.href);
            divRecipe.appendChild(href);
            href.innerHTML = "Lien vers la recette";
            
            sectionPP.appendChild(divRecipe);
            sectionRecipe.appendChild(sectionPP);
            
          });        
        }
    ));
}