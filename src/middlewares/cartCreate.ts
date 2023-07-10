import CartService from "../services/carts.services.js";

const cartService = new CartService();

export const createCart = async (req: any, res: any, next: any) => {
  if (!req.cookies.cartId) {
    const {
      result: { payload: cart },
    } = await cartService.addCart();
    res.cookie("cartId", cart._id, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 365 days
    req.session.cartId = cart._id.toString();
  } else {
    req.session.cartId = req.cookies.cartId;
  }
  req.session.save();
  next();
};
