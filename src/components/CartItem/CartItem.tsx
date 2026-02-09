import { useMemo } from 'react'
import { CarbonNeutralIcon } from '../../assets/icons/CarbonNeutralIcon'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import data from '../../data/data.json'
import { IProductDataProps } from '../../interfaces'
import Button from '../Button/Button'
import styles from './CartItem.module.scss'

interface ICartItemProps {
  cartInfo: { name: string; quantity: number }[]
  productInfo: IProductDataProps[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
  handleOpenModal?: () => void
  isResultDisplayed?: boolean
}

export default function CartItem({
  cartInfo,
  productInfo,
  setCart,
  handleOpenModal,
  isResultDisplayed
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

  const cartInfoSorted = useMemo(() => {
    return [...cartInfo].sort((a, b) => a.name.localeCompare(b.name))
  }, [cartInfo])

  if (isResultDisplayed) {
    return (
      <div className={styles.resultCart}>
        {cartInfoSorted.map((cartItem) => (
          <CartItemCard
            cartItem={cartItem}
            setCart={setCart}
            productInfo={productInfo}
            isResultDisplayed={isResultDisplayed}
          />
        ))}

        <div className={styles.orderTotal}>
          <span className={styles.orderTotalLabel}>Order Total</span>
          <span className={styles.orderTotalValue}>{`$${total}`}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {cartInfoSorted.map((cartItem) => (
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

      <Button onClick={handleOpenModal}>Confirm Order</Button>
    </div>
  )
}

function CartItemCard({
  cartItem,
  setCart,
  productInfo,
  isResultDisplayed
}: {
  cartItem: { name: string; quantity: number }
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
  productInfo: IProductDataProps[]
  isResultDisplayed?: boolean
}) {
  const product = productInfo.find((product) => product.name === cartItem.name)
  const totalPrice = (cartItem.quantity * (product?.price ?? 0)).toFixed(2)
  const selectedProduct = data.find((product) => product.name === cartItem.name)

  const onDeleteToCart = (productName?: string) => {
    if (!productName) return

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName)
      return updatedCart
    })
  }

  if (isResultDisplayed) {
    return (
      <div className={styles.resultCartItem}>
        <div className={styles.productDetails}>
          <img
            className={styles.productImage}
            src={selectedProduct?.image.desktop}
            alt={selectedProduct?.name}
          />

          <div className={styles.productInfo}>
            <p className={styles.productName}>{cartItem.name}</p>

            <div className={styles.priceInfo}>
              <span className={styles.quantity}>{`${cartItem.quantity}x`}</span>
              <span
                className={styles.unitPrice}
              >{`@ $${product?.price.toFixed(2)}`}</span>
            </div>
          </div>
        </div>

        <span className={styles.price}>{`$${totalPrice}`}</span>
      </div>
    )
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
