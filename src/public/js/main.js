const cartButton = document.querySelector("#cart-button");
SetCartID();

async function SetCartID() {
  try {
    if (!cartButton) return;
    const result = await fetch("/api/sessions/cart");
    const data = await result.json();
    if (!data.payload) return;
    const cartID = data.payload;
    cartButton.setAttribute("href", `/carts/${cartID}`);
  } catch (error) {
    console.log("Couldn't get cart ID");
  }
}