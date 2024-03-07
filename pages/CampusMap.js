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
import Modal from './Modal'

export default function CampusMap() {
  const [markerData, setMarkerData] = useState([])
  const [hoveredMarker, setHoveredMarker] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [map, setMap] = useState(null)
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null)

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
    maxZoom: 20,
  }

  const markerClustererOptions = {
    gridSize: 7,
    zoomOnClick: true,
  }

  const getRandomOffset = () => Math.random() / 20000

  const handleMarkerClick = (image) => {
    setImage(image)
    setIsModalOpen(true)
    console.log('HERE IMAGE', image.title)

    const clickedMarker = markerData.find(
      (marker) => marker.fileName === image.fileName
    )
    map.panTo(clickedMarker.position)
    console.log(clickedMarker)
  }

  const handleMarkerClose = () => {
    setImage(null)
    setIsModalOpen(false)
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
    if (map && selectedMarkerPosition) {
      // Use the panTo method to focus on the selected marker
      map.panTo(selectedMarkerPosition)
    }
  }, [selectedMarkerPosition, map])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '80%' }}
        options={mapOptions}
        center={center}
        zoom={17}
        onLoad={(map) => setMap(map)}
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
        {isModalOpen && (
          <Modal
            imageData={markerData}
            currentIndex={markerData.findIndex(
              (marker) => marker.fileName === image.fileName
            )}
            onClose={() => handleMarkerClose()}
            file={image.fileName}
            onMarkerChange={(position) => setSelectedMarkerPosition(position)}
          />
        )}
      </GoogleMap>
    </div>
  )
}
