/* eslint react/prop-types: 0 */
import React, { useState, useRef } from 'react'
import useValidateURL from './utils/useValidateURL'

const Addform = (props) => {
  const { bookmarks, updatebookmarks, updateCurrentPage } = props
  const [addLinkValid, setAddLinkValid] = useState(false)
  const newLink = useRef('') //reference of the input user inputs
  const addLink = (e) => {
    e.preventDefault()
    updatebookmarks([{ id: bookmarks.length + 1, link: newLink.current.value }, ...bookmarks]) //add new bookmark to the beginning of the bookmarks' array
    newLink.current.value = '' //set input field value to enpty string
    setAddLinkValid(false) //disable submit button
    updateCurrentPage(1) //go to the first page
  }
  return (
    <div className='add-link-container'>
      <form onSubmit={addLink}>
        <input
          type='text'
          name='add'
          placeholder='Please input a valid link'
          ref={newLink}
          onChange={(e) => {
            setAddLinkValid(useValidateURL(e.target.value))
          }}
        />
        {addLinkValid ? (
          <input type='submit' value='Add Bookmark' />
        ) : (
          <input type='submit' value='Add Bookmark' disabled />
        )}
      </form>
    </div>
  )
}

export default Addform
