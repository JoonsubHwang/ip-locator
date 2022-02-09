# IP Locator

[IP Locator](https://ip-locator-kayden.vercel.app) is an app which displays geological location of an IP adrress. <br/>
This is a solution to the [IP address tracker challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0) on Frontend Mentor.

<br/>

*Preview:*

![Preview - Portrait](https://raw.githubusercontent.com/JoonsubHwang/ip-locator/main/preivew-portrait.png)
![Preview - Landscape](https://raw.githubusercontent.com/JoonsubHwang/ip-locator/main/preivew-landscape.png)

<br/>

> *Developed by*
> ### Kayden Hwang <br/>
> [LinkedIn](https://www.linkedin.com/in/kayden-hwang-43639419b/)

<br/><br/>



## Table of Contents
1. [Technologies Used](#Technologies-Used)
2. [Features](#Features)

<br/><br/>



## Technologies Used
- [Next.js](https://nextjs.org/) (+React)
- [Sass](https://sass-lang.com/)
- [GeoIP API](https://geo.ipify.org/)
- [react-map-gl](https://github.com/visgl/react-map-gl)
- [Framer](https://www.framer.com/)

<br/><br/>


<h2>Features</h2>


> ### Server-side rendering
> - Used [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to fetch data from an external API at request time and pass to props.
> - Next.js pre-renders the page on server-side.
> - Reduces page load time.


> ### GeoIP API
> - Used to lookup geological data of ip address.


> ### react-map-gl
> - Used to render an interactive map.
> - One of the few libraries that can render interactive map on server-side.


> ### Search IP address
> - Searches client's IP address on initial load.
> - Specific IP Address can be searched with query parameter or the searchbar.


> ### Responsive design
> - Layout changes to fit the screen size.
> - Map's viewport also changes to fit the window.


> ### Animation
> - Used Framer to add animations for initial load, and events.
> - Map's viewports also changes to fit the window.


> ### Optimization
> - Images are optimized with explicit `width` and `height`.
> - Loads different image files depending on the screen size.


<br/><br/>

<br/><br/>
