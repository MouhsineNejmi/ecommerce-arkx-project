/* eslint-disable react/prop-types */
import CartItem from './cart-item.component';

const CartItems = ({ cartItems }) => {
  return (
    <div className='p-2 px-4 grid gap-6'>
      {cartItems ? (
        cartItems.map((cartItem) => (
          <CartItem
            key={cartItem._id}
            product={cartItem.product}
            quantity={cartItem.quantity}
          />
        ))
      ) : (
        <h1>No Items in your cart</h1>
      )}
    </div>
  );
};

export default CartItems;
