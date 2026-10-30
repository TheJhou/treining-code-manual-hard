function validarSenha(senha) {
    if(!senha) {
        return "senha é obrigatória";
    }
    if(senha.length < 6) {
        return "senha muito curta";
    } else if(senha.length > 20) {
        return "senha muito longa";
    } else if(!/[a-z]/.test(senha)) {
        return "senha deve conter pelo menos uma letra minúscula";
    } else if(!/[A-Z]/.test(senha)) {
        return "senha deve conter pelo menos uma letra maiúscula";
    } else if(!/\d/.test(senha)) {
        return "senha deve conter pelo menos um número";
    } else if(!/[^a-zA-Z0-9]/.test(senha)) {
        return "senha deve conter pelo menos um caractere especial";
    } else {
        return null;
    }
}

module.exports = validarSenha;