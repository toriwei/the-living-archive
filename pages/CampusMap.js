import { useMemo, useEffect, useState } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api'

import { fetchImageData } from './ImageGallery'

export default function CampusMap() {
  const [markerData, setMarkerData] = useState([])
  const [hoveredMarker, setHoveredMarker] = useState([])

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
    ],
  }

  const markerClustererOptions = {
    gridSize: 7,
    zoomOnClick: true,
  }

  const handleMarkerHover = (image) => {
    console.log('Marker hover:', image)
  }

  const getRandomOffset = () => Math.random() / 20000

  useEffect(() => {
    const locationData = async () => {
      const images = await fetchImageData()

      const validMarkers = images.filter(
        (image) =>
          image.obj.hasOwnProperty('lat') && image.obj.hasOwnProperty('long')
      )
      console.log('MARKERS', validMarkers)

      const groupedMarkers = validMarkers.reduce((acc, image) => {
        const location = image.obj.LMU_location || 'none'
        acc[location] = acc[location] || []
        acc[location].push(image)
        return acc
      }, {})

      console.log('group', groupedMarkers)

      const adjustedMarkers = Object.values(groupedMarkers).flatMap(
        (cluster) => {
          return cluster.map((image) => ({
            ...image,
            position: {
              lat: image.obj.lat + getRandomOffset(),
              lng: image.obj.long + getRandomOffset(),
            },
          }))
        }
      )

      setMarkerData(adjustedMarkers)
    }

    locationData()
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '80%' }}
        options={mapOptions}
        center={center}
        zoom={17}
      >
        <MarkerClusterer options={markerClustererOptions}>
          {(clusterer) =>
            markerData.map((image) => (
              <Marker
                key={image.fileName}
                position={image.position}
                clusterer={clusterer}
                onMouseOver={() => setHoveredMarker(image)}
                onMouseOut={() => setHoveredMarker(null)}
              >
                {hoveredMarker === image && (
                  <InfoWindow>
                    <div>
                      <p>{image.title}</p>
                      {console.log('Marker hover: ', image)}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  )
}
