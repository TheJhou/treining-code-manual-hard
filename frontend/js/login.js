document.getElementById("entrar").addEventListener("click", async function() {
    
    const usuarioInput = document.getElementById("usuario").value;
    const senhaInput = document.getElementById("senha").value;

    const resposta = await fetch("/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        usuarioInput: usuarioInput,
        senhaInput: senhaInput
    })
  });
  const dados = await resposta.json();
  if (resposta.ok) {
     window.location.href = "/home.html";
  } else {
    alert(dados.message);
  }

});