import { css } from 'hono/css'
import type { FC } from 'hono/jsx'

const navCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #065f46; /* bg-green-900 */
  padding: 1rem; /* p-4 */
  border-bottom-width: 4px; /* border-b-4 */
  border-bottom-color: #10b981;
  color: white;
`

const headerLeftCss = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const headerLeftSpanCss = css`
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  cursor: pointer;
`

const headerRightCss = css`
  width: 100%;
  display: flex;
  flex-grow: 1;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    width: auto;
  }
`

const headerRightLinksCss = css`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  color: white;

  @media (min-width: 1024px) {
    flex-grow: 1;
  }
`
const headerRightLinkCss = css`
  display: block;
  margin-top: 1rem;
  color: white;
  margin-right: 1rem;
  text-decoration: none;

  :hover {
    color: #edf2f7;
  }

  @media (min-width: 1024px) {
    display: inline-block;
    margin-top: 0;
  }
`

const Header: FC = () => {
  return (
    <>
      <nav className={navCss}>
        <div className={headerLeftCss}>
          <a
            href="/"
            className={css`
              text-decoration: none;
            `}
          >
            <span className={headerLeftSpanCss}>dl10yr</span>
          </a>
        </div>
        <div className={headerRightCss}>
          <div className={headerRightLinksCss}>
            <a href="/articles" className={headerRightLinkCss}>
              Article
            </a>
            <a href="/note" className={headerRightLinkCss}>
              Note
            </a>
            <a href="/blog" className={headerRightLinkCss}>
              Blog
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
