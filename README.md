# Backend Setup Instructions

## Overview
This repository contains the backend code for the GText Assessment eCommerce application. It provides APIs for managing products, handling user authentication (admin-specific features), managing carts, and sending transactional emails. Below are detailed instructions for setting up and running the backend server locally.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: Version 16.x or higher
- **npm** (Node Package Manager) or **yarn**
- **MongoDB**: A running MongoDB instance (local or cloud-based)

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
```
Replace `<repository-url>` with the actual repository URL.

### 2. Navigate to the Project Directory
```bash
cd <repository-folder>
```
Replace `<repository-folder>` with the name of the cloned repository.

### 3. Install Dependencies
```bash
npm install
```
or, if using `yarn`:
```bash
yarn install
```

---

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=8081
DB_CONNECTION=mongodb+srv://moyotecky:ByQ6aFeecpRkdt1o@cluster0.qnnpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_API_KEY=285792682325884
CLOUDINARY_API_SECRET=bsCnqzV4tEhKYCEfIjOwE-5HZ6Q
CLOUDINARY_CLOUD_NAME=dce7lr0vr
NODE_ENV=development
SECRET_KEY=*******
GMAIL_PASSWORD=*******
GMAIL_USERNAME=******

---

## Running the Server

### 1. Start the Development Server
```bash
npm run dev
```
or, if using `yarn`:
```bash
yarn dev
```

The server will run on `http://localhost:8081` by default.

### 2. Test the API Endpoints
Use an API client like Postman or cURL to test the following endpoints, below is the postman documentation:
https://gnext-assessment-api.postman.co/workspace/Team-Workspace~9d63ec42-90ee-45e5-8165-f726baa0c397/collection/37803294-afd53983-b1e4-4b56-9449-22569fb75838?action=share&creator=37803294&active-environment=37803294-8639ff64-13e1-42ea-a1ca-5945f6ea5af4

## Deployment

### Hosting Options
The deployment was made on the following platform:

- **Render**: https://gnext-assessment-api-v1.onrender.com

---

## Troubleshooting

### Common Issues
1. **Database Connection Error**:
   - Verify the `DB_CONNECTION` value in your `.env` file.
   - Ensure the MongoDB service is running.

2. **API Not Responding**:
   - Check the server logs for errors.
   - Ensure the correct PORT is specified in the `.env` file.

### Reporting Bugs
If you encounter any issues, feel free to open an issue in the repository or contact me on via email "moyotecky@gmail.com".

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

