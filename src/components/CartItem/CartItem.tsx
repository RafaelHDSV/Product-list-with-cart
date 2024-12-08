import styles from './CartItem.module.scss'

interface ICartItemProps {
  cartInfo: { name: string; quantity: number }[]
  productInfo: { image: { thumbnail: string; mobile: string; tablet: string; desktop: string }; name: string; category: string; price: number }[]
}
export default function CartItem({ cartInfo, productInfo }: ICartItemProps) {
  return (
    <div>
      {cartInfo.map(cartItem => {
        const product = productInfo.find(product => product.name === cartItem.name)

        return (
          <div className={styles.cartItem}>
            <p className={styles.productName}>{cartItem.name}</p>

            <div className={styles.priceInfo}>
              <span className={styles.quantity}>{`${cartItem.quantity}x`}</span>
              <span className={styles.unitPrice}>{`@ $${product?.price.toFixed(2)}`}</span>
              <span className={styles.price}>{`$${(cartItem.quantity * (product?.price ?? 0)).toFixed(2)}`}</span>
            </div>

            <img className={styles.removeIcon} src='images/icon-remove-item.svg' alt='icon-remove-item.svg' />
          </div>
        )
      })}
    </div>
  )
}
