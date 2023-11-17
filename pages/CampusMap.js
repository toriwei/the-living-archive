import { useMemo, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { Loader } from '@googlemaps/js-api-loader'
export default function CampusMap() {
  const loader = new Loader({
    apiKey: 'AIzaSyDM1aAcM26w2DIgRPtZJ1aNZGYbRhkuNCc',
  })
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

  if (!isLoaded) {
    // You can return a loading indicator or any other content while the map is loading
    return <div>Loading...</div>
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '80%' }}
        options={mapOptions}
        center={center}
        zoom={17}
      ></GoogleMap>
    </div>
  )
}
