import { useEffect, useState } from 'react';
import { default as Mapbox, Marker } from 'react-map-gl';
import styles from '../styles/Map.module.sass';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaDk3MTk0NzE5IiwiYSI6ImNreWFoczBpODA1a3kyb21yOHozdmI3NnUifQ.V5QWRpTENS1BCPZe92P6Hg'; // TODO use env var

export default function Map({ lat, lng, portraitMode }) {  

  const [viewport, setViewport] = useState();

  useEffect(() => {

    setViewport({
      width: window.innerWidth,
      height: getMapHeight(),
      latitude: lat,
      longitude: lng,
      zoom: 14
    });

    window.addEventListener('resize', () => {
      // FIXME doesnt apply accurately on the firt load
      if (viewport !== undefined)
        setViewport(Object.assign({}, viewport, {  width: window.innerWidth, height: getMapHeight() }));
    });

  }, [ setViewport ]);

  useEffect(() => {

    if (viewport !== undefined)
      setViewport(Object.assign({}, viewport, { latitude: lat, longitude: lng }));

  }, [ lat, lng, setViewport ]);

  function getMapHeight() {

    const rem = 18; // 1rem = 18px

    return portraitMode ?
      window.innerHeight - (15.3 * rem) 
      : Math.max((window.innerHeight - (16.2 * rem)), (20 * rem));
  }

  return (
    <Mapbox
    className={styles.map}
    {...viewport}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapStyle='mapbox://styles/mapbox/streets-v11?optimize=true'
    mapboxApiAccessToken={MAPBOX_TOKEN}>
      <Marker latitude={lat} longitude={lng}>
        <img className={styles.marker} src='/icon-location.svg' alt='Marker' width={36} heigth={36}/>
      </Marker>
    </Mapbox>
  );
}
