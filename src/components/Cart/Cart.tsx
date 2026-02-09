import { EmptyCartIcon } from '../../assets/icons/EmptyCartIcon'
import data from '../../data/data.json'
import CartItem from '../CartItem/CartItem'
import styles from './Cart.module.scss'

interface ICartProps {
  cart: { name: string; quantity: number }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
}

export default function Cart({ cart, setCart }: ICartProps) {
  const hasItemsInCart = cart.length > 0
  const totalItens = cart.reduce(
    (total, productCart) => total + productCart.quantity,
    0
  )

  if (!hasItemsInCart) {
    return (
      <div className={styles.cart}>
        <div className={styles.cartEmpty}>
          <EmptyCartIcon />
          <span>Your added items will appear here</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <h2>{`Your Cart (${totalItens})`}</h2>

      <CartItem cartInfo={cart} productInfo={data} setCart={setCart} />
    </div>
  )
}
