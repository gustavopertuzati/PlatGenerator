async function handleSubmit () {
    let email = document.getElementById("id_mail").value;
    let pwd = document.getElementById("id_password").value;
    
    const reponse = await("http://127.0.0.1:8080/login/" , {
        method: 'POST',
        body: JSON.stringify({email, pwd})
    })

    const { jwt_token } = await reponse.json();
    
}