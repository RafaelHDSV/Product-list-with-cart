import { useState } from 'react'
import styles from './App.module.scss'
import Cart from './components/Cart/Cart'
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

        <Cart cart={cart} setCart={setCart} />
      </div>

      <footer className={styles.attribution}>
        <p>
          Challenge by
          <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
            Frontend Mentor
          </a>
          .
        </p>
        <p>
          Coded by
          <a href='https://github.com/RafaelHDSV' target='_blank'>
            Rafael Henrique de Sousa Vieira
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
