import React, { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
  const [links, setLinks] = useState([
    { id: 1, link: 'https://phantom.land/work/' },
    { id: 2, link: 'https://www.google.com' },
    { id: 3, link: 'https://www.twitter.com' },
    { id: 4, link: 'https://www.facebook.com' },
    { id: 5, link: 'https://www.yahoo.com' },
    { id: 6, link: 'https://www.microsoft.com' },
    { id: 7, link: 'https://phantom.land/work/' },
    { id: 8, link: 'https://www.google.com' },
    { id: 9, link: 'https://www.twitter.com' },
    { id: 10, link: 'https://www.facebook.com' },
    { id: 11, link: 'https://www.yahoo.com' },
    { id: 12, link: 'https://www.microsoft.com' },
    { id: 13, link: 'https://phantom.land/work/' },
    { id: 14, link: 'https://www.google.com' },
    { id: 15, link: 'https://www.twitter.com' },
    { id: 16, link: 'https://www.facebook.com' },
    { id: 17, link: 'https://www.yahoo.com' },
    { id: 18, link: 'https://www.microsoft.com' },
    { id: 19, link: 'https://www.microsoft.com' },
    { id: 20, link: 'https://phantom.land/work/' },
    { id: 21, link: 'https://www.google.com' },
    { id: 22, link: 'https://www.twitter.com' },
    { id: 23, link: 'https://www.facebook.com' },
    { id: 24, link: 'https://www.yahoo.com' },
  ]) //all bookmarks
  const [shownLinks, setShownLinks] = useState([]) //bookmarks that should be shown on the current page number
  const [showPagination, setShowPagination] = useState(false) //show pagination or not
  const [currentPage, setCurrentPage] = useState(1) //current page number
  const [pageNum, setPageNum] = useState([1]) //total page number
  const [editIdx, setEditIdx] = useState(null) //index of the bookmark which is been editing
  const [addLinkValid, setAddLinkValid] = useState(false)
  const [editLinkValid, setEditLinkValid] = useState(false)
  const newLink = useRef('') //reference of the input user inputs
  const editingLink = useRef('') //reference of the link user editing
  const maxLinks = 20 //the number of bookmarks each page should show

  const addLink = (e) => {
    e.preventDefault()
    setLinks([{ id: links.length + 1, link: newLink.current.value }, ...links]) //add new bookmark to the beginning of the bookmarks' array
    newLink.current.value = '' //set input field value to enpty string
    setAddLinkValid(false) //disable submit button
    setCurrentPage(1) //go to the first page
  }

  const addLinkValidate = (e) => {
    const target = e.target.attributes.getNamedItem('name').value //to check if the user is adding or editing link, so to set the corresponding state
    try {
      const newUrl = new URL(e.target.value)
      if (newUrl.protocol === 'http:' || newUrl.protocol === 'https:')
        target == 'add' ? setAddLinkValid(true) : setEditLinkValid(true)
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
      target == 'add' ? setAddLinkValid(false) : setEditLinkValid(false)
      return false
    }
  }

  const deleteLink = (e) => {
    e.stopPropagation()
    const currentLinks = [...links]
    const deleteIdx = currentLinks.findIndex((bookmark) => bookmark.id == e.target.id) // find the deleting bookmark
    document.querySelectorAll('.book-mark-background')[deleteIdx].classList.add('hide')
    document.querySelectorAll('.book-mark')[deleteIdx].classList.add('hide')
    currentLinks.splice(deleteIdx, 1)
    setTimeout(() => {
      //remove the bookmark on UI and reset bookmarks' array
      document.querySelectorAll('.book-mark-background')[deleteIdx].classList.remove('hide')
      document.querySelectorAll('.book-mark')[deleteIdx].classList.remove('hide')
      setLinks(currentLinks)
    }, 1000)
  }

  const deleteAll = () => {
    document.querySelectorAll('.book-mark').forEach((ele) => ele.classList.add('hide'))
    document.querySelectorAll('.book-mark-background').forEach((ele) => ele.classList.add('hide'))
    setTimeout(() => {
      setLinks([])
    }, 1000)
  }

  const editLink = (e) => {
    e.preventDefault()
    const currentLinks = [...links]
    const editIdx = currentLinks.findIndex(
      (bookmark) => bookmark.id == e.target.attributes.getNamedItem('id').value,
    ) // find the editing bookmark
    currentLinks[editIdx]['link'] = editingLink.current.value //change the link
    setLinks(currentLinks)
    setEditIdx(null) //no bookmarks is being edited
    setEditLinkValid(false) //disable submit edit button
    editingLink.current.value = '' //set input field value to empty string
  }

  const setPagination = () => {
    if (links.length <= maxLinks) {
      //no need pagination when there are less than 20 bookmarks
      setShownLinks(links)
      setShowPagination(false)
      return
    }
    const filteredLinks = [...links].splice((currentPage - 1) * maxLinks, maxLinks) //extract bookmarkers that should be shown in the currentpage
    setShownLinks(filteredLinks)
    setPageNum([...Array(Math.ceil(links.length / maxLinks)).keys()]) //set total page number
    setShowPagination(true)
  }

  function changeCurrentPage(type) {
    //when previous/ next button is click
    switch (type) {
      case 'prev':
        setCurrentPage(currentPage - 1) //reset current page
        break
      case 'next':
        setCurrentPage(currentPage + 1) //reset current page
        break
      default:
        return
    }
  }

  const cancelEdit = (e) => {
    //cancel edit when click on the window
    if (
      e.target.value != 'Edit BookMar' &&
      e.target.attributes.getNamedItem('class').value != 'edit'
    ) {
      setEditIdx(null)
    }
  }

  useEffect(() => {
    const Idx = (currentPage - 1) * maxLinks
    const filteredLinks = [...links].splice(Idx, maxLinks)
    setShownLinks(filteredLinks) // whenever currentPage or bookmarkers' array is reset, also reset which bookmarkers should be shown
  }, [currentPage, links])

  useEffect(() => {
    setPagination() //whenever bookmarkers' array is reset, also reset the pagination
  }, [links])

  useEffect(() => {
    window.addEventListener('click', (e) => cancelEdit(e)) //add event listener when page just mounted

    return window.removeEventListener('click', (e) => cancelEdit(e)) // remove event listener before unmount
  }, [])

  return (
    <div className='App'>
      <div className='add-link-container'>
        <form onSubmit={addLink}>
          <input
            type='text'
            name='add'
            placeholder='Please input a valid link'
            ref={newLink}
            onChange={addLinkValidate}
          />
          {addLinkValid ? (
            <input type='submit' value='Add BookMark' />
          ) : (
            <input type='submit' value='Add BookMark' disabled />
          )}
        </form>
      </div>
      <div className='book-mark-container'>
        {shownLinks.map((bookmark, index) => (
          <div key={index} className='book-mark-background'>
            <div className='book-mark' key={index}>
              <div className='link-cotainer'>
                {editIdx === bookmark.id && (
                  <form id={bookmark.id} onSubmit={editLink}>
                    <input
                      type='text'
                      name='edit'
                      placeholder={bookmark.link}
                      ref={editingLink}
                      onChange={addLinkValidate}
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
                  <button className='edit' id={bookmark.id} onClick={() => setEditIdx(bookmark.id)}>
                    🖍
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPagination && (
        <div className='pagination'>
          <button
            className={currentPage > 1 ? 'prev show' : 'prev hide'} //only show previous button when current page is larger than 1
            onClick={() => changeCurrentPage('prev')}
          >
            ▸
          </button>
          {pageNum.map((page, index) => (
            <span
              key={index}
              className={currentPage === page + 1 ? 'focused-page' : 'page'}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </span>
          ))}
          <button
            className={currentPage < pageNum.length ? 'next show' : 'next hide'} //only show next button when current page is not the last page
            onClick={() => changeCurrentPage('next')}
          >
            ▸
          </button>
        </div>
      )}
      <button onClick={deleteAll}>delete all</button>
    </div>
  )
}

export default App
