# 🏥 SmartRx - Intelligent Pharmacy Management System
📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

Overview

SmartRx is a modern, full-stack pharmacy management system designed to streamline medicine ordering, prescription management, and health tracking. The platform combines cutting-edge AI technology with an intuitive user interface to provide a seamless healthcare experience.

Key Highlights

Smart Search AI-powered medicine search with autocomplete
Prescription Scanner: OCR-based prescription text extraction using Tesseract.js
Category Browsing: Browse medicines and vitamins by category
AI Assistant: Gemini AI-powered health assistant for symptom checking
Shopping Cart: Add medicines to cart with instant feedback
Pharmacy Locator: Find nearby pharmacies using geolocation
Secure Authentication: Firebase-based user authentication

---

## ✨ Features

### Frontend Features

- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Category Navigation**: Browse medicines by categories (Pain Relief, Antibiotics, etc.)
- **Vitamins Section**: Dedicated page for vitamins and supplements
- **Product Cards**: Rich product information with pricing, stock status, and bulk pricing
- **Search Functionality**: Real-time search with backend integration
- **Prescription Upload**: Camera-based prescription scanning with OCR
- **AI Chat Assistant**: Interactive health assistant for symptom analysis
- **Order Tracking**: Track active orders and view order history

### Backend Features

- **RESTful API**: Express.js-based REST API
- **MongoDB Integration**: Mongoose ODM for data persistence
- **Product Management**: CRUD operations for medicines
- **Category Filtering**: Filter products by category
- **Search API**: Text-based search across product names and manufacturers
- **AI Integration**: Google Gemini AI for health assistance
- **Authentication**: Secure user authentication with bcrypt

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.12.0
- **Animations**: Framer Motion 12.26.1
- **Icons**: Lucide React 0.562.0
- **OCR**: Tesseract.js 7.0.0
- **3D Graphics**: OGL 1.0.11
- **Authentication**: Firebase 12.7.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.2
- **AI**: Google Generative AI 0.24.1
- **Security**: bcryptjs 3.0.3
- **Environment**: dotenv 17.2.3
- **CORS**: cors 2.8.5

---

## 📁 Project Structure

```
WinterHackathon-SmartRx/
├── backend/
│   ├── models/
│   │   ├── Product.js          # Medicine product schema
│   │   ├── User.js             # User authentication schema
│   │   └── geminiClient.js     # AI client configuration
│   ├── routes/
│   │   ├── productRoutes.js    # Product API endpoints
│   │   ├── auth.js             # Authentication routes
│   │   ├── aiRoutes.js         # AI assistant routes
│   │   └── prescription.js     # Prescription handling
│   ├── data/                   # CSV data files
│   ├── server.js               # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx              # Navigation header
│   │   │   ├── ProductCard.jsx         # Product display card
│   │   │   ├── SearchBar.jsx           # Search component
│   │   │   ├── CategoriesSection.jsx   # Category cards
│   │   │   ├── AIAssistantWidget.jsx   # AI chat widget
│   │   │   ├── CameraScanner.jsx       # Prescription scanner
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── SearchResults.jsx       # Search results page
│   │   │   ├── CategoriesPage.jsx      # All categories
│   │   │   ├── CategoryProductsPage.jsx # Category products
│   │   │   ├── VitaminsPage.jsx        # Vitamins listing
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── Signup.jsx              # Registration page
│   │   │   └── Assistant.jsx           # AI assistant page
│   │   ├── firebase/
│   │   │   └── firebaseConfig.js       # Firebase setup
│   │   ├── App.jsx                     # Main app component
│   │   └── main.jsx                    # Entry point
│   ├── public/                         # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── logic/                      # Business logic modules
├── pharmacy_csv_upload/        # Data import scripts
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   MONGO_URI=mongodb://localhost:27017/smartrx
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## 💻 Usage

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**
   - Open browser and navigate to `http://localhost:5173`
   - Create an account or login
   - Start browsing medicines!

### Key User Flows

#### 1. Browse Medicines by Category
- Click on "Medicines" card on home page
- Select a category (e.g., "Pain Relief")
- View products and add to cart

#### 2. Browse Vitamins
- Click on "Vitamins" card on home page
- Browse 9+ vitamin products
- Add to cart with instant feedback

#### 3. Search for Medicines
- Use the search bar on home page
- Type medicine name (e.g., "Paracetamol")
- View search results with filters

#### 4. Upload Prescription
- Click "Upload Prescription" in Quick Actions
- Capture or upload prescription image
- OCR extracts text automatically
- Confirm and search for medicines

#### 5. AI Health Assistant
- Click on AI Assistant widget
- Describe symptoms
- Get AI-powered health recommendations

---

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/search/:query` | Search products |
| GET | `/api/products/category/:category` | Get products by category |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/:id` | Get product by ID |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |

### AI Assistant

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | Send message to AI assistant |

### Prescription

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/prescription/upload` | Upload prescription |

---

## 📸 Screenshots

### Home Page
Modern landing page with category cards, search bar, and AI assistant widget.

### Category Browsing
Browse medicines organized by medical categories with detailed product cards.

### Vitamins Page
Dedicated section for vitamins and supplements with 9+ products.

### Search Results
Real-time search with product filtering and sorting options.

### AI Assistant
Interactive chat interface powered by Google Gemini AI.

---

## 🎯 Features in Detail

### Add to Cart Functionality
- Click "Add to Cart" on any product
- Instant alert confirmation
- Console logging for debugging
- Works on all product pages

### Prescription Scanner
- Camera-based image capture
- Tesseract.js OCR processing
- Text extraction and validation
- Automatic search initiation

### Category System
- Pain Relief
- Antibiotics
- Vitamins & Supplements
- Diabetes Care
- Heart & Blood Pressure
- And more...

### Product Information
- Product name and manufacturer
- Packaging details
- Pricing (regular and bulk)
- Stock availability
- Ratings and reviews

---

## 🔐 Security Features

- Firebase Authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable protection
- Secure API endpoints

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Winter Hackathon Team** - SmartRx Development

