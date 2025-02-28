document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger-menu");
    const navMenu = document.querySelector(".resp-nav");

    burger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        burger.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://67bee5c7b2320ee05011d70b.mockapi.io/products")
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.querySelector(".products");

        data.slice(0, 3).forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <a href="#">
                        <div class="image-wrapper">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <h3>${product.name}</h3>
                        <span class="price">$${product.price}</span>
                    </a>
                </div>
            `;

            productsContainer.innerHTML += productHTML;
        });
    })
    .catch(error => console.error("error:", error));

});


document.addEventListener("DOMContentLoaded", () => {
    fetch("https://67bee5c7b2320ee05011d70b.mockapi.io/products")
    .then(response => response.json())
    .then(data => {
        const bagsContainer = document.querySelector(".bags");

        data.forEach(product => {
            const productHTML = `
                <div class="second-product-card">
                    <a href="#">
                        <div class="image-wrapper">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <h3>${product.name}</h3>
                        <span class="price">$${product.price}</span>
                    </a>
                </div>
            `;

            bagsContainer.innerHTML += productHTML;
        });
    })
    .catch(error => console.error("error:", error));
});




