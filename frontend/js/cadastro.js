document.getElementById("cadastrar").addEventListener("click", async function () {
    const usuarioInput = document.getElementById("usuario").value;
    const senhaInput = document.getElementById("senha").value;

    const resposta = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuarioInput: usuarioInput,
            senhaInput: senhaInput
        })
    });

    const dados = await resposta.json();
    if (resposta.ok) {
        window.location.href = "/Login.html";   // criou → manda logar
    } else {
        alert(dados.message);
    }
});