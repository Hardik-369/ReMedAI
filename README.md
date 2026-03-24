# ReMedAI: AI-Powered Drug Repurposing Platform

![ReMedAI Banner](https://picsum.photos/seed/biotech/1200/400?blur=2)

## 🧬 Overview

**ReMedAI** is a cutting-edge medical research platform that leverages Artificial Intelligence to accelerate the process of drug discovery and repurposing. By combining high-fidelity protein structure prediction with advanced LLM reasoning, ReMedAI helps researchers identify existing FDA-approved drugs that could potentially target new diseases.

The platform integrates **NVIDIA NIM (ESMFold)** for 3D protein structure prediction and **Google Gemini** for deep biochemical reasoning, providing a comprehensive analysis of drug-protein interactions.

---

## ✨ Key Features

- **3D Protein Visualization**: Interactive, high-performance 3D rendering of protein structures using `3dmol.js`.
- **Structure Prediction**: Predict high-resolution 3D protein structures from amino acid sequences via ESMFold.
- **Drug Repurposing Engine**: Identify potential drug candidates for specific diseases using AI-driven matching.
- **AI Reasoning & Analysis**: Detailed explanations of binding mechanisms and therapeutic potential powered by Google Gemini.
- **Secure Authentication**: Robust user management and secure access via Clerk.
- **Premium Motion Design**: Immersive user experience with GSAP and Framer Motion animations.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animations**: GSAP, Framer Motion (motion/react)
- **Icons**: Lucide React
- **3D Rendering**: 3dmol.js, jQuery

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **API Integration**: Axios

### AI & Machine Learning
- **Protein Folding**: NVIDIA NIM (ESMFold API)
- **Reasoning Engine**: Google Gemini 3.1 Pro

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ReMedAI.git
   cd ReMedAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your keys:
   ```env
   GEMINI_API_KEY=your_gemini_key
   NVIDIA_NIM_API_KEY=your_nvidia_nim_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions (cn, etc.)
│   ├── App.tsx           # Main application logic & Dashboard
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles & Tailwind imports
├── server.ts             # Express server & API routes
├── vite.config.ts        # Vite configuration
├── package.json          # Dependencies & scripts
└── README.md             # Project documentation
```

---

## 🧪 Usage

1. **Sign In**: Access the dashboard by signing in through the secure Clerk portal.
2. **Input Data**: Enter a disease name (e.g., "Alzheimer's") or a raw protein sequence in FASTA format.
3. **Analyze**: Click "Run Analysis" to trigger the AI pipeline.
4. **Visualize**: Interact with the 3D protein model—rotate, zoom, and pan to inspect the structure.
5. **Review Results**: Examine the suggested drug candidates and read the AI-generated reasoning for each match.

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgments

- **NVIDIA Health** for the ESMFold NIM API.
- **Google AI** for the Gemini reasoning models.
- **3Dmol.js** for the incredible molecular visualization capabilities.

---
*Developed with ❤️ for the future of medicine.*
