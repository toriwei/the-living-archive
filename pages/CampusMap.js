import { useMemo, useEffect, useState } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

import { fetchImageData } from './ImageGallery'

export default function CampusMap() {
  const [imageData, setImageData] = useState([])
  const [markerData, setMarkerData] = useState([])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDM1aAcM26w2DIgRPtZJ1aNZGYbRhkuNCc',
  })

  const center = useMemo(() => ({ lat: 33.971, lng: -118.417 }), [])
  const mapOptions = {
    styles: [
      {
        featureType: 'poi.park',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi.business',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      // {
      //   featureType: 'poi',
      //   elementType: 'labels.icon',
      //   stylers: [{ visibility: 'off' }],
      // },
    ],
  }

  useEffect(() => {
    const locationData = async () => {
      const images = await fetchImageData()
      setImageData(images)
      console.log(images)
      const markers = images.filter(
        (image) =>
          image.obj.hasOwnProperty('lat') && image.obj.hasOwnProperty('long')
      )
      console.log('MARKERS')
      console.log(markers)
      const groupedMarkers = markers.reduce((acc, image) => {
        const location = image.obj.LMU_location
        if (!acc[location]) {
          acc[location] = []
        }
        acc[location].push(image)
        return acc
      }, {})
      console.log('group')
      console.log(groupedMarkers)
      const clusteredMarkers = Object.values(groupedMarkers)

      const adjustedMarkers = clusteredMarkers.map((cluster) => {
        let offset = 0
        return cluster.map((image) => {
          offset += 0.0001
          return {
            ...image,
            position: {
              lat: image.obj.lat + offset,
              lng: image.obj.long + offset,
            },
          }
        })
      })

      setMarkerData(adjustedMarkers.flat())
    }

    locationData()
  }, [])

  if (!isLoaded) {
    // You can return a loading indicator or any other content while the map is loading
    return <div>Loading...</div>
  }

  // next step: add marker cluster (in addition to offset)
  return (
    <div className='flex justify-center items-center h-screen'>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '80%' }}
        options={mapOptions}
        center={center}
        zoom={17}
      >
        {markerData.map((image) => (
          <Marker
            key={image.fileName}
            position={{
              lat: image.obj.lat + Math.random() / 23000,
              lng: image.obj.long + Math.random() / 23000,
            }}
          />
        ))}
      </GoogleMap>

      {markerData.map((image) => console.log(image.obj.lat))}
      {markerData.map((image) => console.log(image.obj.long))}
    </div>
  )
}
