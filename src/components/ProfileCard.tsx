import { css } from "hono/css"
import { FC } from "hono/jsx"

const profileCardCss = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #1A202C;
  border-radius: 0.25rem;
`
const linkCss = css`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  height: auto;
  margin: auto; 
  color: white;
  text-decoration: none;
`

export const ProfileCard: FC = () => {
  return (
    <div className={profileCardCss}>
      <a
        href="https://dl10yr.com/"
        className={linkCss}
        rel="me"
      >
        dl10yr
      </a>
    </div>
  )
}
