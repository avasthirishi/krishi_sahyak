# Frontend - Krishi Sahayak

This folder contains the React frontend application for Krishi Sahayak.

## 📂 Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components (Header, Footer)
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── data/           # Static data files
│   ├── assets/         # Images, icons
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── style.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── .env                # Environment variables

## 🚀 Quick Start

### Install Dependencies
```powershell
npm install
```

### Development Server
```powershell
npm run dev
```
Access at: http://localhost:5173

### Build for Production
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

## 🔧 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Key Dependencies

- React 19.1.1
- React Router 7.8.0
- Vite 7.1.0
- TailwindCSS 4.1.11
- Axios (for API calls)
- Moment.js (date formatting)

## 🎯 Features

- ✅ User authentication (Login/Signup)
- ✅ User profile management
- ✅ Crop database browser
- ✅ Weather information
- ✅ News articles
- ✅ Research resources
- ✅ Mandi prices
- ✅ Soil testing
- ✅ Business ideas

## 📡 API Integration

API base URL configured in `.env`:
- Development: `http://localhost:5000/api`
- Production: Configure in deployment

## 🎨 Styling

- TailwindCSS for utility classes
- Custom CSS in `style.css`
- Responsive design
- Modern gradient backgrounds

## 🔐 Authentication

JWT-based authentication with:
- Access tokens (15 min expiry)
- Refresh tokens (7 day expiry)
- Automatic token refresh
- Secure storage in localStorage

## 📱 Pages

- `/` - Home
- `/login` - Login
- `/signup` - Signup
- `/profile` - User Profile
- `/crops` - Crop List
- `/crops/:id` - Crop Details
- `/weather` - Weather
- `/news` - News
- `/research` - Research
- `/mandilist` - Mandi Prices
- `/soil` - Soil Testing
- And more...

## 🐛 Troubleshooting

### Port already in use
```powershell
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### API connection failed
- Check backend is running on port 5000
- Verify VITE_API_URL in .env
- Check CORS configuration in backend

## 📖 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
