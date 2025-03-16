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
      .then((response) => response.json())
      .then((data) => {
        const productsContainer = document.querySelector(".products");
  
        data.slice(0, 3).forEach((product) => {
          const productHTML = `
          <a href="product.html?id=${product.id}" class="second-product-card">
                  <div class="product-card">
                          <div class="image-wrapper">
                              <img src="${product.image}" alt="${product.name}">
                          </div>
                          <h3>${product.name}</h3>
                          <span class="price">$${product.price}</span>
                  </div>
                  </a>
              `;
  
          productsContainer.innerHTML += productHTML;
        });
      })
      .catch((error) => console.error("error:", error));
  });

  document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.querySelector(".byPrice");
    const bagsContainer = document.querySelector(".bags");
  
    if (!bagsContainer) {
      console.error("ცარიელია");
      return;
    }
  
    setTimeout(() => {
      let originalOrder = Array.from(bagsContainer.children);
  
      if (originalOrder.length === 0) {
        console.error("არ არის პროდუქტები");
        return;
      }
  
      originalOrder = originalOrder.map((el) => el.cloneNode(true));
  
      sortSelect.addEventListener("change", () => {
        if (originalOrder.length === 0) {
          console.error("შეცდომა");
          return;
        }
  
        bagsContainer.innerHTML = "";
  
        if (sortSelect.value === "recommended") {
          originalOrder.forEach((product) =>
            bagsContainer.appendChild(product.cloneNode(true))
          );
        } else {
          let sortedProducts = bubbleSort([...originalOrder], sortSelect.value);
          sortedProducts.forEach((product) =>
            bagsContainer.appendChild(product.cloneNode(true))
          );
        }
      });
  
      function bubbleSort(arr, order) {
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            let priceA = parseFloat(
              arr[j].querySelector(".price")?.textContent.replace("$", "") || 0
            );
            let priceB = parseFloat(
              arr[j + 1].querySelector(".price")?.textContent.replace("$", "") ||
                0
            );
  
            if (
              (order === "priceLtH" && priceA > priceB) ||
              (order === "priceHtL" && priceA < priceB)
            ) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
        return arr;
      }
    }, 500);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const priceRange = document.getElementById("priceRange");
    const maxPrice = document.getElementById("maxPrice");
    const bagsContainer = document.querySelector(".bags");
    const sortSelect = document.querySelector(".byPrice");

    let products = [];

    if (!priceRange || !bagsContainer || !sortSelect) {
        console.error("error", error);
        return;
    }

    fetch("https://67bee5c7b2320ee05011d70b.mockapi.io/products")
        .then((response) => response.json())
        .then((data) => {
            products = data;
            updateProducts();
        })
        .catch(error => console.error("error:", error));

    function updateProducts() {
        bagsContainer.innerHTML = "";

        let filteredProducts = products.filter(product => product.price <= priceRange.value);

        if (sortSelect.value === "priceLtH") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortSelect.value === "priceHtL") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        filteredProducts.forEach((product) => {
            const productHTML = `
                <a href="product.html?id=${product.id}" class="second-product-card">
                <div class="image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <span class="price">$${product.price}</span>
            </a>
            `;
            bagsContainer.innerHTML += productHTML;
        });
    }

    priceRange.addEventListener("input", () => {
        maxPrice.textContent = `$${priceRange.value}`;
        updateProducts();
    });

    sortSelect.addEventListener("change", () => {
        updateProducts();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute('href'));

    window.scrollTo({
      top: targetElement.offsetTop - 200,
      behavior: 'smooth'
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".addedProducts");
    const purchDiv = document.querySelector(".purch");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty</h2>";
        purchDiv.innerHTML = "<p>Total: $0.00</p>";
        return;
    }

    cartContainer.innerHTML = ""; 

    cart.forEach(product => {
        const productHTML = `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-info">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <button class="remove" data-id="${product.id}">Remove</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
    });

    const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    purchDiv.innerHTML = `<p>Total: $${totalPrice.toFixed(2)}</p>`;

    const checkoutButton = `
        <button class="checkout">Proceed to Checkout</button>
    `;
    purchDiv.innerHTML += checkoutButton;

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (e) => {
            let productId = e.target.dataset.id;

            cart = cart.filter(item => item.id.toString() !== productId.toString());

            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
});

document.getElementById("shopBtn").addEventListener("click", function(){
  window.location.href = "shop.html"
});

document.getElementById("secShopBtn").addEventListener("click", function(){
  window.location.href = "shop.html"
});

document.querySelector('.fa-chevron-down').addEventListener('click', function() {
  const targetSection = document.querySelector('.new-arr');
  const offsetTop = targetSection.offsetTop - 230;
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#search-input");
  const productsContainer = document.querySelector("#products-container");

  searchInput.addEventListener("focus", () => {
    fetch("https://67bee5c7b2320ee05011d70b.mockapi.io/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);

        const filteredProducts = data.filter((product) => {
          console.log("ID:", product.id);
          return [1, 4, 9, 12].includes(Number(product.id));
        });

        console.log("filtred products:", filteredProducts);

        if (filteredProducts.length === 0) {
          productsContainer.innerHTML = "<p>No product found</p>";
        } else {
          productsContainer.innerHTML = "";

          filteredProducts.forEach((product) => {
            const productHTML = `
              <a href="product.html?id=${product.id}" class="second-product-card">
                <div class="product-card">
                  <div class="image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <h3>${product.name}</h3>
                  <span class="price">$${product.price}</span>
                </div>
              </a>
            `;
            productsContainer.innerHTML += productHTML;
          });
        }

        productsContainer.style.display = "block";
      })
      .catch((error) => {
        console.error("error:", error);
        productsContainer.innerHTML = "<p>error</p>";
      });
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      productsContainer.style.display = "none";
    }, 200);
  });
});
});


