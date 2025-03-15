document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        document.body.innerHTML = "<h1>Product not found</h1>";
        return;
    }

    fetch(`https://67bee5c7b2320ee05011d70b.mockapi.io/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("productImage").src = product.image;
            document.getElementById("productImage").alt = product.name;
            document.getElementById("productName").textContent = product.name;
            document.getElementById("productDescription").textContent = product.description || "I'm a product description. This is a great place to sell your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy";
            
            const priceElement = document.getElementById("productPrice");
            const quantityElement = document.getElementById("quantity");
            let quantity = 1;

            const updatePrice = () => {
                priceElement.textContent = `$${(product.price * quantity).toFixed(2)}`;
            };

            updatePrice();

            document.getElementById("increment").addEventListener("click", () => {
                quantity++;
                quantityElement.textContent = quantity;
                updatePrice();
            });

            document.getElementById("decrement").addEventListener("click", () => {
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                    updatePrice();
                }
            });
        })
        .catch(error => console.error("Error loading product:", error));
});
