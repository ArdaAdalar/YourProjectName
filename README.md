# 🛍️ Shopping App

Welcome to the Shopping App, a **React Native** project developed with **Expo**. This app demonstrates a modern e-commerce application using data from [Fake Store API](https://fakestoreapi.com/). It supports user authentication, a light/dark theme toggle, and efficient navigation.

---

## ✨ Features

### Core Functionalities
- **Product Listing**: Fetch and display products dynamically from the [Fake Store API](https://fakestoreapi.com/).
- **User Authentication**: Login functionality with credentials stored securely using `AsyncStorage`.
- **Light/Dark Mode**: User preferences for themes are saved and persist between app sessions.
- **Navigation**: Smooth navigation between screens with React Navigation.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (16+ recommended)
- **Expo CLI**
- A compatible emulator (Android/iOS) or physical device with Expo Go installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<shopping-app>.git
   cd shopping-app

2. Install dependencies:
   npm install
   
4. Start the development server:
   npx expo start
   
🛠️ Project Structure
project-root/
│
├── app/
│   ├── screens/        # All screen components (e.g., HomeScreen, LoginScreen, ProductDetails)
│   ├── components/     # Reusable UI components (e.g., Header, ProductCard)
│   ├── navigation/     # Navigation setup
│   ├── context/        # Theme and authentication context
│   ├── services/       # API calls (e.g., FakeStoreAPI integration)
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
│
└── assets/             # Static assets like images or icons

🔑 Features in Detail

Product Listing
Fetches data from the Fake Store API.
Displays product details such as title, price, category, and image.

User Authentication
Secure login system.
Credentials are stored locally using AsyncStorage.

Theme Support
Light/Dark Mode with persistent settings.
Theme context ensures seamless switching across the app.

Navigation
React Navigation for intuitive navigation between:
Home
Product Details
Login
Settings

🌟 API Integration
This app uses Fake Store API for dynamic product data. Key endpoints include:

Get all products: /products
Get single product: /products/:id
Get product categories: /products/categories

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
