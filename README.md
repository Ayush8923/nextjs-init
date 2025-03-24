# Unos y Otros-Frontend

## About

Unos y Otros-Frontend is the web application for Unos y Otros, a platform designed to foster meaningful connections through the shared experience of cigar smoking. Built using Next.js, this frontend provides an intuitive and interactive user interface for tracking, sharing, and reflecting on cigar collections and experiences. It communicates with the Unos y Otros backend to deliver a seamless user experience, integrating features such as authentication, data visualization, and social interactions.

## Getting started

### Running locally

#### Pre-requisite

1. Make sure you have the [uyo-backend](https://github.com/coloredcow-admin/uyo-backend/blob/main/README.md) is setup and running.
2. Ensure you have Node.js installed (version requires Node.js >=18.18.0).

#### Installation steps

1. Clone the repository:

   ```sh
   git clone https://github.com/coloredcow-admin/uyo-frontend.git
   ```

2. . Navigate into the project directory:
   ```sh
   cd uyo-frontend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Configure environment variables:

   - Copy `.env.example` to `.env` and configure as needed.

     ```ini
     # If hosted using "serve"
     NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
     ```

5. Ensure pre-commit hooks are correctly set up. If they are not working, run the following command:

   ```sh
   npx husky install
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

8. Familiarize yourself with the project structure.
   - `src/app`: Contains the main application code.
   - `src/components`: Contains Next.js components.
   - `src/hooks`: Contains custom hooks.
   - `src/lib`: Contains utility functions.
