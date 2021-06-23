const myHeader = new Headers({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
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
          data.sort(function(a,b){
            return b.note - a.note;
          });;
          data.forEach(element => {
            //création des éléments
            var sectionPP = document.createElement("section");
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
            var divRecipe = document.createElement("div");
            var href = document.createElement("a");

            //ajout attribut
            sectionPP.setAttribute("class", "premier_plan");
            divRecipe.setAttribute("class", "content");
            divSelect.setAttribute("class", "image");
            select.setAttribute("name", "choice");
            optionDefault.setAttribute("value", element.note);
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
          
            button.innerHTML = "Dislike";
            button.onclick = function () {
              disliked(userEmail, element.href);
              
            }
            select.onchange = function () {
              SetnewNote(userEmail, element.href, select.value);
            }
            select.style.background = 'black';

            optionDefault.innerHTML = element.note.toString();
            option1.innerHTML = "1";
            option2.innerHTML = "2";
            option3.innerHTML = "3";
            option4.innerHTML = "4";
            option5.innerHTML = "5";
            
            href.setAttribute("href", element.href);
            divRecipe.appendChild(href);
            href.innerHTML = "Lien vers la recette";
            
            divButton.appendChild(button);

            select.appendChild(optionDefault);
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
            select.appendChild(option4);
            select.appendChild(option5);
            divSelect.appendChild(select);

            sectionPP.appendChild(divSelect);
            sectionPP.appendChild(divRecipe);
            sectionPP.appendChild(divButton);
            sectionRecipe.appendChild(sectionPP);
            
          });        
        }
    ));
}

async function SetnewNote(userEmail, url, note){
  var bodySend = {
    "userEmail": userEmail,
    "href": url,
    "note": note
  }

  await fetch('http://localhost:8080/api/v1/topChoice/put/', {
    method: "PUT",
    headers : myHeader,
    body: JSON.stringify(bodySend),
  })
  .then(res => res.json())
  window.location.reload();
}

async function disliked (userEmail, url) {
  var bodySend = {
    "userEmail": userEmail,
    "href": url
  }

  await fetch('http://localhost:8080/api/v1/topChoice/delete/', {
    method: "DELETE",
    headers : myHeader,
    body: JSON.stringify(bodySend),
  })
  window.location.reload();
}