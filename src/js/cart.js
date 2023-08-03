const productCard = document.querySelectorAll('.product-card');
const productBtnAdd = document.querySelectorAll('.product-card__btn-add');
const freeCart = document.querySelector('#freeCart');
const clearCart = document.querySelector('#clearCart');

let cart = [];

window.addEventListener('storage', () => {});

//Оновлення данних кількості товару у кошику
const updateCartCounter = counter => {
  document.querySelector('#productsCount').textContent = counter;
  if (counter === 0) {
    freeCart.classList.remove('d-none');
    clearCart.classList.add('d-none');
  } else {
    freeCart.classList.add('d-none');
    clearCart.classList.remove('d-none');
  }
};

//Оновлення данних суми товару у кошику
const updateCartValue = cart => {
  const cartCost = cart.reduce((acc, product) => acc + Number(product.cost), 0);
  document.querySelector('#productsCost').textContent = cartCost;
};

//Оновлення статусу кнопки ("У кошик" або "Додано у кошик")
const setBtnAddCart = (product, isClearCart) => {
  const productBtnAdd = product.querySelector('.product-card__btn-add');
  if (!isClearCart) {
    productBtnAdd.classList.remove('product-card__btn-add_active');
    productBtnAdd.textContent = 'У кошик';
    return;
  }
  if (productBtnAdd.classList.contains('product-card__btn-add_active')) {
    productBtnAdd.classList.remove('product-card__btn-add_active');
    productBtnAdd.textContent = 'У кошик';
    return;
  }
  productBtnAdd.classList.add('product-card__btn-add_active');
  productBtnAdd.textContent = 'Додано у кошик';
};

//Оновлення данних кошика та стану кнопок
const updateDataBtnCart = () => {
  updateCartCounter(cart.length);
  updateCartValue(cart);
  productCard.forEach((product, index) => {
    const productId = product.dataset.goodsId;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]?.id === productId) setBtnAddCart(product, true);
    }
    if (cart.length <= 0) {
      setBtnAddCart(product, false);
    }
  });
};

//Отримання данних cart із localeStorage
const getLocaleStorage = () => {
  cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null || cart.length === 0) cart = [];
  updateDataBtnCart();
};

getLocaleStorage();

//Встановлення данних cart у localeStorage
const setLocaleStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter(cart.length);
  updateCartValue(cart);
};

//Оновлення данних у массиві cart.
const setCart = product => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      //Видалення данних с массиву cart
      cart.splice(i, 1);
      setLocaleStorage();
      return;
    }
  }
  //Додавання данних с массив cart
  cart.push(product);
  setLocaleStorage();
};

//Отримання данних продукту на який було натиснуто "У кошик" і створення об'єкту з даними продукту.
const getClickedProduct = e => {
  const product = e.target.closest('.product-card');
  const productId = product.dataset.goodsId;
  const productName = product.querySelector('.product-card__name');
  const productCost = product.querySelector('.product-card__cost');
  const productData = {
    name: productName.textContent,
    cost: productCost.textContent,
    id: productId,
  };
  setCart(productData);
  setBtnAddCart(product, true);
};

//Подія натискання на кнопку "У кошик"
productBtnAdd.forEach(btn => {
  btn.addEventListener('click', getClickedProduct);
});

const clearCartLocalStorage = e => {
  e.preventDefault();
  localStorage.clear('cart');
  getLocaleStorage();
};

clearCart.addEventListener('click', clearCartLocalStorage);
