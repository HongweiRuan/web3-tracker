# Web3 Tracker

A full-stack application for querying Ethereum address balances, using Go as the backend and React + TypeScript as the frontend.

## 📋 Project Overview

This is a simple Web3 application that allows you to query account balances via Ethereum addresses. The backend connects to Ethereum mainnet through Alchemy API, while the frontend provides a user-friendly interface.

## 🛠 Tech Stack

### Backend

- **Go 1.25.5**
- **Gin** - Web framework
- **Resty** - HTTP client
- **Alchemy API** - Ethereum node service

### Frontend

- **React 19**
- **TypeScript**
- **ethers.js** - Ethereum library
- **React Scripts** - Build tool

## 📦 Project Structure

```
web3-tracker/
├── backend/          # Go backend service
│   ├── main.go      # Main entry point
│   ├── go.mod       # Go dependency management
│   └── go.sum       # Dependency version lock
├── frontend/         # React frontend app
│   ├── public/      # Static assets
│   ├── src/         # Source code
│   │   ├── App.tsx  # Main component
│   │   └── index.tsx
│   ├── package.json # Frontend dependencies
│   └── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Go** 1.25 or higher
- **Node.js** 16 or higher
- **npm** or **yarn**
- **Alchemy API Key** (get it from [Alchemy](https://www.alchemy.com/))

### 1️⃣ Configure Alchemy API

Create a `.env` file in the `backend/` directory (you can copy from `.env.example`):

```bash
cd backend
cp .env.example .env
```

Then edit the `.env` file and add your Alchemy API URL:

```
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### 2️⃣ Install Dependencies

#### Backend Dependencies

```bash
cd backend
go mod download
```

#### Frontend Dependencies

```bash
cd frontend
npm install
# or
yarn install
```

### 3️⃣ Start the Application

#### Start Backend Service

Run from the project root or `backend` directory:

```bash
cd backend
# Make sure you've created and configured the .env file first
go run main.go
```

The backend service will start at `http://localhost:8080`

#### Start Frontend Service

In a new terminal window, navigate to the `frontend` directory:

```bash
cd frontend
npm start
# or
yarn start
```

The frontend app will start at `http://localhost:3000` and automatically open in your browser

## 💡 Usage

1. Make sure both the backend service (port 8080) and frontend service (port 3000) are running
2. Open `http://localhost:3000` in your browser
3. Enter an Ethereum address in the input field (must start with `0x`)
4. Click the "Query Balance" button
5. The app will display the ETH balance for that address

### Sample Addresses

You can use the following addresses for testing:

- Vitalik Buterin's address: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Ethereum Foundation: `0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe`

## 🔧 Development Notes

### API Endpoints

#### GET `/api/balance/:address`

Query the balance of a specific Ethereum address

**Parameters:**

- `address` (path parameter): Ethereum address (must start with 0x)

**Response Example:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1234567890abcdef"
}
```

### CORS Configuration

The backend has CORS configured to allow cross-origin requests from the frontend. To modify, edit the CORS middleware in `backend/main.go`.

## 📝 Building for Production

### Build Frontend

```bash
cd frontend
npm run build
# or
yarn build
```

The built files will be in the `frontend/build` directory

### Build Backend

```bash
cd backend
go build -o web3-tracker-server main.go
```

The generated executable can be run directly:

```bash
./web3-tracker-server
```

## 🐛 Troubleshooting

### Backend Won't Start

- Check if Go version is correct
- Confirm port 8080 is not occupied
- Verify Alchemy API URL is correct

### Frontend Can't Connect to Backend

- Confirm backend service is running
- Check browser console for CORS errors
- Verify backend address is `http://localhost:8080`

### Query Failed

- Confirm the address format is correct (starts with 0x)
- Check if Alchemy API quota is exhausted
- Check backend console for error logs
