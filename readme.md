# Los Tres Primos Market

## Coderhouse Final Project - Backend Development

### OVERVIEW
Los Tres Primos Market is a 3D Assets Ecommerce Store Application.
- NodeJS with Express
- MongoDB with Mongoose
- Typescript
- Tailwind CSS
- ReactJS with MUI (Frontend)
- Full Responsive

## DEPLOY
- [https://coderbackend-ltp.onrender.com/](https://coderbackend-ltp.onrender.com/)  
- [https://fvd-coderhouse.glitch.me/](https://fvd-coderhouse.glitch.me/)

> ###### GitHub Login only working with Render.com Deployment.

> ###### PS. It takes a while for loading the first time, because of Render.com and Glitch.com Inactive Systems.

## Documentation

##### Swagger UI API Documentation:
- [https://coderbackend-ltp.onrender.com/apidocs](https://coderbackend-ltp.onrender.com/apidocs)
- [https://fvd-coderhouse.glitch.me/apidocs](https://fvd-coderhouse.glitch.me/apidocs)

##### POSTMAN Online API Documentation:
>[https://documenter.getpostman.com/view/19344400/2s9XxvTEr6](https://documenter.getpostman.com/view/19344400/2s9XxvTEr6)
##### POSTMAN JSON Collection file:
>[DOWNLOAD](https://drive.google.com/file/d/1EtcL6qChZSYwAKGpKFmodre4eP-Kj_87/view?usp=sharing)

## LOCAL INSTRUCTIONS

#### RUN THE APP:
`npm start` (node ./dist/App.js)

#### TEST THE APP:
`npm test` (npx mocha ./dist/tests/Supertest.test.js)

------------

> ###### PS. This project is using Typescript in "src" folder and "dist" for javascript transpiled files. Folder "frontend_react" contains frontend source files.
> ###### PS2. This project needs an environment variable .env file for correctly work.

## Features

The App allows the admin and premium users to **CREATE**, **READ**, **UPDATE** and **DELETE** products.
Users can view products, add to cart, make a purchase and see orders.

- Register and login (Passport API with local or GitHub Third-party system).
- Display products with pagination.
- Order products by category or price.
- Add, view, delete and clear products in cart.
- Purchase products and see orders.
- Notification system purchase confirmation (with Nodemailer).
- User Manager view only for admin (can delete or promote users).

> ###### GitHub Login only working with Render.com Deployment.

#### USER MANAGER VIEW: 
`/users`


