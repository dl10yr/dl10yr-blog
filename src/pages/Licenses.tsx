import { css } from 'hono/css'
import { FC } from 'hono/jsx'
// @ts-ignore
import licenses from '../../_works/screen-utsushi/licenses/licenses.json'

type License = {
  name: string
  version: string
  license: string
  url: string
  content: string
}

type LicensesData = {
  [language: string]: License[]
}

const Licenses: FC = () => {
  const data = licenses as LicensesData

  return (
    <div
      className={css`
        width: 100%;
        color: white;
        padding: 1.25rem;
        max-width: 800px;
        margin: 0 auto;
      `}
    >
      <h1
        className={css`
          font-size: 2rem;
          margin-bottom: 2rem;
        `}
      >
        Open Source Licenses
      </h1>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        {Object.values(data)
          .flat()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((lib, i) => (
            <details
              key={`${lib.name}-${i}`}
              className={css`
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 1rem;
                &[open] {
                  background: rgba(255, 255, 255, 0.1);
                }
              `}
            >
              <summary
                className={css`
                  cursor: pointer;
                  font-weight: bold;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  list-style: none;
                  &::-webkit-details-marker {
                    display: none;
                  }
                `}
              >
                <span>{lib.name}</span>
              </summary>
              <div
                className={css`
                  margin-top: 1rem;
                `}
              >
                {lib.url && (
                  <a
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css`
                      color: #4da6ff;
                      text-decoration: none;
                      font-size: 0.9rem;
                      display: inline-block;
                      margin-bottom: 0.5rem;
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                  >
                    Source Code
                  </a>
                )}
                <pre
                  className={css`
                    background: rgba(0, 0, 0, 0.3);
                    padding: 1rem;
                    border-radius: 4px;
                    overflow-x: auto;
                    font-size: 0.8rem;
                    white-space: pre-wrap;
                    font-family: monospace;
                  `}
                >
                  {lib.content}
                </pre>
              </div>
            </details>
          ))}
      </div>
    </div>
  )
}

export default Licenses
