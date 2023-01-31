/* eslint react/prop-types: 0 */
import React, { useState, useEffect, useRef } from 'react'
import useValidateURL from './utils/useValidateURL'

const Bookmark = (props) => {
  const { key, allbookmarks, bookmark, updatebookmarks, ifEdit, updateIfEdit } = props
  const [editIdx, setEditIdx] = useState(null) //index of the bookmark which is been editing
  const [editLinkValid, setEditLinkValid] = useState(false)
  const editingLink = useRef('') //reference of the link user editing

  const deleteLink = (e) => {
    e.stopPropagation()
    e.target.parentNode.parentNode.classList.add('hide')
    e.target.parentNode.parentNode.parentNode.classList.add('hide')
    const currentLinks = [...allbookmarks]
    const deleteIdx = currentLinks.findIndex((bookmark) => bookmark.id == e.target.id) // find the deleting bookmark
    currentLinks.splice(deleteIdx, 1)
    setTimeout(() => {
      //remove the bookmark on UI and reset bookmarks' array
      e.target.parentNode.parentNode.classList.remove('hide')
      e.target.parentNode.parentNode.parentNode.classList.remove('hide')
      updatebookmarks(currentLinks)
    }, 1000)
  }
  const editLink = (e) => {
    e.preventDefault()
    const currentLinks = [...allbookmarks]
    const editIdx = currentLinks.findIndex(
      (bookmark) => bookmark.id == e.target.attributes.getNamedItem('id').value,
    ) // find the editing bookmark
    currentLinks[editIdx]['link'] = editingLink.current.value //change the link
    updatebookmarks(currentLinks)
    setEditIdx(null) //no bookmarks is being edited
    setEditLinkValid(false) //disable submit edit button
    editingLink.current.value = '' //set input field value to empty string
  }
  useEffect(() => {
    if (!ifEdit) setEditIdx(null)
  }, [ifEdit])
  return (
    <div data-testid='bookmark-1'>
      {bookmark && (
        <div key={key} className='book-mark-background'>
          <div className='book-mark' key={key}>
            <div className='link-cotainer'>
              {editIdx === bookmark.id && (
                <form id={bookmark.id} onSubmit={editLink}>
                  <input
                    type='text'
                    name='edit'
                    placeholder={bookmark.link}
                    ref={editingLink}
                    onChange={(e) => {
                      setEditLinkValid(useValidateURL(e.target.value))
                    }}
                  />
                  {editLinkValid ? (
                    <input type='submit' value='Edit BookMark' />
                  ) : (
                    <input type='submit' value='Edit BookMark' disabled />
                  )}
                </form>
              )}
              {
                (!editIdx || editIdx !== bookmark.id) && <p>{bookmark.link}</p> //show URL when the bookmark is not being editing
              }
            </div>
            <div className='btn-container'>
              <button className='delete' id={bookmark.id} onClick={deleteLink}>
                𝖷
              </button>
              {
                <a target='_blank' rel='noreferrer' href={bookmark.link}>
                  🔗
                </a>
              }
              {(!editIdx || editIdx !== bookmark.id) && ( //show edit button when the bookmark is not being editing
                <button
                  className='edit'
                  id={bookmark.id}
                  onClick={() => {
                    setEditIdx(bookmark.id)
                    updateIfEdit(true)
                  }}
                >
                  🖍
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookmark
