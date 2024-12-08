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

export default function Product({ data, cart, onAddToCart, onRemoveToCart }: IProductProps) {
  return (
    <div className={styles.product}>
      <img className={styles.productImage} src={data.image.desktop} alt={data.name} />

      {cart[0]?.quantity > 0 && cart[0]?.name === data.name ? (
        <div className={styles.updateCartButton}>
          <button className={styles.actionIconButton} onClick={() => onRemoveToCart(data.name)}>
            <img src='images/icon-decrement-quantity.svg' alt='icon-increment-quantity.svg' />
          </button>
          <span>{cart[0]?.quantity}</span>
          <button className={styles.actionIconButton} onClick={() => onAddToCart(data.name)}>
            <img src='images/icon-increment-quantity.svg' alt='icon-increment-quantity.svg' />
          </button>
        </div>
      ) : (
        <button className={styles.addCartButton} onClick={() => onAddToCart(data.name)}>
          <img src='images/icon-add-to-cart.svg' alt='icon-add-to-cart.svg' />
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
