# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Important:

for all endpoint which require a token, the token should be put in the request Headers as follows:
"Key": authorization
"Value": the token provided from our backend when logining in or signing in

## API Endpoints

#### Products

- Index. Route: '/products' [GET]
- Show. Route: '/products/id' [GET], the id should be the product id
- Create [token required]. Route: '/products' [POST].
  It should Contain in the request body:
  {"name": "product name",
  "price": "product price"}

#### Users

- Index [token required]. Route: '/users' [GET]
- Show [token required]. Route: '/users/id' [GET], the id should be the user id
- Create. Route: '/users' [POST]
  It should Contain in the request body:
  {"username": "username",
  "firstName": "firstname",
  "lastName": "lastname",
  "password": "password"}

#### Orders

- Current Order by user (args: user id)[token required]. Route: '/orders' [GET].
  Gets the active orders or the currently sign in user. Gets the user_id from the jwt

## Data Shapes

#### Product

- id
- name
- price

Table: products (id:serial primary key, name:text, price:float)

#### User

- id
- firstName
- lastName
- password

Table: users (id:serial primary key, username:varchar, firstname:varchar, lastname:varchar, password:text)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: orders (id:serial primary key, user_id:int[foreing key to users table], status:varchar)
Table: orders_products (id:serial primary key, order_id:int[foreing key to orders table], product_id:int[foreing key to products table], quantity:int)
