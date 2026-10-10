# বাজার দর | BazarDor

**BazarDor** is a modern web application designed to help users explore products, browse categories, and discover product information through a clean and user-friendly interface.

## 🚀 Technologies Used

- **Next.js** — React framework for building the web application
- **React** — Component-based user interface
- **TypeScript** — Type-safe JavaScript development
- **Tailwind CSS** — Responsive and modern UI styling
- **MongoDB** — Database for storing application data
- **Better Auth** — User authentication and account management
- **Vercel** — Deployment and hosting

## ✨ Key Features

1. **User Authentication** — Users can create an account and sign in securely.
2. **Product Browsing** — Explore available products through an organized interface.
3. **Category-Based Navigation** — Browse products by category for easier discovery.
4. **Responsive Design** — Enjoy a consistent experience across mobile, tablet, and desktop devices.
5. **User-Friendly Experience** — Includes loading states, custom 404 pages, and empty states with navigation back to the homepage.

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB connection string

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_DIRECTORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables.

   ```env
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_DB_URL=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_auth_secret
   ```

   Replace the placeholder values with your actual configuration. Never commit secrets or database credentials to GitHub.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ▶️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Run the production server |
| `npm run lint` | Run the linter, if configured |

## 🌐 Deployment

The application can be deployed using [Vercel](https://vercel.com/). Configure the required environment variables in your deployment settings before deploying.

## 📄 License

This project is developed for educational and practical purposes.