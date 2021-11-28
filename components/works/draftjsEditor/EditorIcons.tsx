import React, { useState } from 'react'
export type EditorIconProps = {
  editorIcons: any
  handleInlineClick: any
  handleBlockClick: any
}
import { EditorIcon } from './EditorIcon'

export const EditorIcons: React.FC<EditorIconProps> = ({
  editorIcons,
  handleInlineClick,
  handleBlockClick,
}) => {
  const [activeInlineType, setActiveInlineType] = useState([])
  const [activeBlockType, setActiveClockType] = useState('')
  const onMouseDownInline = (e, type) => {
    if (activeInlineType.includes(type)) {
      setActiveInlineType(activeInlineType.filter((t) => t !== type))
    } else {
      setActiveInlineType([...activeInlineType, type])
    }
    if (activeBlockType === 'code-block') {
      handleBlockClick(e, type)
      setActiveClockType('')
    }
    handleInlineClick(e, type)
  }
  const onMouseDownBlock = (e, type) => {
    setActiveClockType(type)
    handleBlockClick(e, type)
  }
  const onMouseDownCodeBlock = (e, type) => {
    setActiveClockType(type)
    activeInlineType.forEach((type) => {
      handleInlineClick(e, type)
    })
    setActiveInlineType([])
    handleBlockClick(e, type)
  }
  return (
    <>
      {editorIcons.map((icon) => {
        const onMouseDown = (e, type) => {
          switch (type) {
            case 'BOLD':
              onMouseDownInline(e, type)
              break
            case 'ITALIC':
              onMouseDownInline(e, type)
              break
            case 'STRIKETHROUGH':
              onMouseDownInline(e, type)
              break
            case 'code-block':
              onMouseDownCodeBlock(e, type)
              break
            case 'unordered-list-item':
              onMouseDownBlock(e, type)
              break
            case 'ordered-list-item':
              onMouseDownBlock(e, type)
              break
            case 'blockquote':
              onMouseDownBlock(e, type)
              break
          }
        }
        return (
          <EditorIcon
            key={icon.type}
            onMouseDown={onMouseDown}
            type={icon.type}
            icon={icon.icon}
            style={icon.style}
            activeInlineType={activeInlineType}
            activeBlockType={activeBlockType}
          />
        )
      })}
    </>
  )
}
