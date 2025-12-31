import { css } from 'hono/css'
import { FC } from 'hono/jsx'

const footerCss = css`
  background-color: #4a5568; /* bg-gray-700 */
  color: white; /* text-white */
  border-top: 1px solid #718096; /* border-t border-gray-500 */
  text-align: center; /* text-center */
  padding: 1.25rem;
`

const Footer: FC = () => {
  return (
    <footer className={footerCss}>
      <div>SourceCode on Github</div>
      <div>Copyright© dl10yr , 2024 All Rights Reserved.</div>
    </footer>
  )
}

export default Footer
