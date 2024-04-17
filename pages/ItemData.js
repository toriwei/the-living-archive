'use client'

import React, { useState, useEffect } from 'react'

function ItemData({ data, isGalleryRecord }) {
  if (!data || !data.obj) {
    return <div>No data available</div>
  }

  function displayData() {
    let itemData = data.obj
    let newObj = {}
    const keys = [
      'title',
      'source_name',
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
        newObj[formattedKey] =
          itemData[key].length > 0 ? itemData[key].join(', ') : null
      } else if (key === 'source_name') {
        newObj['Source'] = itemData[key] || null
      } else {
        newObj[formattedKey] = itemData[key] || null
      }
    })

    if (
      isGalleryRecord &&
      itemData.hasOwnProperty('displayName') &&
      itemData.displayName === true
    ) {
      newObj['Submitted By'] = itemData.name
    } else if (!isGalleryRecord) {
      newObj['Submitted By'] = itemData.name
      newObj['Display Contributor Name'] = itemData.displayName
        ? itemData.displayName.toString()
        : null
      newObj['Email'] = itemData.email
      newObj['Notes'] = itemData.notes || null
      switch (itemData.adminApproval) {
        case 'pending':
          newObj['Status'] = 'Pending'
          break
        case true:
          newObj['Status'] = 'Accepted'
          break
        case false:
          newObj['Status'] = 'Denied'
          break
        default:
          break
      }
    }

    const elements = Object.keys(newObj).map((key) => {
      if (key !== 'Tags' && key !== 'Title' && newObj[key] !== null) {
        return (
          <div key={key}>
            <span className='font-bold'>{key}:</span> <span>{newObj[key]}</span>
          </div>
        )
      } else if (key !== 'Title' && newObj[key] !== null) {
        const tagsArray = newObj[key]
          .split(',')
          .map((tag) => tag.trim())
          .sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: 'base' })
          )

        return (
          <div key={key} className='flex mt-1'>
            <span className='font-bold'>Tags:</span>{' '}
            <div className='flex flex-wrap text-xs ml-1'>
              {tagsArray.map((tag, index) => (
                <span
                  key={index}
                  className='bg-english-violet text-white rounded-full px-2 py-1 mr-2 mb-2'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
