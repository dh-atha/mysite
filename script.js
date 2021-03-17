window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    nav.classList.toggle("bg-dark", scrollY > 0);
});
