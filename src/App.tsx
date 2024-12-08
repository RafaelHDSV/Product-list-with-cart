import { useState } from 'react'
import Product from './components/Product/Product'
import data from './data/data.json'
import styles from './App.module.scss'

export default function App() {
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([])

  const handleAddToCart = (productName: string) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.name === productName)
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingProductIndex].quantity += 1
        return updatedCart
      } else {
        return [...prevCart, { name: productName, quantity: 1 }]
      }
    })
  }

  console.log(cart)

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.productContainer}>
          <h1>Desserts</h1>

          <div className={styles.productList}>
            {data.map(product => {
              return (
                <Product key={product.name} data={product} cart={cart.filter(productCart => productCart.name === product.name)} onAddToCart={handleAddToCart} />
              )
            })}
          </div>
        </div>

        <div className={styles.cart}>
          <h2>{`Your Cart (${cart.length})`}</h2>

          {!cart.length && (
            <div className={styles.cartEmpty}>
              <img src='images/illustration-empty-cart.svg' alt='illustration-empty-cart.svg' />
              <span>Your added items will appear here</span>
            </div>
          )}

          {cart.map((product, index) => {
            return <span key={index}>{`${index} - ${product.name} (Quantity: ${product.quantity})`}</span>
          })}
        </div>
      </div>

      {/* <div className={styles.attribution}>
        Challenge by <a href='https://www.frontendmentor.io?ref=challenge'>Frontend Mentor</a>. Coded by <a href='#'>Your Name Here</a>.
      </div> */}
    </div>
  )
}
