# DevCase - Master POS System

A modern point-of-sale system with product management capabilities built with React, Next.js, and Tailwind CSS.

![DevCase Screenshot](public/screenshot.png)

## Live Demo

Visit the live application: [https://devcase-psi.vercel.app/](https://devcase-psi.vercel.app/)

## Technologies Used

- **Frontend Framework**: React 18
- **Meta Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide Icons
- **Deployment**: Vercel

## Features

- Responsive design for both desktop and mobile views
- Product management (listing, filtering, pagination)
- Dark/Light mode toggle
- User authentication
- Dashboard with statistics
- Sidebar navigation

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git https://github.com/hakangokdev/devcase.git
cd devcase
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Build for Production

```bash
npm run build
# or
yarn build
```

## Development Notes

- The application uses a component-based architecture for better maintainability and reusability
- Responsive design implemented with Tailwind CSS breakpoints
- Custom hooks created for pagination and data fetching
- API integration with axios for product data
- Mobile-first approach for UI components
- SVG icons from Figma integrated directly into the application
- Custom Footer component handles pagination across both mobile and desktop views

## Deployment

The application is deployed on Vercel. Any push to the main branch will trigger an automatic deployment.

## Author

Developed by Hakan Gök

## License

This project is licensed under the MIT License - see the LICENSE file for details 