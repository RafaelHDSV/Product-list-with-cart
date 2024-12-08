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
}

export default function Product({ data, cart, onAddToCart }: IProductProps) {
  console.log(cart)

  return (
    <div className={styles.product}>
      <img className={styles.productImage} src={data.image.desktop} alt={data.name} />
      <button className={styles.addCartButton} onClick={() => onAddToCart(data.name)}>
        <img src='images/icon-add-to-cart.svg' alt='icon-add-to-cart.svg' />

        {cart[0]?.quantity > 0 && cart[0]?.name === data.name ? <span>{`Added to Cart (${cart[0]?.quantity})`}</span> : <span>Add to Cart</span>}
      </button>

      <div className={styles.productInfo}>
        <span className={styles.category}>{data.category}</span>
        <span className={styles.name}>{data.name}</span>
        <span className={styles.price}>{`$${data.price.toFixed(2)}`}</span>
      </div>
    </div>
  )
}
