# Open Convert

[![Netlify Status](https://api.netlify.com/api/v1/badges/064398f9-9fc3-4dac-993d-bc6f5bcee493/deploy-status)](https://app.netlify.com/projects/open-convert/deploys)

Fast, free, and secure file conversion in your browser. Convert images, videos, audio files, and documents instantly without uploading to any server.

## ✨ Features

- **🖼️ Image Conversion**: PNG, JPG, JPEG, WebP, GIF, BMP, ICO, SVG
- **🎬 Video Conversion**: MP4, WebM, AVI, MOV, MKV, FLV, WMV
- **🎵 Audio Conversion**: MP3, WAV, OGG, AAC, M4A, FLAC, WMA
- **📄 Document Conversion**: PDF, DOCX, TXT, HTML, XLSX, CSV, JSON, XML
- **⚡ Fast Processing**: All conversions happen locally in your browser
- **🔒 Privacy**: No files are uploaded to any server - everything stays on your device
- **∞ No Limits**: Convert as many files as you want without restrictions
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌙 Dark Mode**: Beautiful dark mode support for comfortable viewing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Modern browser with WebAssembly support

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
open-convert/
├── app/
│   ├── components/          # Reusable Vue components
│   │   ├── AppLogo.vue
│   │   ├── ConversionCard.vue
│   │   ├── FileUploader.vue
│   │   └── PopularConversions.vue
│   ├── composables/         # Composition API logic
│   │   └── useFileConverter.ts
│   ├── pages/               # Route pages
│   │   ├── index.vue
│   │   ├── about.vue
│   │   ├── formats.vue
│   │   └── [...conversion].vue
│   ├── utils/               # Utility functions
│   │   ├── formats.ts
│   │   └── getters.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── assets/              # Static assets
│   │   └── css/
│   │       └── main.css
│   ├── app.vue              # Root component
│   └── app.config.ts        # App configuration
├── public/                  # Public static files
│   └── ffmpeg/              # FFmpeg WASM files
├── nuxt.config.ts           # Nuxt configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
└── package.json             # Project dependencies
```

## 🛠️ Technology Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - Vue 3 meta-framework
- **UI Library**: [@nuxt/ui](https://ui.nuxt.com/) - Tailwind CSS components
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Video/Audio Processing**: [FFmpeg.wasm](https://ffmpegwasm.netlify.app/)
- **Document Processing**: 
  - [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
  - [SheetJS](https://sheetjs.com/) - Excel/CSV handling
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📖 Usage

### Image Conversion

Navigate to `/png-to-jpg` or use the web interface to select source and target formats. Drop or select images, and they're converted instantly using the Canvas API.

### Video/Audio Conversion

Video and audio conversions use FFmpeg.wasm for client-side processing. Navigate to the desired conversion path (e.g., `/mp4-to-webm`), upload your file, and conversion begins automatically.

### Document Conversion

Supported document conversions:
- Text formats → PDF (TXT, HTML)
- Excel/CSV → CSV or JSON (using SheetJS)
- Text-to-text conversions (JSON, XML, HTML, CSV, TXT)

## 🎨 Key Components

### `useFileConverter()`
Main composable handling all file conversion logic. Supports:
- Image conversion via Canvas API
- Video/Audio conversion via FFmpeg.wasm
- Document conversion via specialized libraries

### `ConversionCard.vue`
Displays individual file conversion status, progress bar, and action buttons (convert, download, remove).

### `FileUploader.vue`
Drag-and-drop file upload interface with visual feedback.

### `PopularConversions.vue`
Quick access links to frequently used conversion types.

## 🌐 Available Routes

- `/` - Home page with popular conversions
- `/formats` - Browse all supported formats
- `/about` - Information about the project
- `/<from>-to-<to>` - Dynamic conversion page (e.g., `/png-to-jpg`)

## ⚙️ Configuration

### Environment Variables
None required - the app works out of the box!

### FFmpeg Configuration
FFmpeg WASM files are served from `/public/ffmpeg/`. Ensure these files are available when deploying:
- `ffmpeg-core.js`
- `ffmpeg-core.wasm`
- `ffmpeg-core.worker.js`

## 📊 File Size Limits

File conversion limits depend on available browser memory, typically:
- Images: Up to 100MB
- Audio: Up to 500MB
- Video: Up to 1GB
- Documents: Up to 50MB

## 🔍 Development

### Scripts

```bash
# Development server with hot reload
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Production build
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code style enforcement
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

This creates a production-optimized build in the `.output` directory.

### Deploy to Static Host

The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- CloudFlare Pages

### Important Headers

Ensure your deployment includes these security headers:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

These are required for FFmpeg.wasm to function correctly with SharedArrayBuffer.

## 📝 Supported Formats

### Images
PNG, JPG, JPEG, WebP, GIF, BMP, ICO, SVG

### Video
MP4, WebM, AVI, MOV, MKV, FLV, WMV

### Audio
MP3, WAV, OGG, AAC, M4A, FLAC, WMA

### Documents
PDF, DOCX, DOC, TXT, HTML, XLSX, XLS, CSV, JSON, XML

## 🔒 Privacy & Security

- **100% Client-Side Processing**: No data leaves your device
- **No Account Required**: Use the service without registration
- **No Tracking**: We don't track or store user data
- **Open Source**: Code is transparent and auditable

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips & Tricks

### Quick Conversions
Use the format-specific URLs for quick access:
- `open-convert.com/png-to-jpg`
- `open-convert.com/mp3-to-wav`
- `open-convert.com/pdf-to-excel`

### Batch Conversions
Upload multiple files at once and they'll be queued for conversion automatically.

### Large Files
For very large files, ensure your browser has sufficient memory. Close other tabs if needed.

## 🐛 Troubleshooting

### FFmpeg Loading Issues
- Ensure FFmpeg files are accessible in `/public/ffmpeg/`
- Check browser console for detailed error messages
- Try a different browser or clear cache

### Conversion Failures
- Check file format is supported
- Ensure file is not corrupted
- Try a smaller file to test
- Check browser DevTools console for errors

### Performance Issues
- Close unnecessary browser tabs
- Use a browser with good WebAssembly support (Chrome, Firefox, Edge)
- Reduce file size if possible

## 📞 Support

For issues, questions, or suggestions, please open an issue on the project repository.

## 🙏 Acknowledgments

- [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) for video/audio processing
- [Nuxt](https://nuxt.com/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- All open-source libraries that make this project possible
