# Docut SDK

[![npm version](https://badge.fury.io/js/@docut%2Fnodejs-sdk.svg)](https://badge.fury.io/js/@docut%2Fnodejs-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)

> Official Node.js SDK for Docut API integration

The **Docut SDK** is a TypeScript/JavaScript library that simplifies integration with the Docut API, allowing you to manage links quickly and efficiently in your Node.js applications.

## 🚀 Features

- **Authentication**: Simple integration with API keys
- **TypeScript**: Full TypeScript type support
- **HTTP Client**: HTTP client optimized for the Docut API

## 📦 Installation

```bash
npm install @docut/nodejs-sdk
yarn add @docut/nodejs-sdk
bun add @docut/nodejs-sdk
pnpm add @docut/nodejs-sdk
```

## 🔧 Basic Usage

```typescript
import { DocutSDK } from '@docut/nodejs-sdk';

// Initialize the SDK
const sdk = new DocutSDK('https://docut.xyz/api', 'your-api-key');

// Create a new link
const newLink = await sdk.link.create({
  url: 'https://example.com',
  seo: {
    title: 'My Link',
    description: 'Link description',
  }
});
```

## 🔑 Authentication

The SDK uses API key authentication (`x-api-key` header). Make sure to:

1. Get your API key from the Docut platform
2. Pass the key as the second parameter when initializing the SDK
3. Keep your key secure and don't share it publicly

## 📋 Requirements

- Node.js 18+ or Bun
- TypeScript 5.9+ (recommended)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Check TypeScript types
npm run check-ts

# Run linting
npm run lint

# Build the project
npm run build
```

## 📚 API Documentation

For more details about available endpoints and parameters, see the [official Docut API documentation](https://docut.xyz/docs).

## 🤝 Contributing

Contributions are welcome! Please read the contribution guidelines before submitting a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🔗 Useful Links

- [Docut Website](https://docut.xyz)
- [API Documentation](https://docut.xyz/docs)
- [GitHub Repository](https://github.com/KaikSelhorst/docut-sdk)
- [NPM Package](https://www.npmjs.com/package/@docut/nodejs-sdk)

## 📞 Support

If you encounter any issues or have questions:

- Open a [GitHub issue](https://github.com/KaikSelhorst/docut-sdk/issues)
- Contact us: oficial.kaikselhorst@gmail.com

---

**Docut SDK** - Simplifying integration with the Docut API 🚀