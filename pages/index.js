import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.sass'
import Map from '../components/Map';

export default function Home({ ip, geoData, errorCode, errorMsg }) {

  const router = useRouter();
  const [portraitMode, setPortraitMode] = useState();

  useEffect(() => {
    setPortraitMode(window.innerWidth >= 800);
    window.onresize = () => {
      setPortraitMode(window.innerWidth >= 800);
    }
  }, [ setPortraitMode ]);

  function search(event) {
    router.push(`/?ip=${event.target.querySelector('#searchIP').value}`);
    event.preventDefault();
  }

  const arrowMotion = {
    hover: { x: 8 },
    click: { scale: 0.4 }
  };

  return (
    <div className={styles.home}>

      <Head>
        <title>IP Locator</title>
        <meta name="description" content="Look up geological location of an IP address." />
        <link rel="icon" href="favicon-32x32.png" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"/>
      </Head>

      <main>

        <div className={styles.top}>

          <h1 className={styles.siteHeader}>IP Locator</h1>

          <form className={styles.searchbar} onSubmit={search}>

            <input id='searchIP' placeholder='Search for IP address' required defaultValue={ip}/>

            <motion.button
            initial={{}}
            whileHover='hover'
            whileTap='click'>
              <motion.img 
              alt='arrow-right' src={'icon-arrow.svg'} width={18} heigth={23}
              variants={arrowMotion}
              transition={{ type: 'spring', bounce: 0.3 }}/>
            </motion.button>

          </form>
          
          {errorCode !== undefined &&
            errorCode === 404 ?
            <div className={styles.errorInfo}>
              <p className={styles.red}><span className={styles.message}>Invalid IP Address: </span>{ip}</p>
              <p>Please search a valid IP address.</p>
            </div>
            : 
            <div className={styles.errorInfo}>
              <p>There is an error with an external API (Positionstack).</p>
              <p className={styles.red}>{errorCode} <span className={styles.message}>{errorMsg}</span></p>
            </div>
          }

          {geoData !== undefined &&
          <div className={styles.summary}>

            <div className={styles.dataDisplay}>
              <small>IP ADDRESS</small>
              <p>{ip}</p>
            </div>

            {portraitMode && <div className={styles.divider}/>}

            <div className={styles.dataDisplay}>
              <small>LOCATION</small>
              <p>{geoData.city}, {geoData.region} {geoData.postalCode}</p>
            </div>

            {portraitMode && <div className={styles.divider}/>}

            <div className={styles.dataDisplay}>
              <small>Country</small>
              <p>{geoData.country}</p>
            </div>

            {portraitMode && <div className={styles.divider}/>}

            <div className={styles.dataDisplay}>
              <small>TIMEZONE</small>
              <p>UTC {geoData.timezone}</p>
            </div>

          </div>}

        </div>

        {geoData !== undefined && <Map lat={geoData.lat} lng={geoData.lng} portraitMode={portraitMode}/>}
        
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {

  const ip = context.query.ip || context.req.headers["x-real-ip"] || context.req.connection.remoteAddress;
  const key = 'ae55e3665351db51be801d4c526c6f3f';
  let res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${key}&limit=1&timezone_module=1&query=${ip}`);
  res = await res.json();

  if (res.error !== undefined)
    return { props: { 
      ip: ip, 
      errorCode: res.error.code, 
      errorMsg: res.error.message, 
    }};
  else if (res.data.length === 0)
    return { props: { 
      ip: ip, 
      errorCode: 404, 
    }};

  const data = res.data[0];

  return { props: {
    ip: ip,
    geoData: {
      city: data.label.split(', ')[1],
      region: data.region,
      postalCode: data['postal_code'],
      country: data.country,
      timezone: data['timezone_module']['offset_string'],
      lat: data.latitude,
      lng: data.longitude,
    },
  }};
}
