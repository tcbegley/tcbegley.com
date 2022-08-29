import styles from './icon.module.css'

export default function Icon({ d, size, label, style }) {
  return (
    <span className={styles.root} style={style} role="figure">
      <svg
        version="1.1"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} className={styles.icon} />
      </svg>
      {label && <span className={styles.label}>{label}</span>}
    </span>
  )
}

Icon.defaultProps = {
  size: '1em',
}
