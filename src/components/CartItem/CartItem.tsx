import { useMemo } from 'react'
import { CarbonNeutralIcon } from '../../assets/icons/CarbonNeutralIcon'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import styles from './CartItem.module.scss'

interface ICartItemProps {
  cartInfo: { name: string; quantity: number }[]
  productInfo: {
    image: {
      thumbnail: string
      mobile: string
      tablet: string
      desktop: string
    }
    name: string
    category: string
    price: number
  }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
}

export default function CartItem({
  cartInfo,
  productInfo,
  setCart
}: ICartItemProps) {
  const total = useMemo(() => {
    const totalPrice = cartInfo.reduce((total, cartItem) => {
      const product = productInfo.find(
        (product) => product.name === cartItem.name
      )
      return total + cartItem.quantity * (product?.price ?? 0)
    }, 0)

    return totalPrice.toFixed(2)
  }, [cartInfo, productInfo])

  return (
    <div>
      {cartInfo.map((cartItem) => (
        <CartItemCard
          cartItem={cartItem}
          setCart={setCart}
          productInfo={productInfo}
        />
      ))}

      <div className={styles.orderTotal}>
        <span className={styles.orderTotalLabel}>Order Total</span>
        <span className={styles.orderTotalValue}>{`$${total}`}</span>
      </div>

      <div className={styles.carbonNeutralInfo}>
        <CarbonNeutralIcon />
        <p>
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>

      <button className={styles.confirmOrderButton}>Confirm Order</button>
    </div>
  )
}

function CartItemCard({
  cartItem,
  setCart,
  productInfo
}: {
  cartItem: { name: string; quantity: number }
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
  productInfo: {
    image: {
      thumbnail: string
      mobile: string
      tablet: string
      desktop: string
    }
    name: string
    category: string
    price: number
  }[]
}) {
  const product = productInfo.find((product) => product.name === cartItem.name)
  const totalPrice = (cartItem.quantity * (product?.price ?? 0)).toFixed(2)

  const onDeleteToCart = (productName?: string) => {
    if (!productName) return

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName)
      return updatedCart
    })
  }

  return (
    <div className={styles.cartItem}>
      <p className={styles.productName}>{cartItem.name}</p>

      <div className={styles.priceInfo}>
        <span className={styles.quantity}>{`${cartItem.quantity}x`}</span>
        <span
          className={styles.unitPrice}
        >{`@ $${product?.price.toFixed(2)}`}</span>
        <span className={styles.price}>{`$${totalPrice}`}</span>
      </div>

      <button
        className={styles.removeIconButton}
        onClick={() => onDeleteToCart(product?.name)}
      >
        <CloseIcon className={styles.removeIcon} />
      </button>
    </div>
  )
}
