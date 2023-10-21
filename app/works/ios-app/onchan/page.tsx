import Markdown from '@/components/markdown/Markdown'
import { getWorkPostByPath } from '@/lib/work'

export default async function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content } = getWorkPostByPath('ios-app/onchan')

  return (
    <div className="w-full">
      <article className="p-5 lg:rounded-lg">
        <Markdown source={content} metas={[]} />
      </article>
    </div>
  )
}
