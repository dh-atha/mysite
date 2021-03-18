if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-outline-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
    alert("Thank you for your purchase");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var title = cartItems.querySelectorAll("cart-item-title").innerText;
    var varian = cartItems.querySelectorAll("varian").innerText;
    var link = "https://wa.me/6282213604539/?text=";
    var btnPurchase = document.querySelector(".btn-purchase");
    btnPurchase.href = "Halo saya mau pesan%0A" + title + varian;
    console.log(title);
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    var varian = document.getElementsByClassName("shop-item-variant")[0].value;
    if (varian == "default") {
        alert("Pilih Varian");
    } else {
        addItemToCart(title, price, imageSrc, varian);
        updateCartTotal();
    }
}

function addItemToCart(title, price, imageSrc, varian) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    cartRow.classList.add("row");
    cartRow.classList.add("justify-content-between");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart");
            return;
        }
    }
    var cartRowContents = `
                        <div class="cart-column cart-item col-4">
                            <img src="${imageSrc}" alt="item1" class="w-25" />
                            <span class="cart-item-title">${title}<br /><span class="varian">Varian: ${varian}</span></span>
                        </div>
                        <div class="cart-column cart-price col-3">${price}</div>
                        <div class="cart-column cart-quantity col-4">
                            <div class="input-group quantity-group me-2 d-flex w-sm-50">
                                <div class="input-group-prepend">
                                    <button class="btn btn-danger btn-minus btn-sm">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input class="form-control cart-quantity-input" min="1" name="quantity" value="1" type="number" disabled />
                                <div class="input-group-append">
                                    <button class="btn btn-success btn-plus btn-sm">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-outline-danger btn-sm remove-btn">REMOVE</button>
                        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-outline-danger")[0].addEventListener("click", removeCartItem);

    // Increase Decrease input value
    const increaseButton = cartRow.querySelectorAll(".btn-plus");
    increaseButton.forEach((e) => {
        const increaseButtonParent = e.parentElement.parentElement;
        const inputElement = increaseButtonParent.querySelector("input");
        e.addEventListener("click", function () {
            inputElement.stepUp(1);
            updateCartTotal();
        });
    });
    const decreaseButton = cartRow.querySelectorAll(".btn-minus");
    decreaseButton.forEach((e) => {
        const decreaseButtonParent = e.parentElement.parentElement;
        const inputElement = decreaseButtonParent.querySelector("input");
        e.addEventListener("click", function () {
            inputElement.stepDown(1);
            updateCartTotal();
        });
    });
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("Rp", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "Rp" + total + ".000,-";
}
