fetch("https://enigmatic-mesa-96671.herokuapp.com/get-items/", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let products = data.data;

    localStorage.products = JSON.stringify(data.data);

    let container = document.querySelector(".container");
    container.innerHTML = "";

    products.forEach((product) => (container.innerHTML += createCard(product)));

    // console.log(item);
  });

//CREATING CARD

function createCard(product) {
  //   let cardContainer = document.querySelector(".project-card");
  //   card.forEach((product) => {
  // cardContainer.innerHTML += `
  return `
  <div class="project-card">
  <img src="${product[5]}" alt="Image of Contact Page" class="img" />
    <div>
      <h2 class="card-heading">${product[3]}</h2>
      <h3 class="card-subtitle">${product[1]}</h3>
      <p class="card-description">${product[4]}</p>

      <!--Buttons #1-->
      <div class="card-buttons">
        <button onclick="addToCart(${product[0]})" class="button">Add to cart</button>
        <button class="button">R${product[2]}</button>
      </div>
    </div>
  </div>
      `;
  //   });
}

// //ADDING TO CART
// console.log(JSON.parse(localStorage.getItem("products")));
// createCard(JSON.parse(localStorage.getItem("products")));

function addToCart(id) {
  fetch(`   https://enigmatic-mesa-96671.herokuapp.com/get-items/${id}/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      let product = data.data;
      let cartProducts =
        JSON.parse(localStorage.getItem("cart products")) || [];
      cartProducts.push(product);

      localStorage.setItem("cart products", JSON.stringify(cartProducts));
      showCartItems();
    });
}

function showCartItems() {
  let container = document.querySelector(".products-container");
  let cartProducts = JSON.parse(localStorage.getItem("cart products")) || [];

  container.innerHTML = "";
  cartProducts.forEach((item) => (container.innerHTML += createCart(item)));

  getTotal();
}

function createCart(cartItem) {
  return `
    <p>
    <a href="#">${cartItem[1]}</a>
    <span class="price">${cartItem[2]}</span>
    <span class="description">${cartItem[4]}</span>

    </p>`;
  // <img src="${cartItem[5]}" alt="">
}

function getTotal() {
  let total = 0;
  let total_element = document.querySelector(".total");
  let cartProducts = JSON.parse(localStorage.getItem("cart products")) || [];

  cartProducts.forEach((item) => (total += parseInt(item[2])));
  total_element.innerHTML = `R${total}`;
  console.log(total);
}

getTotal();
showCartItems();
