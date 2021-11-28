import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type EditorIconProps = {
  onMouseDown: any
  icon: any
  style: any
  type: string
  activeInlineType: any
  activeBlockType: any
}

export const EditorIcon: React.FC<EditorIconProps> = ({
  onMouseDown,
  type,
  icon,
  style,
  activeInlineType,
  activeBlockType,
}) => {
  const className =
    activeInlineType.includes(type) || activeBlockType === type
      ? 'bg-gray-600 w-10 p-2 align-center'
      : 'w-10 p-2 align-center bg-gray-600'
  return (
    <div className={className}>
      <FontAwesomeIcon
        onMouseDown={(e) => {
          onMouseDown(e, type)
        }}
        icon={icon}
        style={style}
      />
    </div>
  )
}
