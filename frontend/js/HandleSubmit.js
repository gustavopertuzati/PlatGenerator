async function handleSubmit (event) {
    let email = document.getElementById('id_mail').value;
    let pwd = document.getElementById('id_password').value;
    
    response = await fetch('http://localhost:8080/api/login', {
        headers: {"Content-Type": "application/json"},
        method: 'POST',    
        body: JSON.stringify({email: email , pwd: pwd})
    })
}