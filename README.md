# KNS Internet Banking - Bank Account Microservice

A simple micro web service that mimics a "Bank Account" with REST API endpoints for balance queries, deposits, and withdrawals. The service includes a modern React frontend built with Next.js.

## Features

- **Balance Endpoint**: Returns current account balance and transaction summary
- **Deposit Endpoint**: Credits the account with specified amount
- **Withdrawal Endpoint**: Deducts from the account with specified amount
- **Reset Endpoint**: Resets the account balance and daily transaction counters
- **Real-time Transaction Limits**: Shows current usage and remaining limits
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI components

## Transaction Rules

### Deposit Limits
- **Max per transaction**: Kes. 40,000
- **Max per day**: Kes. 150,000
- **Max frequency**: 4 transactions per day

### Withdrawal Limits
- **Max per transaction**: Kes. 20,000
- **Max per day**: Kes. 50,000
- **Max frequency**: 3 transactions per day
- **Balance requirement**: Cannot withdraw more than available balance

## API Endpoints

### GET /api/balance
Returns current balance and detailed transaction summary with limits.

**Response:**
```json
{
  "balance": 50000,
  "error": "null"
}
```

### GET /api/deposit
Deposits money into the account.

**Request Body:**
```json
{
  "amount": 25000
}
```

**Response:**
```json
{
  "balance": 75000,
  "error": null
}
```

### GET /api/withdraw
Withdraws money from the account.

**Request Body:**
```json
{
  "amount": 15000
}
```

**Response:**
```json
{
  "balance": 0,
  "error": null
}
```

### POST /api/reset
Resets the account balance and daily transaction counters.

**Response:**
```json
{
  "balance": 0,
  "error": null
}
```


## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid amount, transaction limits exceeded
- **405 Method Not Allowed**: Using GET instead of POST for mutations
- **500 Internal Server Error**: Server-side errors

**Error Response Example:**
```json
{
  "error": "Exceeded Maximum Deposit Per Transaction"
}
```

## Technology Stack

- **Backend**: Next.js API Routes
- **Frontend**: React with Next.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Vercel KV (Redis)
- **Testing**: Vitest
- **Language**: JavaScript/Node.js

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm, npm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ertush/kns_internet_banking.git
cd kns_internet_banking
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with your Vercel KV configuration:
```env
KV_URL=your-kv-url
KV_REST_API_URL=your-kv-rest-api-url
KV_REST_API_TOKEN=your-kv-rest-api-token
KV_REST_API_READ_ONLY_TOKEN=your-kv-read-only-token
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run
```

## Project Structure

```
src/
├── app/
│   ├── api/           # REST API endpoints
│   │   ├── balance/   # Balance endpoint
│   │   ├── deposit/   # Deposit endpoint
│   │   ├── withdraw/  # Withdrawal endpoint
│   │   └── reset/     # Reset endpoint
│   ├── model/         # Business logic
│   │   └── bank.js    # Bank account model
│   ├── tests/         # Test files
│   │   └── bank.test.js
│   ├── page.js        # Main frontend page
│   └── layout.js      # App layout
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Key Features

### Daily Transaction Reset
The system automatically resets daily transaction counters at midnight, allowing new transactions for the next day.

### Transaction Validation
All transactions are validated against business rules before processing:
- Amount validation
- Daily limits
- Transaction frequency limits
- Balance sufficiency (for withdrawals)

### Enhanced Business Logic
- **Pre-validation**: Check transaction validity before execution
- **Detailed error messages**: Specific error messages with limit information
- **Transaction history**: Complete transaction tracking with timestamps
- **Account statistics**: Comprehensive account overview and usage metrics
- **Flexible reset options**: Reset entire account or just daily counters

### Persistent Storage
Account balance is stored in Vercel KV (Redis) for persistence across server restarts.

### Real-time Updates
The frontend shows real-time transaction limits and usage statistics.

### API Features
- **RESTful design**: Proper HTTP methods and status codes
- **Comprehensive endpoints**: Balance, transactions, validation, and management
- **Error handling**: Detailed error responses with appropriate HTTP status codes
- **Transaction limits**: Enforced daily and per-transaction limits
- **Data validation**: Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests to ensure everything works
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

The application can be deployed to Vercel with zero configuration:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The API endpoints will be available at:
- `http://localhost:3000/api/balance`
- `http://localhost:3000/api/deposit`
- `http://localhost:3000/api/withdraw`
- `http://localhost:3000/api/reset`
