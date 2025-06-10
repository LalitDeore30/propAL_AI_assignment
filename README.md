# PropAl AI

PropAl AI is a modern web application that revolutionizes how small and medium businesses interact with their customers through intelligent voice AI. Built with Next.js and Tailwind CSS, it offers a beautiful, responsive interface with modern design elements and smooth animations.

![PropAl AI](public/screenshot.png)

## Features

- 🎨 **Modern UI/UX**
  - Animated gradients and particle effects
  - Responsive design for all devices
  - Dark/Light theme support
  - Smooth transitions and hover effects
  - Backdrop blur and glass morphism effects

- 🔐 **Authentication**
  - Secure user signup and login
  - Password hashing with bcryptjs
  - Protected dashboard routes
  - Persistent sessions

- 📱 **Dashboard Features**
  - Intuitive sidebar navigation
  - Profile management
  - Agent configuration with interdependent dropdowns
  - Responsive mobile menu

- 🌐 **Multilingual Support**
  - Support for multiple Indian languages
  - Intelligent AI-powered conversations
  - Scalable architecture

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation with bcryptjs
- **State Management**: React Context
- **Data Storage**: Local Storage & JSON files
- **Animations**: Custom Tailwind animations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/propal-ai.git
cd propal-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
propal-ai/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── agent/
│   │   │   ├── profile/
│   │   │   └── layout.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   └── styles/
├── public/
├── package.json
└── README.md
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape PropAl AI

---

Built with ❤️ by [Your Name/Team]
