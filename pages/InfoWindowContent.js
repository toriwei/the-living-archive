import { useMemo, useEffect, useState } from 'react'

function InfoWindowContent({ image }) {
  if (!image) {
    return <div>Loading...</div>
  }

  const header =
    image.obj.source_type === 'Yearbooks'
      ? `${image.title} Yearbook p.${image.obj.page}`
      : image.title

  const imageAttributes = [
    { label: 'Date', content: image.obj.date },
    { label: 'Location', content: image.obj.LMU_location },
    { label: 'Description', content: image.obj.description },
  ]
  return (
    <div className='w-96'>
      <p className='font-bold p-2'>{header}</p>
      <div className='flex'>
        <div className='flex-shrink-0 pl-2'>
          <img
            src={image.url}
            alt='image preview'
            className='object-contain object-left max-h-44'
          />
        </div>
        <div className='flex-grow pl-4'>
          {imageAttributes.map(
            (image) =>
              image.content && (
                <div key={image.label}>
                  <p>
                    <span className='font-bold'>{image.label}:</span>{' '}
                    <span>{image.content}</span>
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoWindowContent
