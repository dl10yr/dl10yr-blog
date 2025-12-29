import { css } from 'hono/css'
import { FC } from 'hono/jsx'

const WorkDetail: FC<{ innerHtml: string }> = ({ innerHtml }) => {
  return (
    <div
      className={css`
        width: 100%;
        color: white;
      `}
    >
      <article
        className={css`
          padding: 1.25rem;
        `}
      >
        <div
          className={css`
            color: white;
          `}
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        ></div>
      </article>
      <div
        className={css`
          margin: 0.5rem;
        `}
      >
        <h1>Support</h1>
        <a
          className={css`
            color: white;
          `}
          href="https://docs.google.com/forms/d/e/1FAIpQLSc7ZaKERZCEFYUIAlugnYXwuuS8dHoR3ytxDC2TyQOt1FCmqg/viewform?usp=sf_link"
        >
          Contact Me（Google Form）
        </a>
      </div>
    </div>
  )
}

export default WorkDetail
