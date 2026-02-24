# 📰 Pratyaksha News - Telugu News Website

A full-stack news website built with **React + Vite** (frontend) and **Node.js + Express** (backend), designed with **production-ready** features.

## 🚀 Quick Start

### Development
```bash
# Terminal 1: Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Production
See [INSTALLATION.md](./INSTALLATION.md) for complete production deployment guide.

## 📁 Project Structure

```
news-website/
├── backend/
│   ├── controllers/        # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, validation, error handling
│   ├── utils/             # Logging utility
│   ├── db/                # Database connection
│   ├── uploads/           # Uploaded files
│   ├── .env.example       # Environment variables template
│   └── server.js          # Express server
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls & error handling
│   │   ├── context/       # Language context
│   │   └── styles/        # CSS styles
│   ├── .env.example       # Environment variables template
│   └── vite.config.js     # Vite configuration
├── PRODUCTION_GUIDE.md    # Production setup guide
├── INSTALLATION.md        # Step-by-step installation
├── PRODUCTION_CHECKLIST.md # Deployment checklist
└── nginx.conf.example     # Nginx configuration

```

## ✨ Features

### ✅ Production-Ready Implementation

#### Backend Security
- ✅ Environment variables for all sensitive data
- ✅ Input validation on all endpoints
- ✅ Error handling middleware
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ CORS properly configured
- ✅ Logging system for audit trail
- ✅ Database connection pooling
- ✅ Proper error responses

#### Frontend Reliability
- ✅ Error boundary component for error handling
- ✅ API error handling with status checks
- ✅ Input validation before API calls
- ✅ Responsive mobile design (all breakpoints)
- ✅ Fixed header with hamburger menu
- ✅ Language toggle (English/Telugu)

#### Database
- ✅ Connection pooling for performance
- ✅ Error handling and recovery
- ✅ Support for transactions
- ✅ MySQL compatibility

#### DevOps Ready
- ✅ Environment-based configuration
- ✅ Logging system for monitoring
- ✅ PM2 ready for process management
- ✅ Nginx configuration provided
- ✅ SSL/HTTPS support
- ✅ Backup procedures documented

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **React Router v7** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication
- **Multer** - File uploads
- **Dotenv** - Environment variables
- **CORS** - Cross-origin requests

## 📖 Documentation

1. **[INSTALLATION.md](./INSTALLATION.md)** - Complete production installation steps
2. **[PRODUCTION_GUIDE.md](./PRODUCTION_GUIDE.md)** - Production deployment guide
3. **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist
4. **[nginx.conf.example](./nginx.conf.example)** - Nginx reverse proxy configuration

## 🔒 Security Features

- ✅ Hardcoded credentials removed
- ✅ Environment-based configuration
- ✅ Input sanitization
- ✅ SQL injection protection via parameterized queries
- ✅ XSS protection with proper headers
- ✅ CSRF prevention with origin validation
- ✅ Rate limiting ready (to be implemented)
- ✅ Authentication with JWT
- ✅ Secure password hashing with bcrypt

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints: 480px, 600px, 768px, 1000px, 1200px
- ✅ Touch-friendly hamburger menu
- ✅ Optimized images for mobile
- ✅ Flexible layouts

## 🚀 Deployment

### Quick Deploy (Development)
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### Production Deploy
```bash
# Follow INSTALLATION.md for complete steps

# Quick Summary:
1. Setup environment variables
2. Run setup-production.sh
3. Install PM2
4. Start services with PM2
5. Configure Nginx
6. Setup SSL with Certbot
```

## 📊 API Endpoints

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/category/:category` - Get news by category
- `POST /api/news` - Create news (requires auth)
- `PUT /api/news/:id` - Update news (requires auth)

### Gallery
- `GET /api/gallery` - Get all galleries
- `POST /api/gallery` - Create gallery (requires auth)
- `PUT /api/gallery/:id` - Update gallery

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos` - Create video (requires auth)

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=pratyaksha_news
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your_secret_key
```

**Frontend (.env)**
```
VITE_API_BASE=https://api.yourdomain.com
VITE_APP_NAME=Pratyaksha News
```

## 📝 License

ISC License - See LICENSE file for details

## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create Pull Request

## 📞 Support

For production support, refer to:
- Error logs in `backend/logs/app.log`
- Database error logs from MySQL
- PM2 monitoring dashboard
- Application documentation

## 🎯 Future Enhancements

- [ ] Advanced caching layer (Redis)
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] CDN integration
- [ ] Full-text search
- [ ] Comment system
- [ ] Social media integration

---

**Status**: ✅ Production Ready

For deployment, see [INSTALLATION.md](./INSTALLATION.md)
