import products from "./API/products.json";
import { getCartProductFromLS } from "./getCartProducts";
import {fetchQuantityFromCartLS} from"./fetchQuantityFromCartLS";
import { removeProductFormCart } from "./removeProductFormCart";
import { incrementDecrement } from "./incrementDecrement";
import { updateCartValue } from "./updateCartValue";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);
// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent =
    lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
    lSActualData.price;


    //heandel increment and decrement button
    productClone.querySelector(".stockElement").addEventListener("click", (event) => {
      incrementDecrement(event, id, stock, price);
    });

    productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProductFormCart(id));

     cartElement.appendChild(productClone);
  });
};

// -----------------------------------------------------
// Showing the cartProducts
//--------------------------------------------------------
showCartProduct(); 
updateCartProductTotal();