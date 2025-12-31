import { Style, css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { globalCss } from '../styles/global'
import Footer from './Footer'
import Header from './Header'
import { ProfileCard } from './ProfileCard'

const mainCss = css`
  background-color: #1E1E1E;
  font-family: sans-serif
  color: white;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
`

const mainLeftCss = css`
  width: 100%;

  @media (min-width: 1024px) {
    width: 66.66667%;
  }
`

const mainRightCss = css`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;

  @media (min-width: 1024px) {
    width: 33.33333%;
  }
`

const Layout: FC = props => {
  const { children } = props
  return (
    <>
      <html>
        <head>
          <Style>{globalCss}</Style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <Header />
          <main className={mainCss}>
            <div className={mainLeftCss}>{children}</div>
            <div className={mainRightCss}>
              <ProfileCard />
            </div>
          </main>
          <Footer />
        </body>
      </html>
    </>
  )
}

export default Layout
