import { EmptyCartIcon } from '../../assets/icons/EmptyCartIcon'
import data from '../../data/data.json'
import CartItem from '../CartItem/CartItem'
import styles from './Cart.module.scss'

interface ICartProps {
  cart: { name: string; quantity: number }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
  handleOpenModal?: () => void
  isResultDisplayed?: boolean
}

export default function Cart({
  cart,
  setCart,
  handleOpenModal,
  isResultDisplayed
}: ICartProps) {
  const totalItens = cart.reduce(
    (total, productCart) => total + productCart.quantity,
    0
  )

  if (isResultDisplayed) {
    return (
      <CartContent
        cart={cart}
        setCart={setCart}
        handleOpenModal={handleOpenModal}
        isResultDisplayed
      />
    )
  }

  return (
    <div className={styles.cart}>
      <h2>{`Your Cart (${totalItens})`}</h2>

      <CartContent
        cart={cart}
        setCart={setCart}
        handleOpenModal={handleOpenModal}
      />
    </div>
  )
}

function CartContent({
  cart,
  setCart,
  handleOpenModal,
  isResultDisplayed
}: ICartProps) {
  const hasItemsInCart = cart.length > 0

  if (!hasItemsInCart) {
    return (
      <div className={styles.cartEmpty}>
        <EmptyCartIcon />
        <span>Your added items will appear here</span>
      </div>
    )
  }

  return (
    <CartItem
      cartInfo={cart}
      productInfo={data}
      setCart={setCart}
      handleOpenModal={handleOpenModal}
      isResultDisplayed={isResultDisplayed}
    />
  )
}
