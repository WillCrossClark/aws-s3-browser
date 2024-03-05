# Running the Application Locally

Welcome to our private AWS S3 browser application. Follow these instructions to set up and run the application on your local machine.

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Comes installed with Node.js)

## Configure Environment Variables

### Server

Navigate to the server directory:

```bash
cd server
```

Copy the .env.example file to a new file named .env:

```bash
cp .env.example .env
```

Open the .env file and update it with your own credentials.

## Install Dependencies

### Server Dependencies

Navigate to the server directory and install the necessary packages:

```bash
cd server
npm install
```

### Client Dependencies

```bash
cd client
npm install
```

## Running the Application

### Start the Server

In the server directory, start the server with:

```bash
npm run server
```

The server will be available at http://localhost:3000 by default.

### Start the Client

In a new terminal window, navigate to the client directory and start the client with:

```bash
npm start
```

The client will be available at http://localhost:3003 by default.
