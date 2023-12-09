import { useMemo, useEffect, useState } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api'

import { fetchImageData } from './ImageGallery'
import InfoWindowContent from './InfoWindowContent'

export default function CampusMap() {
  const [markerData, setMarkerData] = useState([])
  const [hoveredMarker, setHoveredMarker] = useState([])
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const [isInfoWindowHovered, setIsInfoWindowHovered] = useState(false)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDM1aAcM26w2DIgRPtZJ1aNZGYbRhkuNCc',
  })
  const MAP_MARKER =
    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'

  const svgMarker = {
    path: MAP_MARKER,
    // fillColor: '#BA68C8',
    fillOpacity: 1,
    strokeColor: '#AB47BC',
    anchor: { x: 12, y: 24 },
    scale: 1.5,
  }

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

  const getRandomOffset = () => Math.random() / 20000

  const handleMarkerClick = (image) => {
    console.log('CLICK', image)
  }

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
                onClick={() => handleMarkerClick(image)}
                onMouseOver={() => setHoveredMarker(image)}
                onMouseOut={() => setHoveredMarker(null)}
                icon={{
                  ...svgMarker,
                  fillColor: hoveredMarker === image ? 'pink' : '#BA68C8',
                }}
              >
                {hoveredMarker === image && (
                  <InfoWindow>
                    <InfoWindowContent image={image} />
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
