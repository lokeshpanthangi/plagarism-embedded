# Plagiarism Detector

## Overview

This project is a semantic plagiarism detection system that leverages state-of-the-art language models to analyze and compare the similarity between multiple text inputs. It is designed for academic, professional, and personal use cases where detecting paraphrased or semantically similar content is crucial.

## Features
- Compare multiple texts for semantic similarity
- Supports OpenAI and Google Gemini embedding models
- Interactive web interface for input and results
- Visual similarity matrix and detailed comparison
- Export results as CSV

## Technologies Used
- React (Vite, TypeScript)
- Tailwind CSS
- OpenAI API
- Google Gemini API

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/plagiarism-detector.git
   cd plagiarism-detector
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and configure your API keys:
   ```bash
   cp example.env .env
   # Edit .env to add your OpenAI and Gemini API keys
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080/` (or another port if 8080 is in use).

## Usage
1. Enter or paste the texts you want to compare (minimum 2, up to 10).
2. Select the embedding model (OpenAI or Google Gemini).
3. Click "Analyze Plagiarism" to compute similarities.
4. View the similarity matrix and detailed results.
5. Export results as CSV if needed.

## Configuration
See [SETUP.md](SETUP.md) for detailed environment variable and API key setup instructions.

## Project Structure
```
├── src/
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Main pages
│   ├── services/           # Embedding and API logic
│   └── App.tsx             # Main app entry
├── public/                 # Static assets
├── .env                    # Environment variables (not committed)
├── package.json            # Project metadata
├── README.md               # Project documentation
└── SETUP.md                # Setup and configuration guide
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
