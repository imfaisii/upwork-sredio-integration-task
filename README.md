# SRED.IO Task

[TEST DOMAIN](https://sredio-task.imfaisii.dev/)

This repository contains the backend and frontend setup instructions for the SRED.IO project. The backend is built with Node.js and the frontend with AngularJS. Below are the step-by-step instructions to set up and run the project.

## Backend Setup (Node.js - Port 3000)

### 1. Setup Environment Variables

- Copy the `.env.example` file and create a new file named `.env`.
  
  **Command:**
  ```bash
  cp .env.example .env
  ```

- Insert the required GitHub credentials into the `.env` file.

  **Environment Variables:**
  ```plaintext
  GITHUB_CLIENT_ID=Ov23liZeIxqNJIiuRw4a
  GITHUB_CLIENT_SECRET=0fb45147d115b0548240232132244319c37af94a
  ```

### 2. Install Dependencies

- It is recommended to use `pnpm` for package installation.

  **Command:**
  ```bash
  pnpm install
  ```

### 3. Start the Server

- Start the Node.js server.

  **Command:**
  ```bash
  npm run start
  ```

## Frontend Setup (AngularJS - Port 4200)

### 1. Install Dependencies

- It is recommended to use `pnpm` for package installation.

  **Command:**
  ```bash
  pnpm install
  ```

### 2. Serve the Project

- Serve the AngularJS project.

  **Command:**
  ```bash
  ng serve
  ```

## Notes

- Ensure that the backend is running on port 3000 and the frontend on port 4200.
- If you encounter any issues, make sure that all dependencies are correctly installed and environment variables are properly configured.

Feel free to reach out if you have any questions or need further assistance.