import React from 'react'

import { icon, labelClass, root } from './icon.module.css'

const Icon = ({ d, size, label, style }) => (
  <span className={root} style={style} role="figure">
    <svg
      version="1.1"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={d} className={icon} />
    </svg>
    {label && <span className={labelClass}>{label}</span>}
  </span>
)

Icon.defaultProps = {
  size: '1em',
}

export default Icon
