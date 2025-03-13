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
            document.getElementById("productDescription").textContent = product.description || "I'm a product description. This is a great place to sell your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy.";
            document.getElementById("productPrice").textContent = `$${product.price}`;
        })
        .catch(error => console.error("Error loading product:", error));
});