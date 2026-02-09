import { AddToCartIcon } from '../../assets/icons/AddToCartIcon'
import { DecrementIcon } from '../../assets/icons/DecrementIcon'
import { IncrementIcon } from '../../assets/icons/IncrementIcon'
import styles from './Product.module.scss'

interface IProductDataProps {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string }
  name: string
  category: string
  price: number
}

interface IProductProps {
  data: IProductDataProps
  cart: { name: string; quantity: number }[]
  onAddToCart: (product: string) => void
  onRemoveToCart: (product: string) => void
}

export default function Product({
  data,
  cart,
  onAddToCart,
  onRemoveToCart
}: IProductProps) {
  const hasProductInCart = cart[0]?.quantity > 0 && cart[0]?.name === data.name

  return (
    <div className={styles.product}>
      <img
        className={`${styles.productImage}  ${hasProductInCart ? styles.productInCart : ''}`}
        src={data.image.desktop}
        alt={data.name}
      />

      {hasProductInCart ? (
        <div className={styles.updateCartButton}>
          <button
            className={styles.actionIconButton}
            onClick={() => onRemoveToCart(data.name)}
          >
            <DecrementIcon className={styles.icon} />
          </button>
          <span>{cart[0]?.quantity}</span>
          <button
            className={styles.actionIconButton}
            onClick={() => onAddToCart(data.name)}
          >
            <IncrementIcon className={styles.icon} />
          </button>
        </div>
      ) : (
        <button
          className={styles.addCartButton}
          onClick={() => onAddToCart(data.name)}
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
