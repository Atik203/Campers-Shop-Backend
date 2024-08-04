# Campers Shop Backend

## Overview

This repository contains the backend server for the Campers Shop website, providing the necessary API endpoints and services to support the frontend application. The backend is built using Node.js, Express.js, and MongoDB, ensuring a robust and scalable solution for managing products, orders, users, and more.

**_Live Link:_** [Car Rental System](https://campers-shop-frontend-lac.vercel.app/)

## Features

- **Product Management**: CRUD operations for managing camping products.
- **Order Processing**: Managing customer orders, including creation, update, and retrieval.
- **Pagination and Sorting**: Efficiently handle large datasets with pagination and sorting capabilities.
- **Image Uploads**: Integration with Cloudinary for storing and retrieving product images.
- **Admin Dashboard**: Admin-specific endpoints for managing the shop's inventory and orders.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB to provide a schema-based solution to model data.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: Library for hashing passwords.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- MongoDB
- Mongoose
- TypeScript
- Zod
- Express.js

## Installation

1. Clone the repository:

```
git clone https://github.com/Atik203/Campers-Shop-Backend.git

```

2. Navigate into the project directory:

```
cd Campers-Shop=Backend

```

3. Install the dependencies:

```
yarn Install

```

4. Create a .env file in the root directory and add the following variables. Example:

```
PORT=5000
DATABASE_URL=mongodb database url
NODE_ENV=development
BASE_URL=http://localhost:5000/


```

### Running the Application

1. Start the application in development mode:

```
yarn start:dev

```

2. Or, to start the application in production mode:

```
yarn start:prod

```

### Building the Application

1. To build the application:

```
yarn build
```

### Linting and Formatting

1. To lint the code:

```
yarn lint

```

2. To automatically fix linting errors:

```
yarn lint:fix

```

3. To format the code with Prettier:

```
yarn prettier

```

4. To automatically fix formatting errors with Prettier:

```
yarn prettier:fix

```

### Middleware

- **Authentication:** Ensures that only authenticated users can access certain endpoints.
- **Authorization:** Differentiates actions that can be performed by users and admins.
- **ValidateRequest:** Validates incoming requests based on predefined schemas.

### Error Handling

The system uses a centralized error handling mechanism to catch and manage errors effectively. Custom errors provide meaningful messages and appropriate HTTP status codes.

### Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License.
