document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger-menu");
    const navMenu = document.querySelector(".resp-nav");

    burger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        burger.classList.toggle("active");
    });
});
