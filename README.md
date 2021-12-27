<!-- Headings -->
# Trackify
🙂
A Trello Clone - Built with React, Redux, Express, and MongoDB.
---
## Features 🔥 
* [x] User register and Login
* [x] User Authentication
* [ ] Dashboard Admin
* [x] Create, Modify and Delete boards
* [x] Create, Modify and Delete lists on board
* [x] Create, Modify and Delete array of cards on lists
* [x] Move card items within lists
* [x] Move card items across lists
* [ ] Notification log with active timestamps for each user events
* [ ] Customize background images or color for individual boards
* [ ] assign user to a specific cards
* [ ] Ability to comment on card(task)
---
## Installing 🧰
1. Clone the Repository
```
  git clone https://github.com/KhalilBenMansour/Trackify.git 
  cd trackify
```
1. Install dependencies
```
  npm i && cd client npm i
```
1. Create .env file
```
  MONGO_URI="your mongoDb atlas"
  PORT=5000
  secretOrKey="your secret key"
```
1. Run the Project
```
  npm run dev
```
___
## ER DIAGRAM 💹
![Blank diagram](https://user-images.githubusercontent.com/89579585/147464763-05a91cc8-b02e-4884-9322-45dc4ad7ce57.png)
___
## Build With 🏗️
### Frontend
* [React](https://fr.reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - State management
* [React-Bootstrap](https://react-bootstrap.github.io/)/[bootstrap](https://getbootstrap.com/) - UI
* [React-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) - Accessible drag and drop for lists
* [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview) - Routing library for react
### Backend
* [NodeJs](https://nodejs.org/) - Backend framework
* [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624584&adgroup=115749713703&gclid=Cj0KCQiA5aWOBhDMARIsAIXLlkcQ08IuznMOafXcB4OtgDvAKwT1duPg9-_ndUmO3Ctnf3MMyVSgi1kaAqx1EALw_wcB) - Database
* [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js
* [Express](https://expressjs.com/fr/) - Node.js web application framework
* [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js
* [Jsonwebtoken](https://jwt.io/) - Decode, verify and generate JWT.
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing algorithm library
* [passportjs](https://www.passportjs.org/) - Algorithm of security
