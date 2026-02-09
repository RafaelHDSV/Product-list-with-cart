import { useState } from 'react'
import styles from './App.module.scss'
import { EmptyCartIcon } from './assets/icons/EmptyCartIcon'
import CartItem from './components/CartItem/CartItem'
import Product from './components/Product/Product'
import data from './data/data.json'

export default function App() {
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([])

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

  const handleDeleteToCart = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName)
      return updatedCart
    })
  }

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.productContainer}>
          <h1>Desserts</h1>

          <div className={styles.productList}>
            {data.map((product) => {
              return (
                <Product
                  key={product.name}
                  data={product}
                  cart={cart.filter(
                    (productCart) => productCart.name === product.name
                  )}
                  onAddToCart={handleAddToCart}
                  onRemoveToCart={handleRemoveToCart}
                />
              )
            })}
          </div>
        </div>

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
      </div>

      {/* <div className={styles.attribution}>
        Challenge by <a href='https://www.frontendmentor.io?ref=challenge'>Frontend Mentor</a>. Coded by <a href='#'>Your Name Here</a>.
      </div> */}
    </div>
  )
}
