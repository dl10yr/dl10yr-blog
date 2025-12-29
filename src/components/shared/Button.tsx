import { css } from 'hono/css'
import { FC } from 'hono/jsx'

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

const baseCss = css`
  border-radius: 9999px;
  font-weight: bold;
  color: white;
  background-color: green;
`

const smallCss = css`
  ${baseCss}
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.75rem;
`

const midCss = css`
  ${baseCss}
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-size: 0.875rem;
`

const largeCss = css`
  ${baseCss}
  padding-top: 0.75rem;
  padding-bottom: 0.75rem; /* py-3 */
  padding-left: 1.5rem; /* px-6 */
  padding-right: 1.5rem; /* px-6 */
  font-size: 1rem;
`

export const Button: FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const buttonCss = (function () {
    switch (size) {
      case 'small':
        return smallCss
      case 'medium':
        return midCss
      case 'large':
        return largeCss
      default:
        return ''
    }
  })()

  const notPrimaryButtonCss = css`
    ${buttonCss}
    color: #4B5563;
    background-color: transparent;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  `

  return primary ? (
    <div>
      <button type="button" className={buttonCss} {...props}>
        {label}
      </button>
    </div>
  ) : (
    <button type="button" className={notPrimaryButtonCss} style={{ backgroundColor }} {...props}>
      {label}
    </button>
  )
}
