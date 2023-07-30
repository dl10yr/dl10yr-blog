import React from 'react'
import { NoteLink } from '@/components/note/NoteLink'
import { Note } from '@/lib/note'

export interface NoteListInterface {
  noteList: Note[]
}
const NoteList: React.FC<NoteListInterface> = ({ noteList }) => {
  return (
    <div className="border-t border-gray-500 py-1 my-1">
      {noteList.map((note) => {
        return <NoteLink key={note.path} date={note.date} content={note.content} path={note.path} />
      })}
    </div>
  )
}
export default NoteList
