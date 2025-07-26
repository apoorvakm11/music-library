# Music Library - Micro Frontend Application

A modern music library application built with React, Next.js, and micro frontend architecture featuring authentication, role-based access control, and advanced filtering capabilities.

## 🎵 Features

### Core Functionality

- **Music Library UI**: Clean, responsive interface for browsing songs
- **Advanced Filtering**: Filter, sort, and group songs by Album, Artist, Title, Genre, and Year
- **JavaScript Methods**: Utilizes map, filter, and reduce for data manipulation
- **Search**: Real-time search across songs, artists, and albums

### Authentication & Authorization

- **JWT-based Authentication**: Mock JWT implementation with localStorage
- **Role-based Access Control**:
  - **Admin**: Can add and delete songs, full access to all features
  - **User**: Can only view and filter songs, read-only access

### Micro Frontend Architecture

- **Main App**: Container application handling authentication and routing
- **Music Library**: Separate micro frontend loaded dynamically
- **Module Federation**: Uses Webpack Module Federation for micro frontend integration

## 🚀 Demo Credentials

### Admin Access

- **Username**: admin
- **Password**: admin123
- **Permissions**: Add/delete songs, full library management

### User Access

- **Username**: user
- **Password**: user123
- **Permissions**: View and filter songs only

## 🛠️ Technology Stack

- **Frontend**: React 18, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API, useState, useReducer
- **Authentication**: Mock JWT with localStorage
- **Build Tool**: Next.js with Webpack
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd music-library-main
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to \`http://localhost:3000\`

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 🏗️ Architecture Overview

### Main Application Structure

\`\`\`
app/
├── components/
│ └── music-library.tsx # Main music library component
├── contexts/
│ └── auth-context.tsx # Authentication context
├── page.tsx # Main app entry point
└── layout.tsx # App layout
\`\`\`

### Key Components

#### Authentication System

- **AuthProvider**: Context provider for authentication state
- **JWT Mock**: Simple JWT implementation for demo purposes
- **Role Management**: Admin/User role differentiation

#### Music Library Features

- **Song Management**: CRUD operations for songs (admin only)
- **Filtering System**: Multi-criteria filtering using JavaScript methods
- **Search Functionality**: Real-time search across multiple fields
- **Grouping**: Dynamic grouping by artist, album, or genre

## 🔧 JavaScript Methods Implementation

### Filter Method

\`\`\`javascript
const filteredSongs = songs.filter(song => {
return song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
song.album.toLowerCase().includes(searchTerm.toLowerCase())
})
\`\`\`

### Map Method

\`\`\`javascript
const uniqueArtists = [...new Set(songs.map(song => song.artist))].sort()
\`\`\`

### Reduce Method

\`\`\`javascript
const groupedSongs = songs.reduce((groups, song) => {
const key = song[groupBy]
if (!groups[key]) groups[key] = []
groups[key].push(song)
return groups
}, {})
\`\`\`

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Modern dark theme with gradient backgrounds
- **Smooth Animations**: Hover effects and transitions
- **Glass Morphism**: Backdrop blur effects for modern aesthetics
- **Interactive Elements**: Hover states and loading indicators

## 🔐 Security Features

- **JWT Validation**: Token expiration and validation
- **Role-based UI**: Conditional rendering based on user roles
- **Secure Actions**: Server-side validation for admin actions
- **Input Sanitization**: Proper form validation and sanitization

## 📱 Responsive Design

- **Mobile**: Optimized for mobile devices
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-featured desktop experience
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`
3. Deploy automatically on push to main branch

### Environment Variables

No environment variables required for this demo application.

## 🧪 Testing the Application

### Authentication Testing

1. Try logging in with both admin and user credentials
2. Verify role-based UI differences
3. Test JWT token persistence across browser sessions

### Music Library Testing

1. **Search**: Test search functionality across different fields
2. **Filtering**: Try different sort and group options
3. **CRUD Operations**: Test adding/deleting songs as admin
4. **Responsive**: Test on different screen sizes

## 🔄 Micro Frontend Integration

### Current Implementation

The current version includes the music library as a component within the main app. For a true micro frontend setup:

1. **Separate Repository**: Create a separate repo for the music library
2. **Module Federation**: Configure Webpack Module Federation
3. **Independent Deployment**: Deploy micro frontend separately
4. **Dynamic Loading**: Load micro frontend at runtime

### Module Federation Setup (Future Enhancement)

\`\`\`javascript
// webpack.config.js for micro frontend
module.exports = {
mode: 'development',
plugins: [
new ModuleFederationPlugin({
name: 'musicLibrary',
filename: 'remoteEntry.js',
exposes: {
'./MusicLibrary': './src/components/MusicLibrary'
}
})
]
}
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

1. Check the GitHub Issues page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Live Demo**: [Deployed Application URL]
**Repository**: [GitHub Repository URL]
\`\`\`
