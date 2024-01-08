# The Living Archive

## About

The Living Archive was created by Tori Wei for Loyola Marymount University's Fall 2023 CMSI 4071 Senior Project class and will be continued through the Spring 2024 CMSI 4071 Senior Project class.

The site is a virtual archive dedicated to highlighting the lives and experiences of LMU's queer community. Currently, it consists of records from the LMU yearbooks and student newspapers.

Visit the site [here](the-living-archive.vercel.app).

## Tech Stack

This is a Next.js (Reactx) app deployed via Vercel. To store and display the archive items, two Google Firebase databases are used. The Storage database is able to store the files of the archive items, and the Firestore database contains and can query the item metadata. The Google Maps JavaScript API was used display archive items with a specific location on an interactive map. To convert the location to specific coordinates, the Google Maps Geocoding API was leveraged. There is also a basic [node script](https://github.com/toriwei/the-living-archive/blob/main/firebase/firebaseUpload.js) that can add and update archive item metadata with the command `node firebaseUpload.js`.
