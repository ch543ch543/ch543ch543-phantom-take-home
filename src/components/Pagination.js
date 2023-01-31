/* eslint react/prop-types: 0 */
import React from 'react'

const Pagination = (props) => {
  const { pageNum, currentPage, updateCurrentPage } = props
  function changeCurrentPage(type) {
    //when previous/ next button is click
    switch (type) {
      case 'prev':
        updateCurrentPage(currentPage - 1) //reset current page
        break
      case 'next':
        updateCurrentPage(currentPage + 1) //reset current page
        break
      default:
        return
    }
  }
  return (
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
          onClick={() => updateCurrentPage(page + 1)}
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
  )
}

export default Pagination
