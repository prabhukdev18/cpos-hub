# CPOS Hub

CPOS Hub is a modern web application built with React, TypeScript, and AWS Amplify Gen 2, providing a secure and scalable platform for managing transactions, payouts, and administrative tasks.

## Features

- 🔐 Secure authentication with AWS Cognito
- 📊 Dashboard for key metrics and insights
- 💳 Transaction management
- 💰 Payout tracking
- 👤 User profile management
- 🛡️ Role-based access control (Admin/User)
- 🎨 Modern, responsive UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22 or later)
- npm (v9 or later)
- AWS CLI (configured with appropriate credentials - `aws login sso`)
- AWS Amplify CLI

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/cpos-com/cpos-hub.git
   cd cpos-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Amplify Sandbox environment:
   ```bash
   npx ampx sandbox
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Environment Setup

Create a `.env` file in the root directory with the following variables:
```
# AWS Configuration
HUB_AWS_REGION=us-east-1

# Analytics Configuration (only required for production/staging)
HUB_AMPLITUDE_API_KEY=your_amplitude_api_key
HUB_ENVIRONMENT=development # or 'staging' or 'production'
```

Note: Analytics tracking is only enabled in staging and production environments when `VITE_AMPLITUDE_API_KEY` is set.

Then initialize the secrets in your sandbox with:
```bash
npx ampx sandbox secret set GOOGLE_CLIENT_ID
npx ampx sandbox secret set GOOGLE_CLIENT_SECRET
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
cpos-hub/
├── src/
│   ├── components/     # React components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── LeftNav.tsx   # Navigation sidebar
│   │   └── ...
│   ├── hooks/         # Custom React hooks
│   ├── assets/        # Static assets
│   └── App.tsx        # Main application component
├── public/           # Public assets
├── tests/            # Test files
└── amplify/          # Amplify configuration
```

## Authentication

The application uses AWS Cognito for authentication. Users can be assigned to different groups:
- `CPOS-Admin`: Full administrative access
- Regular users: Standard access to transactions and payouts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## License

This project is private and wholly owned by CPOS Inc.

## Support

For support, please post a message in the `#ask-development` channel in CPOS Slack.