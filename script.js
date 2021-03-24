window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    nav.classList.toggle("bg-dark", scrollY > 0);
});

let menu1 = document.querySelector("#menu1");
let menu2 = document.querySelector("#menu2");
let menu3 = document.querySelector("#menu3");
let menu = document.querySelector(".menu");
let menuLi = menu.querySelectorAll("li");

menuLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        li.classList.add("menuActive");
        for (let sibling of li.parentNode.children) {
            if (sibling != li) {
                sibling.classList.remove("menuActive");
            }
        }
        const { id } = e.target;
        if (id === "kripikkentang") {
            menu1.style.display = "flex";
            menu2.style.display = "none";
            menu3.style.display = "none";
        } else if (id === "stikkentang") {
            menu1.style.display = "none";
            menu2.style.display = "flex";
            menu3.style.display = "none";
        } else {
            menu1.style.display = "none";
            menu2.style.display = "none";
            menu3.style.display = "flex";
        }
    });
});
