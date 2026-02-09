import styles from './Button.module.scss'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...rest }: IButtonProps) {
  return (
    <button className={styles.primaryButton} {...rest}>
      {children}
    </button>
  )
}
