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

document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.querySelector(".byPrice");
    const bagsContainer = document.querySelector(".bags");
    let originalOrder = Array.from(bagsContainer.children);

    sortSelect.addEventListener("change", () => {
        if (sortSelect.value === "recommended") {
            bagsContainer.innerHTML = originalOrder; 
            originalOrder.forEach(product => bagsContainer.appendChild(product));
        } else {
            let products = Array.from(bagsContainer.children)
            let sortedProducts = bubbleSort(products, sortSelect.value);
            
            bagsContainer.innerHTML = originalOrder;
            sortedProducts.forEach(product => bagsContainer.appendChild(product));
        }
    });

    function bubbleSort(arr, order) {
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                let priceA = parseFloat(arr[j].querySelector(".price").textContent.replace("$", ""));
                let priceB = parseFloat(arr[j + 1].querySelector(".price").textContent.replace("$", ""));

                if ((order === "priceLtH" && priceA > priceB) || (order === "priceHtL" && priceA < priceB)) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
});






