/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function showNavMobile()
{
  var x = document.getElementById('dropdown-content');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}
function notShowNavMobile() {

  var x = document.getElementById('dropdown-content');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  }
}

function changeHeaderCss() {
  let logOut = document.getElementsByClassName('logOut');
  let signUp = document.getElementsByClassName('signUp');
  let logIn = document.getElementsByClassName('logIn');

  if (localStorage.getItem('logOut') === "true") {
    logOut[0].style.display = 'flex'; logOut[1].style.display = 'flex';
    signUp[0].style.display = 'none'; signUp[1].style.display = 'none';
    logIn[0].style.display = 'none'; logIn[1].style.display = 'none';
  }
  else {
    logOut[0].style.display = 'none'; logOut[1].style.display = 'none';
    signUp[0].style.display = 'flex'; signUp[1].style.display = 'flex';
    logIn[0].style.display = 'flex'; logIn[1].style.display = 'flex';
  }
}

function changeHeader()
{
  if(localStorage.getItem('logOut') === "false"){
    localStorage.setItem('logOut', true);
  }
  else {
    localStorage.setItem('logOut', false);
  }
  window.location.href = '../index.html';
}

function setHeader()
{
  if(localStorage.length === 0){
    localStorage.setItem('logOut', false);
  }
}
