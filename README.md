# Wallie de Sensei Backend

API server for the Wallie de Sensei treasury streaming protocol. Provides REST endpoints and real-time WebSocket connections for interacting with Wallie de Sensei smart contracts on Stellar.

## Overview

The Wallie de Sensei Backend serves as the middleware layer between the frontend UI and the Soroban smart contracts. It provides:

- RESTful API for contract interaction
- WebSocket support for real-time stream updates
- User authentication and session management
- Recommendation engine for mentor matching
- Database persistence with PostgreSQL
- Redis caching layer

## Related Repositories

- **[wallie-de-sensei-contracts](https://github.com/Wallie-de-sensei/Wallie-de-sensei-Contracts)** — Soroban smart contracts (stream, factory, governance)
- **wallie-de-sensei-frontend** — Dashboard and recipient UI (separate repository)

## Tech Stack

- **Runtime**: Node.js (>= 18.0.0)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis (ioredis)
- **Testing**: Jest with Supertest
- **Security**: Helmet, CORS, express-rate-limit, bcrypt, JWT

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14
- Redis >= 6
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/Wallie-de-sensei/Wallie-de-sensei-Backend.git
cd Wallie-de-sensei-Backend

# Install dependencies
npm install
```

## Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=fluxora
DB_PASSWORD=your_password
DB_NAME=fluxora_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h

# Stellar Network
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
CONTRACT_ADDRESS=your_contract_address_here
```

## Database Setup

Run migrations to set up the database schema:

```bash
npm run migrate
```

## Running the Server

### Development Mode

```bash
npm run dev
```

Server runs with hot-reload on `http://localhost:3000`

### Production Mode

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

The project maintains 95% test coverage threshold across:
- Unit tests
- Integration tests
- Middleware tests
- Route tests
- WebSocket tests

## API Documentation

API documentation is available via OpenAPI specification:

```bash
# View the OpenAPI spec
cat openapi.yaml
```

Key endpoints:
- `POST /api/users/register` — User registration
- `POST /api/users/login` — User authentication
- `GET /api/streams` — List streams
- `GET /api/streams/:id` — Get stream details
- `POST /api/streams/:id/withdraw` — Withdraw from stream
- `GET /api/recommendations` — Get mentor recommendations

WebSocket endpoint:
- `ws://localhost:3000/ws` — Real-time stream updates

See [API_BEHAVIOR.md](./API_BEHAVIOR.md) for detailed API behavior documentation.

## Project Structure

```
wallie-de-sensei-backend/
├── src/
│   ├── config/          # Configuration (database, env)
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware (auth, validation, rate limiting)
│   ├── models/          # TypeORM entities
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utilities (logger, cache, errors, response)
│   ├── websockets/      # WebSocket handlers
│   ├── ws/              # WebSocket hub
│   └── index.ts         # Application entry point
├── tests/               # Test suites
├── database/
│   └── migrations/      # SQL migration files
├── openapi.yaml         # API specification
├── package.json
├── tsconfig.json
└── README.md
```

## Security Features

- **Helmet**: HTTP security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Request throttling per IP
- **JWT Authentication**: Token-based auth
- **Input Validation**: class-validator schemas
- **bcrypt**: Password hashing
- **Request Protection**: Custom middleware for additional security

## Development

### Code Style

The project follows TypeScript best practices:
- Strict type checking enabled
- ESLint configuration (if present)
- Consistent file structure

### Adding New Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Implement changes with tests
3. Ensure tests pass: `npm test`
4. Verify coverage threshold: `npm run test:coverage`
5. Submit PR with description

### Database Migrations

To create a new migration:

```bash
# Create migration file
touch database/migrations/035_your_migration_name.sql

# Write SQL DDL statements
# Run migration
npm run migrate
```

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on the development workflow, branch naming, and testing requirements.

## License

See the root repository for license information.

## Support

For issues and questions:
- Open an issue in the GitHub repository
- Check existing documentation in `/docs`
- Review API behavior documentation: [API_BEHAVIOR.md](./API_BEHAVIOR.md)
