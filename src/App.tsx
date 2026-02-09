import { useState } from 'react'
import styles from './App.module.scss'
import { SuccessIcon } from './assets/icons/SuccessIcon'
import Button from './components/Button/Button'
import Cart from './components/Cart/Cart'
import { Modal } from './components/Modal/Modal'
import Product from './components/Product/Product'
import data from './data/data.json'

export default function App() {
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([])
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
        <ModalContent cart={cart} onClose={handleCloseModal} />
      </Modal>

      <Main cart={cart} setCart={setCart} handleOpenModal={handleOpenModal} />
    </>
  )
}

function ModalContent({
  // cart,
  onClose
}: {
  cart: { name: string; quantity: number }[]
  onClose: () => void
}) {
  return (
    <div className={styles.modalContent}>
      <SuccessIcon className={styles.successIcon} />

      <h2>Order Confirmed</h2>
      <p>We hope you enjoy your food!</p>

      {/* {cart.length > 0 && (
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>

          <ul>
            {cart.map((product) => (
              <li key={product.name}>
                {product.quantity}x {product.name}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <Button onClick={onClose}>Start New Order</Button>
    </div>
  )
}

interface IMainProps {
  cart: { name: string; quantity: number }[]
  setCart: React.Dispatch<
    React.SetStateAction<{ name: string; quantity: number }[]>
  >
  handleOpenModal: () => void
}

function Main({ cart, setCart, handleOpenModal }: IMainProps) {
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
