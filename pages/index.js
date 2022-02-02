import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.sass'
import Map from '../components/Map';
import { useRouter } from 'next/router';

export default function Home({ ip, geoData, isp }) {

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

  return (
    <div className={styles.home}>

      <Head>
        <title>IP Locator</title>
        <meta name="description" content="Look up geological location of an IP address." />
        <link rel="icon" href="favicon-32x32.png" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"/>
        {/* <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script> TODO */}
      </Head>

      <main>

        <div className={styles.top}>

          <h1 className={styles.siteHeader}>IP Adress Tracker</h1>

          <form className={styles.searchbar} onSubmit={search}>

            <input id='searchIP' placeholder='Search for IP address or domain' required defaultValue={ip}/>

            <button>
              <img alt='arrow-right' src={'icon-arrow.svg'} />
            </button>

          </form>

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
              <small>TIMEZONE</small>
              <p>UTC {geoData.timezone}</p>
            </div>

            {portraitMode && <div className={styles.divider}/>}

            <div className={styles.dataDisplay}>
              <small>ISP</small>
              <p>{isp}</p>
            </div>

            {/* {[
              { name: 'IP ADDRESS', value: returnIP },
              { name: 'LOCATION',   value: `${geoData.city}, ${geoData.region} ${geoData.postalCode}` },
              { name: 'TIMEZONE',   value: `UTC ${geoData.timezone}` },
              { name: 'ISP',        value: isp }
            ].map((data, i) =>
              {
                <div key={'dataDisplay-' + i}>
                  {portraitMode && (i > 0) &&
                    <div className={styles.divider}/>}

                  <div className={styles.dataDisplay}>
                    <small>{data.name}</small>
                    <p>{data.value}</p>
                  </div>
                </div>
              } // TODO: wrap? key?
            )} */}

          </div>}

        </div>

        {geoData !== undefined && <Map lat={geoData.lat} lng={geoData.lng} portraitMode={portraitMode}/>}
        
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {

  const ipQuery = context.query.ip ?
                    `&ipAddress=${context.query.ip}`
                    : '';
  const res = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_2PRS5e7SqDvOlKY8KR1YDwqGmrD7c' + ipQuery);
  const data = await res.json();

  return { props: {
    ip: data.ip,
    geoData: data.location,
    isp: data.isp
  }}
}
