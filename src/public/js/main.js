const cartButton = document.querySelector("#cart-button");
SetCartID();

async function SetCartID() {
  try {
    const result = await fetch("/api/sessions/cart");
    const data = await result.json();
    const cartID = data.payload;
    cartButton.setAttribute("href", `/carts/${cartID}`);
  } catch (error) {
    console.log("Couldn't get cart ID");
  }
}