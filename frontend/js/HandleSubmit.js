async function handleSubmit () {
    let email = document.getElementById("id_mail").value;
    let pwd = document.getElementById("id_password").value;
    var send = {
        "email": email,
        "pwd":pwd
    }

    await fetch("http://127.0.0.1:8081/api/login", {
        method: "POST",
        body : JSON.stringify(send),
        origin : "trung envoie"
    }).then(function(res) { return res.json(); })
}