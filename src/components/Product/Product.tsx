import { AddToCartIcon } from '../../assets/icons/AddToCartIcon'
import { DecrementIcon } from '../../assets/icons/DecrementIcon'
import { IncrementIcon } from '../../assets/icons/IncrementIcon'
import { IProductDataProps } from '../../interfaces'
import styles from './Product.module.scss'

interface IProductProps {
  data: IProductDataProps
  cart: { name: string; quantity: number }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
}

export default function Product({ data, cart, setCart }: IProductProps) {
  const hasProductInCart = cart[0]?.quantity > 0 && cart[0]?.name === data.name

  const handleAddToCart = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      if (!updatedCart.some((item) => item.name === productName)) {
        updatedCart.push({ name: productName, quantity: 1 })
      }
      return updatedCart
    })
  }

  const handleRemoveToCart = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
      return updatedCart
    })
  }

  return (
    <div className={styles.product}>
      <img
        className={`${styles.productImage} ${hasProductInCart ? styles.productInCart : ''}`}
        src={data.image.desktop}
        alt={data.name}
      />

      {hasProductInCart ? (
        <div className={styles.updateCartButton}>
          <button
            className={styles.actionIconButton}
            onClick={() => handleRemoveToCart(data.name)}
          >
            <DecrementIcon className={styles.icon} />
          </button>

          <span>{cart[0]?.quantity}</span>

          <button
            className={styles.actionIconButton}
            onClick={() => handleAddToCart(data.name)}
          >
            <IncrementIcon className={styles.icon} />
          </button>
        </div>
      ) : (
        <button
          className={styles.addCartButton}
          onClick={() => handleAddToCart(data.name)}
        >
          <AddToCartIcon />
          <span>Add to Cart</span>
        </button>
      )}

      <div className={styles.productInfo}>
        <span className={styles.category}>{data.category}</span>
        <span className={styles.name}>{data.name}</span>
        <span className={styles.price}>{`$${data.price.toFixed(2)}`}</span>
      </div>
    </div>
  )
}
