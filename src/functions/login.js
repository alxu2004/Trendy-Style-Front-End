export     const loginF = () => {
    const frontBox = document.querySelector(".front-box");
    const formLogin = document.querySelector(".login");
    const formRegister = document.querySelector(".register");
    const backBoxLogin = document.querySelector(".back-box-login");
    const backBoxRegister = document.querySelector(".back-box-register");
    
        formRegister.style.display = "none";
        frontBox.style.left = "10px";
        formLogin.style.display = "block";
        backBoxRegister.style.opacity = "1";
        backBoxLogin.style.opacity = "0"; 
}
export const registerF = () => {
    const frontBox = document.querySelector(".front-box");
    const formLogin = document.querySelector(".login");
    const formRegister = document.querySelector(".register");
    const backBoxLogin = document.querySelector(".back-box-login");
    const backBoxRegister = document.querySelector(".back-box-register");

        formRegister.style.display = "block";
        frontBox.style.left = "410px";
        formLogin.style.display = "none";
        backBoxRegister.style.opacity = "0";
        backBoxLogin.style.opacity = "1";
}

  