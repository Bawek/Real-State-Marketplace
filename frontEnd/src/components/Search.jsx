import React from 'react'

const Search = ({search,HandleSearchChange,HandleSearch}) => {
  return (
    <div className='w-full flex justify-between'>
   <input type="text" className="flex-grow px-3 py-2 mr-4 focus:outline-none border border-green-300" placeholder="Search here" onKeyDown={HandleSearch} onChange={HandleSearchChange} value={search} id="" />
    <button className='px-3 py-2 bg-blue-800 '  onClick={HandleSearch}><i className="fa fa-search" aria-hidden="true"></i></button>
    </div>
  )
}

export default Search