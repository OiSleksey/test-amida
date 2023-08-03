// // import './cart.js';

// console.log('index.js');

// const productBtnAdd = document.querySelectorAll('.product-card__btn-add');

// window.addEventListener('storage', () => {
//   console.log('storage');
// });

// //Оновлення статусу кнопки ("У кошик" або "Додано у кошик")
// const setBtnAddCart = product => {
//   // console.log(product);
//   const productBtnAdd = product.querySelector('.product-card__btn-add');
//   if (productBtnAdd.classList.contains('product-card__btn-add_active')) {
//     productBtnAdd.classList.remove('product-card__btn-add_active');
//     productBtnAdd.textContent = 'У кошик';
//     return;
//   }
//   productBtnAdd.classList.add('product-card__btn-add_active');
//   productBtnAdd.textContent = 'Додано у кошик';
// };

// export const updateProductBtn = () => {
//   productCard.forEach(product => {
//     const productId = product.dataset.goodsId;
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].id === productId) setBtnAddCart(product);
//     }
//   });
// };

// //Отримання данних продукту на який було натиснуто "У кошик" і створення об'єкту з даними продукту.
// const getClickedProduct = e => {
//   const product = e.target.closest('.product-card');
//   const productId = product.dataset.goodsId;
//   const productName = product.querySelector('.product-card__name');
//   const productCost = product.querySelector('.product-card__cost');
//   const productData = {
//     name: productName.textContent,
//     cost: productCost.textContent,
//     id: productId,
//   };
//   setCart(productData);
//   // console.log('getClickedProduct');
//   setBtnAddCart(product);
// };

// //Подія натискання на кнопку "У кошик"
// productBtnAdd.forEach(btn => {
//   btn.addEventListener('click', getClickedProduct);
// });
