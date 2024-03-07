'use client'

import React from 'react'

function ItemData({ data }) {
  if (!data || !data.obj) {
    return <div>No data available</div>
  }

  function displayData() {
    let newObj = {}
    let itemData = data.obj
    switch (itemData.source_type) {
      case 'Newspapers':
        newObj = {
          Title: itemData.title,
          Date: itemData.date,
          Page: itemData.page,
          Location: itemData.LMU_location,
          Section: itemData.section,
        }
        break
      case 'Yearbooks':
        newObj = {
          Title: itemData.source_metadata.Title,
          Date: itemData.date,
          Page: itemData.page,
          Location: itemData.LMU_location,
          Description: itemData.description,
        }
        break
    }

    const elements = Object.keys(newObj).map((key) => {
      console.log('hello')
      console.log(newObj[key])
      if (key !== 'Title' && newObj[key] !== undefined) {
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
      <div className='content'>{displayData()}</div>
    </div>
  )
}

export default ItemData
