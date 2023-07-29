'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Editor, EditorState, RichUtils, SelectionState, Modifier, convertToRaw } from 'draft-js'
import { draftToMarkdown } from 'markdown-draft-js'
import 'draft-js/dist/Draft.css'
import {
  faBold,
  faItalic,
  // faHeading,
  faStrikethrough,
  faCode,
  faList,
  faListOl,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'
import { linkDecorator } from './Link'
import { Button } from '@/components/Button'
import LinkifyIt from 'linkify-it'
import { EditorIcons } from './EditorIcons'

/*
Returns editor state with a link entity created / updated to hold the link @data
for the range specified by @selection
*/
type LinkData = {
  explicit: boolean
  url: string | null
}

type CommentEditorProps = {
  onClick?: (result: string) => Promise<void>
}

const CommentEditor: React.FC<CommentEditorProps> = ({ onClick }) => {
  const [editorEnable, setEditorEnable] = useState(false)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(linkDecorator))
  const editorRef = useRef<Editor>(null)
  const iconStyle: React.CSSProperties = { height: 15 }
  const linkifyit = LinkifyIt()

  useEffect(() => {
    setEditorEnable(true)
  }, [])

  const handleInlineClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    inlineStyle: string
  ) => {
    event.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const handleBlockClick = (event: React.MouseEvent<SVGElement, MouseEvent>, blockType: string) => {
    event.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  const handleSendButton = () => {
    const data = convertToRaw(editorState.getCurrentContent())
    const result = draftToMarkdown(data, {
      preserveNewlines: true,
    })
    const formattedResult = result.replaceAll('```\n```\n', '')
    if (onClick) {
      onClick(formattedResult)
    }
  }
  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType()
    if (type === 'blockquote') {
      return 'myCustomBlockQuote'
    }
  }

  function getCurrentLinkEntityKey(editorState: EditorState) {
    const contentState = editorState.getCurrentContent()
    const startKey = editorState.getSelection().getStartKey()
    const startOffset = editorState.getSelection().getStartOffset()
    const block = contentState.getBlockForKey(startKey)

    const linkKey = block.getEntityAt(Math.min(block.getText().length - 1, startOffset))

    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey)
      if (linkInstance.getType() === 'LINK') {
        return linkKey
      }
    }
    return null
  }

  function editorStateSettingLink(
    editorState: EditorState,
    selection: SelectionState,
    data: LinkData
  ) {
    const contentState = editorState.getCurrentContent()
    const entityKey = getCurrentLinkEntityKey(editorState)

    let nextEditorState = editorState

    if (!entityKey) {
      const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', data)
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      nextEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      })
      nextEditorState = RichUtils.toggleLink(nextEditorState, selection, entityKey)
    } else {
      nextEditorState = EditorState.set(editorState, {
        currentContent: editorState.getCurrentContent().replaceEntityData(entityKey, data),
      })
      nextEditorState = EditorState.forceSelection(nextEditorState, editorState.getSelection())
    }

    return nextEditorState
  }

  function onChangeHandle(e) {
    // Returns the current contents of the editor.
    const contentState = e.getCurrentContent()

    // Returns the current cursor/selection state of the editor.
    const selection = e.getSelection()

    if (!selection || !selection.isCollapsed()) {
      setEditorState(e)
      return
    }

    const cursorOffset = selection.getStartOffset()
    const cursorBlockKey = selection.getStartKey()
    const cursorBlock = contentState.getBlockForKey(cursorBlockKey)

    if (cursorBlock.getType() !== 'unstyled') {
      setEditorState(e)
      return
    }

    // Step 1: Get the word around the cursor by splitting the current block's text
    const text = cursorBlock.getText()
    const currentWordStart = text.lastIndexOf(' ', cursorOffset) + 1
    let currentWordEnd = text.indexOf(' ', cursorOffset)
    if (currentWordEnd === -1) {
      currentWordEnd = text.length
    }

    const currentWord = text.substr(currentWordStart, currentWordEnd - currentWordStart)

    const currentWordIsURL = !!linkifyit.match(currentWord)

    // Step 2: Find the existing LINK entity under the user's cursor
    let currentLinkEntityKey = cursorBlock.getEntityAt(Math.min(text.length - 1, cursorOffset))
    const inst = currentLinkEntityKey && contentState.getEntity(currentLinkEntityKey)
    if (inst && inst.getType() !== 'LINK') {
      currentLinkEntityKey = ''
    }

    if (currentLinkEntityKey) {
      // Note: we don't touch link values added / removed "explicitly" via the link
      // toolbar button. This means you can make a link with text that doesn't match the link.
      const entityExistingData = contentState.getEntity(currentLinkEntityKey).getData()
      if (entityExistingData.explicit) {
        setEditorState(e)
        return
      }

      if (currentWordIsURL) {
        // We are modifying the URL - update the entity to reflect the current text
        const contentState = e.getCurrentContent()
        setEditorState(
          EditorState.set(e, {
            currentContent: contentState.replaceEntityData(currentLinkEntityKey, {
              explicit: false,
              url: linkifyit.match(currentWord)[0].url,
            }),
          })
        )
        return
      } else {
        // We are no longer in a URL but the entity is still present. Remove it from
        // the current character so the linkifying "ends".
        const entityRange = new SelectionState({
          anchorOffset: currentWordStart - 1,
          anchorKey: cursorBlockKey,
          focusOffset: currentWordStart,
          focusKey: cursorBlockKey,
          isBackward: false,
          hasFocus: true,
        })
        setEditorState(
          EditorState.set(e, {
            currentContent: Modifier.applyEntity(e.getCurrentContent(), entityRange, null),
          })
        )
        return
      }
    }

    // There is no entity beneath the current word, but it looks like a URL. Linkify it!
    if (!currentLinkEntityKey && currentWordIsURL) {
      const entityRange = new SelectionState({
        anchorOffset: currentWordStart,
        anchorKey: cursorBlockKey,
        focusOffset: currentWordEnd,
        focusKey: cursorBlockKey,
        isBackward: false,
        hasFocus: false,
      })

      let newE = editorStateSettingLink(e, entityRange, {
        explicit: false,
        url: linkifyit.match(currentWord)[0].url,
      })

      // reset selection to the initial cursor to avoid selecting the entire links
      newE = EditorState.acceptSelection(newE, selection)
      setEditorState(newE)
      return
    }

    setEditorState(e)
  }

  // const handleAddLink = () => {
  //   const selection = editorState.getSelection()
  //   const link = prompt('Please enter the URL of your link')
  //   if (!link) {
  //     setEditorState(RichUtils.toggleLink(editorState, selection, null))
  //     return
  //   }
  //   const content = editorState.getCurrentContent()
  //   const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
  //     url: link,
  //   })
  //   const newEditorState = EditorState.push(editorState, contentWithEntity, 'apply-entity')
  //   const entityKey = contentWithEntity.getLastCreatedEntityKey()
  //   setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey))
  // }

  const editorIcons = [
    {
      onMouseDown: handleInlineClick,
      type: 'BOLD',
      icon: faBold,
      style: iconStyle,
    },
    // {
    //   onMouseDown: handleBlockClick,
    //   type: 'header-three',
    //   icon: faHeading,
    //   style: iconStyle,
    // },
    {
      onMouseDown: handleInlineClick,
      type: 'ITALIC',
      icon: faItalic,
      style: iconStyle,
    },
    {
      onMouseDown: handleInlineClick,
      type: 'STRIKETHROUGH',
      icon: faStrikethrough,
      style: iconStyle,
    },
    {
      onMouseDown: handleBlockClick,
      type: 'code-block',
      icon: faCode,
      style: iconStyle,
    },
    {
      onMouseDown: handleBlockClick,
      type: 'unordered-list-item',
      icon: faList,
      style: iconStyle,
    },
    {
      onMouseDown: handleBlockClick,
      type: 'ordered-list-item',
      icon: faListOl,
      style: iconStyle,
    },
    {
      onMouseDown: handleBlockClick,
      type: 'blockquote',
      icon: faQuoteLeft,
      style: iconStyle,
    },
  ]

  return (
    <div
      onClick={() => {
        editorRef.current?.focus()
      }}
    >
      {editorEnable && (
        <>
          <Editor
            ref={editorRef}
            placeholder="Write something!"
            editorKey="test-key"
            editorState={editorState}
            onChange={(e) => {
              onChangeHandle(e)
            }}
            blockStyleFn={myBlockStyleFn}
          />
          <div className="flex my-2 bg-gray-500 w-full">
            <EditorIcons
              editorIcons={editorIcons}
              handleBlockClick={handleBlockClick}
              handleInlineClick={handleInlineClick}
            />
          </div>
          <Button
            size="large"
            label="Markdownに変換する"
            primary={true}
            onClick={() => handleSendButton()}
          />
        </>
      )}
    </div>
  )
}

export default CommentEditor
