import { useState } from 'react'
import styles from './App.module.scss'
import Cart from './components/Cart/Cart'
import Product from './components/Product/Product'
import data from './data/data.json'

export default function App() {
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([])

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.productContainer}>
          <h1>Desserts</h1>

          <div className={styles.productList}>
            {data.map((product) => {
              const filteredCart = cart.filter(
                (productCart) => productCart.name === product.name
              )

              return (
                <Product
                  key={product.name}
                  data={product}
                  cart={filteredCart}
                  setCart={setCart}
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
