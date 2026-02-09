import { useState } from 'react'
import styles from './App.module.scss'
import Cart from './components/Cart/Cart'
import { Modal } from './components/Modal/Modal'
import Product from './components/Product/Product'
import data from './data/data.json'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <h2>Confirmação</h2>
        <p>Deseja finalizar o pedido?</p>

        <button onClick={handleCloseModal}>Fechar</button>
      </Modal>

      <Main handleOpenModal={handleOpenModal} />
    </>
  )
}

function Main({ handleOpenModal }: { handleOpenModal: () => void }) {
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

        <Cart cart={cart} setCart={setCart} handleOpenModal={handleOpenModal} />
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
