'use client'

import React from 'react'

function ItemData({ data }) {
  if (!data || !data.obj) {
    return <div>No data available</div>
  }

  function displayData() {
    let itemData = data.obj
    let newObj = {}
    const keys = [
      'title',
      'date',
      'page',
      'LMU_location',
      'description',
      'format',
      'tags',
    ]

    keys.forEach((key) => {
      const formattedKey =
        key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
      if (key === 'LMU_location') {
        newObj['Location'] = itemData[key] || null
      } else if (key === 'tags') {
        newObj[formattedKey] = itemData[key] ? itemData[key].join(' ') : null
      } else {
        newObj[formattedKey] = itemData[key] || null
      }
    })

    const elements = Object.keys(newObj).map((key) => {
      if (key !== 'Title' && newObj[key] !== null) {
        return (
          <p key={key}>
            <span>{key}:</span> <span>{newObj[key]}</span>
          </p>
        )
      }
      return null
    })

    return (
      <div>
        <p className='font-bold'>{newObj.Title}</p>
        {elements}
      </div>
    )
  }
  return (
    <div>
      <div className='text-black content'>{displayData()}</div>
    </div>
  )
}

export default ItemData
