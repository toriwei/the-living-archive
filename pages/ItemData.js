'use client'

import React from 'react'

function ItemData({ data }) {
  function displayData() {
    let newObj = {}
    let itemData = data.obj
    switch (itemData.source_type) {
      case 'Newspapers':
        newObj = {
          title: itemData.title,
          date: itemData.date,
          page: itemData.page,
          location: itemData.LMU_location,
          section: itemData.section,
        }
        break
      case 'Yearbooks':
        newObj = {
          title: itemData.source_metadata.Title,
          date: itemData.date,
          page: itemData.page,
          location: itemData.LMU_location,
          description: itemData.description,
        }
        break
    }

    const elements = Object.keys(newObj).map((key) => {
      if (key !== 'title') {
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
        <p className='font-bold'>{newObj.title}</p>
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
