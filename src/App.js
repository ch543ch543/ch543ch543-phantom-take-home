import React, { useState, useEffect } from 'react'
import './App.scss'
import Bookmark from './components/Bookmark'
import Pagination from './components/Pagination'
import Addform from './components/Addform'

function App() {
  const [bookmarks, setBookmarks] = useState([
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
  ])
  const [shownLinks, setShownLinks] = useState([]) //bookmarks that should be shown on the current page number
  const [showPagination, setShowPagination] = useState(false) //show pagination or not
  const [pageNum, setPageNum] = useState([1]) //total page number
  const [currentPage, setCurrentPage] = useState(1) //current page number
  const [ifEdit, setIfEdit] = useState(false)
  const maxLinks = 20 //the number of bookmarks each page should show

  const updatebookmarks = (newbookmarks) => {
    return setBookmarks(newbookmarks)
  }
  const updateCurrentPage = (page) => {
    return setCurrentPage(page)
  }
  const updateIfEdit = (mode) => {
    return setIfEdit(mode)
  }
  const setPagination = () => {
    if (bookmarks.length <= maxLinks) {
      //no need pagination when there are less than 20 bookmarks
      setShownLinks(bookmarks)
      setShowPagination(false)
      return
    }
    const filteredLinks = [...bookmarks].splice((currentPage - 1) * maxLinks, maxLinks) //extract bookmarks that should be shown in the currentpage
    setShownLinks(filteredLinks)
    setPageNum([...Array(Math.ceil(bookmarks.length / maxLinks)).keys()]) //set total page number
    setShowPagination(true)
  }
  const deleteAll = () => {
    document.querySelectorAll('.book-mark').forEach((ele) => ele.classList.add('hide'))
    document.querySelectorAll('.book-mark-background').forEach((ele) => ele.classList.add('hide'))
    setTimeout(() => {
      setBookmarks([])
    }, 1000)
  }
  const cancelEdit = (e) => {
    //cancel edit when click on the window, but not when clicking the edit button
    if (
      e.target.value != 'Edit BookMar' &&
      e.target.attributes.getNamedItem('class').value != 'edit'
    ) {
      setIfEdit(false)
    }
  }
  useEffect(() => {
    const Idx = (currentPage - 1) * maxLinks
    const filteredLinks = [...bookmarks].splice(Idx, maxLinks)
    setShownLinks(filteredLinks) // whenever currentPage or bookmarks' array is reset, also reset which bookmarks should be shown
  }, [currentPage, bookmarks])
  useEffect(() => {
    setPagination() //whenever bookmarks' array is reset, also reset the pagination
  }, [bookmarks])
  useEffect(() => {
    window.addEventListener('click', (e) => cancelEdit(e)) //add event listener when page just mounted
    return window.removeEventListener('click', (e) => cancelEdit(e)) // remove event listener before unmount
  }, [])
  return (
    <div className='App'>
      <Addform
        bookmarks={bookmarks}
        updatebookmarks={updatebookmarks}
        updateCurrentPage={updateCurrentPage}
      />
      <div className='book-mark-container'>
        {shownLinks.map((bookmark) => (
          <Bookmark
            key={bookmark.id}
            allbookmarks={bookmarks}
            bookmark={bookmark}
            updatebookmarks={updatebookmarks}
            ifEdit={ifEdit}
            updateIfEdit={updateIfEdit}
          />
        ))}
      </div>
      {showPagination && (
        <Pagination
          pageNum={pageNum}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />
      )}
      <button onClick={deleteAll}>delete all</button>
    </div>
  )
}

export default App
