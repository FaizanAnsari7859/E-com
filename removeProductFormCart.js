import { getCartProductFromLS } from "./getCartProducts";
import { updateCartValue } from "./updateCartValue";
import { showToast } from "./showToast"
import { updateCartProductTotal } from "./updateCartProductTotal";


export const removeProductFormCart = (id) =>{
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);
 // update local storage after removing the item
localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));


    //remove the div onClick
    let removeDiv =document.getElementById(`card${id}`);
    if (removeDiv) {
        removeDiv.remove();
        //show toast whan product addeed to the cart
        showToast("delete", id);
    }

      // -----------------------------------------------------
  // calculating the card total in our cartProducts page
  // --------------------------------------------------------
  updateCartProductTotal();
    updateCartValue(cartProducts);

}