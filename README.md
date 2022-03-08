# ProShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.
> This is the course project for Brad Traversy's [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course

![screenshot](https://github.com/NZedan/proshop_mern/blob/master/screenshot.png)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## My Modifications

- Create new product with dedicated UI (instead of modifying a pre-made sample product)
- Items per page selector for pagination
- Reduce loading booleans used including on home screen so loader is only shown on initial load
  (loading checked on population of product array)
- User state refactored to single reducer removing multiple instances of userInfo
- Security improvement - getOrderById requires admin privilege or order to belong to user
- Add function to calculate and verify prices from database when placing order to avoid tampering
  in the front end
- Dispatch addToBasket in productScreen instead of basketScreen to avoid sending qty as search
  query and causing qty reset when refreshing page after changing in basketScreen
- Add function when creating new order to check countInStock and respond appropriately updating
  countInStock and order quantity. countInStock behaviour - Items removed on createOrder,
  getOrderDetails resets countInStock if set time elapsed && order not paid. Timeout function in
  create order, called when order saved to reset stock if order not paid in time. Not perfect but
  better than nothing
- Add function that updates order to deleted if not paid after a set time
- On order screen, if order times out, notification displayed with link that places order items
  back in the basket
- Security improvement - Set httpOnly cookie with user's id as value used to refresh JWT on page
  refresh and just before expiry. User Info including JWT no longer stored in local storage. Cookie
  cleared on logout, user logged out if token invalid, not present or session cookie expired
- Make basket nav link a dropdown menu with basket items if any
- Dismiss alerts with close button

## Issues

Please note, this is a course project only, if you would like to point out any issues please do so

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 6000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAYPAL_SECRET = your secret
```

### Install Dependencies (backend & frontend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:6000)
npm run dev
# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import
# Destroy data
npm run data:destroy
```

```
Sample User Logins
admin@example.com (Admin)
123456
jimi@example.com (Customer)
123456
joni@example.com (Customer)
123456
```

## License

The MIT License

Copyright (c) 2020 Traversy Media https://traversymedia.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
