document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    // Verifica se estamos na página de login ou cadastro
    const isLoginPage = window.location.pathname.includes("login.html");
    const isRegisterPage = window.location.pathname.includes("cadastro.html");

    // Função de login
    if (isLoginPage) {
        form.addEventListener("submit", loginValidation);
    }

    // Função de cadastro
    if (isRegisterPage) {
        form.addEventListener("submit", registerValidation);
    }

    // Validação de login
    function loginValidation(event) {
        event.preventDefault(); // Impede o envio do formulário até a validação

        let username = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();

        // Reseta as mensagens
        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        // Valida se os campos foram preenchidos
        if (username === "" || password === "") {
            showError("Por favor, preencha todos os campos!");
            return;
        }

        // Recupera os usuários cadastrados do LocalStorage
        let users = JSON.parse(localStorage.getItem("users")) || {};

        // Verifica se o usuário existe
        if (!users[username]) {
            showError("Usuário não encontrado!");
            return;
        }

        // Verifica se a senha está correta
        if (users[username] !== password) {
            showError("Senha incorreta!");
            return;
        }

        // Exibe a mensagem de sucesso
        successMessage.style.display = "block";

        // Redireciona para a página de sucesso após 2 segundos
        setTimeout(function () {
            window.location.href = "index.html";  
        }, 2000);
    }

    // Validação de cadastro
    function registerValidation(event) {
        event.preventDefault(); // Impede o envio do formulário até a validação

        let username = document.getElementById("cadastro").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Reseta as mensagens
        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        // Valida se os campos foram preenchidos
        if (username === "" || password === "" || confirmPassword === "") {
            showError("Todos os campos são obrigatórios!");
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            showError("As senhas não coincidem!");
            return;
        }

        // Recupera os usuários cadastrados do LocalStorage
        let users = JSON.parse(localStorage.getItem("users")) || {};

        // Verifica se o nome de usuário já existe
        if (users[username]) {
            showError("Usuário já existe! Escolha outro.");
            return;
        }

        // Cadastra o novo usuário
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));

        // Exibe a mensagem de sucesso
        successMessage.style.display = "block";

        // Limpa os campos após o cadastro
        form.reset();

        // Oculta a mensagem de sucesso após 3 segundos
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    }

    // Função para exibir mensagens de erro
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
});
