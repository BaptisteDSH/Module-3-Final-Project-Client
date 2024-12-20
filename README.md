# Pawty Time

Pawty Time is a platform dedicated to creating adoptions and events for animals. This project aims to bring animal lovers together and facilitate responsible adoption while promoting community events around animals.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Live Demo](#live-demo)
- [Contributions](#contributions)
- [Contact](#contact)

## Features

- **Adoption Management**: Create, view, and search adoption listings.
- **Event Organization**: Create and manage community events.
- **Authentication System**: User registration, login, and management.
- **Intuitive Interface**: Designed for simple and efficient navigation.
- **Image Carousel**: View animals through a gallery of images.

## Technologies Used

### Frontend

- **React.js**: Library for user interfaces.
- **React Router**: Navigation management.
- **Axios**: For API calls.
- **React-Slick**: Image carousel.

### Backend

- **Node.js & Express.js**: Backend server.
- **MongoDB**: NoSQL database for storing users, adoption listings, and events.
- **JWT (JSON Web Tokens)**: Secure authentication.
- **Mongoose**: ORM for MongoDB.

### Hosting

- **Frontend**: Netlify.
- **Backend**: Render.
- **Database**: MongoDB Atlas.

## Installation and Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)

### Instructions

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/BaptisteDSH/Module-3-Final-Project-Client.git
   cd Module-3-Final-Project-Client
   ```
2. Install dependencies for the frontend:

   ```bash
   npm install
   ```

3. Clone the backend repository:

   ```bash
   git clone https://github.com/BaptisteDSH/json-server-backend.git
   cd json-server-backend
   ```

4. Install dependencies for the backend:

   ```bash
   npm install
   ```

5. Configure environment variables:

   - **Frontend**: Update the API URL in `src/config/apiUrl.config.js`:

     ```javascript
     export const API_URL =
       "https://module-3-final-project-server.onrender.com";
     ```

   - **Backend**: Create a `.env` file in the backend root directory and add the following:
     ```
     PORT=5000
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-secret-key>
     ```

6. Start the backend:

   ```bash
   npm start
   ```

7. Start the frontend:

   ```bash
   npm start
   ```

8. Open your browser at [http://localhost:3000](http://localhost:3000).

## Live Demo

Check out the live application: [Pawty Time](https://pawty.netlify.app/)

## Contributions

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push your changes:
   ```bash
   git push origin feature/my-new-feature
   ```
5. Create a Pull Request.

## Contact

For questions or suggestions, contact us at: contact@pawtytime.com.

Thank you for supporting Pawty Time! 🐾
