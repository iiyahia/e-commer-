
let cart = [];
let cartCount = document.getElementById("cartCount");
let cartItems = document.getElementById("cartItems");
let totalPriceElem = document.getElementById("totalPrice");




window.addEventListener('load', function () {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, 0);
  }
});


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let productName = this.getAttribute("data-name");
        let productPrice = parseFloat(this.getAttribute("data-price"));
        let productImg = this.getAttribute("data-img");

        let product = {
            name: productName,
            price: productPrice,
            img: productImg
        };

        cart.push(product);
        updateCart();
    });
});


function updateCart() {
   
    cartCount.innerText = cart.length;


    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.img}" alt="${product.name}" width="50" height="50">
                <span>${product.name}</span>
                <span>${product.price} $</span>
            </div>
        `;
        total += product.price;
    });

    
    totalPriceElem.innerText = `Total: ${total} $`;
}


document.getElementById("confirmOrderBtn").AddEventListener("click", function() {
    alert(` Order confirmed! Total: ${totalPriceElem.innerText}`);
    cart = []; 
    updateCart(); 
    document.querySelector('[data-bs-dismiss="modal"]').click(); 
});


  const confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
  confirmedOrders.push({
    items: cart,
    total: cart.reduce((sum, p) => sum + p.price, 0),
    date: new Date().toLocaleString()
  });

  localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));

  alert("✅ Order delivered!");

  cart = [];
  updateCart();

  const modal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
  modal.hide();


  function confirmOrder() {
    if (cart.length === 0) {
      alert("The cart is empty.");
      return;
    }
  
    const confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    confirmedOrders.push({
      items: cart,
      total: cart.reduce((sum, p) => sum + p.price, 0),
      date: new Date().toLocaleString()
    });
  
    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));
  
    
    cart = [];
    updateCart();
  
    
    const modal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
    modal.hide();
  
    
    const toastEl = document.getElementById('orderSuccess');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
  console.log(JSON.parse(localStorage.getItem("confirmedOrders")));  


  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items-container');
  
function addToCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // الحصول على السلة من localStorage أو إنشاء سلة فارغة إذا لم تكن موجودة
  let product = { id: productId, name: productName, price: productPrice };

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));  // حفظ السلة في localStorage
}

  }




  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      const img = this.getAttribute("data-img");

      cart.push({ name, price, img });
      updateCart();
    });
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "d-flex align-items-center justify-content-between border-bottom py-2";
      div.innerHTML = `
        <img src="${item.img}" width="100" class="me-2">
        <div class="flex-grow-1">
          <strong>${item.name}</strong><br>
          <small>${item.price} $</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
      `;
      cartItems.appendChild(div);
      total += item.price;
    });

    totalPriceElem.innerText = `Total: ${total} $`;
    cartCount.innerText = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  document.getElementById("confirmOrderBtn").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    const confirmedOrders = JSON.parse(localStorage.getItem("confirmedOrders")) || [];
    confirmedOrders.push({
      items: cart,
      total: cart.reduce((sum, p) => sum + p.price, 0),
      date: new Date().toLocaleString()
    });

    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));

    cart = [];
    updateCart();

    const modal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
    modal.hide();

    const toastEl = document.getElementById("orderSuccess");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  });

  updateCart();

 
