# 🎥 TDS Convert

A premium, professional-grade MP4 to MOV video converter built with a focus on privacy, performance, and modern aesthetics.

## 🚀 Overview

Streamline Converter leverages **WebAssembly (FFmpeg.wasm)** to perform high-performance video transcoding directly in the client's browser. This architectural choice ensures that sensitive video data never leaves the user's local machine, providing absolute privacy and security.

## 💎 Features

- **Local Transcoding**: Powered by FFmpeg.wasm for robust, industry-standard conversion.
- **Privacy First**: 100% client-side processing. No server uploads.
- **Premium UI**: 
  - Glassmorphism design system.
  - Fluid animations powered by Framer Motion.
  - Real-time progress tracking with glowing visual feedback.
- **Performance**: Multi-threaded processing enabled by SharedArrayBuffer (COOP/COEP headers configured).

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Video Engine**: @ffmpeg/ffmpeg (FFmpeg.wasm)
- **Styling**: Vanilla CSS (Custom Variable Design System)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A modern browser (Chrome, Edge, or Firefox)

### Installation

```bash
# Clone the repository
# (No repository yet, local development)

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🌐 Deployment (Vercel)

Este projeto está configurado para ser hospedado na **Vercel**. 

O arquivo `vercel.json` incluído configura os cabeçalhos de segurança necessários (`COOP` e `COEP`) para que o FFmpeg funcione corretamente em produção.

1. Conecte seu repositório à Vercel.
2. Certifique-se de que o **Framework Preset** esteja como `Vite`.
3. Clique em **Deploy**.

## 🔒 Security & Privacy

This application uses **SharedArrayBuffer**, which requires specific security headers:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

These are automatically configured in `vite.config.ts`.

## 👨‍💻 Author

Built with ❤️ by Antigravity AI.
