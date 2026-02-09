import { EmptyCartIcon } from '../../assets/icons/EmptyCartIcon'
import data from '../../data/data.json'
import CartItem from '../CartItem/CartItem'
import styles from './Cart.module.scss'

export default function Cart({
  cart,
  setCart
}: {
  cart: { name: string; quantity: number }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
}) {
  const handleDeleteToCart = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName)
      return updatedCart
    })
  }

  return (
    <div className={styles.cart}>
      <h2>{`Your Cart (${cart.reduce((total, productCart) => total + productCart.quantity, 0)})`}</h2>

      {!cart.length ? (
        <div className={styles.cartEmpty}>
          <EmptyCartIcon />
          <span>Your added items will appear here</span>
        </div>
      ) : (
        <CartItem
          cartInfo={cart}
          productInfo={data}
          onDeleteToCart={handleDeleteToCart}
        />
      )}
    </div>
  )
}
