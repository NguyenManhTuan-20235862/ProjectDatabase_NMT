# 🏨 Hotel Management System - Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

### Required Software
- **Node.js**: v14.0.0 or higher
- **PostgreSQL**: v12.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Git**: For version control

### Recommended System Specs
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for application and dependencies
- **OS**: Windows 10/11, macOS 10.14+, or Linux (Ubuntu 18.04+)

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/NguyenManhTuan-20235862/ProjectDatabase_NMT.git
cd ProjectDatabase_NMT
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- express@5.1.0
- pg@8.16.3
- bcrypt@6.0.0
- cors@2.8.5
- dotenv@17.2.2

### Step 3: Install PostgreSQL

#### Windows
1. Download PostgreSQL from [official website](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Set password for postgres user (remember this!)
4. Keep default port 5432
5. Install pgAdmin 4 (included)

#### macOS
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## 🗄️ Database Setup

### Step 1: Create Database

#### Using psql command line:
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hotel_management;

# Exit
\q
```

#### Using pgAdmin:
1. Open pgAdmin 4
2. Connect to PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `hotel_management`
5. Click "Save"

### Step 2: Create Database Schema

```bash
# Login to the database
psql -U postgres -d hotel_management

# Copy and paste the contents from database/database.txt
# Or run from file:
\i /path/to/database/database.txt
```

### Step 3: Verify Tables Created

```sql
-- List all tables
\dt

-- Should show:
-- users
-- roomtypes
-- rooms
-- guests
-- servicecategories
-- services
-- bookings
-- bookingservices
-- payments
-- maintenance
```

### Step 4: Create Initial Admin User

```sql
-- Insert admin user (password: admin123)
INSERT INTO Users (UserID, Username, Password, FullName, Email, Phone, Role, Status)
VALUES (
    'U001',
    'admin',
    '$2b$10$rKqKGqJqMZmZQj3zGXM3yuvxGGxvXqVmVmVZGXM3yuvxGGxvXqVmV', -- hashed 'admin123'
    'System Administrator',
    'admin@hotel.com',
    '0123456789',
    'Admin',
    'Active'
);
```

---

## ⚙️ Configuration

### Step 1: Configure Backend Environment

1. Navigate to the `server` folder
2. Edit the `.env` file:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management

# Server Configuration
PORT=5000

# Optional: JWT Secret (for future implementation)
# JWT_SECRET=your_secret_key_here
```

**Important:** Replace `your_postgres_password` with your actual PostgreSQL password.

### Step 2: Configure Frontend (Optional)

The frontend is configured to work with localhost by default. If you need to change the API endpoint:

Edit the API base URL in JavaScript files (if needed):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🚀 Running the Application

### Method 1: Development Mode (Recommended for testing)

#### Terminal 1 - Backend Server:
```bash
cd server
npm run dev
```

You should see:
```
Server is running on port 5000
```

#### Terminal 2 - Frontend Server:
```bash
# From project root
# Option A: Using Python
python -m http.server 8000

# Option B: Using Node.js http-server
npx http-server -p 8000

# Option C: Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### Method 2: Production Mode

```bash
cd server
npm start
```

### Accessing the Application

1. Open your web browser
2. Navigate to: `http://localhost:8000`
3. You should see the login page

### Default Login Credentials

**Username:** `NMT`  
**Password:** `12345`

Or use the admin user you created in the database.

---

## 🧪 Testing

### Test Backend API

```bash
# Test server health (after implementing health endpoint)
curl http://localhost:5000/

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test rooms endpoint
curl http://localhost:5000/api/rooms
```

### Test Frontend Features

1. **Login**
   - Navigate to login page
   - Enter credentials
   - Verify redirect to dashboard

2. **Dashboard**
   - Check if statistics load
   - Verify charts render
   - Test task checkboxes

3. **Room Management**
   - Try adding a new room
   - Test filtering
   - Edit existing room

4. **Bookings**
   - Create new booking
   - Check calendar view
   - Test status updates

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Error:** `connection to server at "localhost" (127.0.0.1), port 5432 failed`

**Solutions:**
- Check if PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `.env` file
- Check PostgreSQL port: `netstat -an | grep 5432`
- Ensure database exists: `psql -U postgres -l`

#### 2. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### 3. Module Not Found

**Error:** `Error: Cannot find module 'express'`

**Solution:**
```bash
cd server
npm install
```

#### 4. CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Ensure backend CORS is configured (already done in server/index.js)
- Check if frontend and backend are on different origins
- Verify CORS middleware is loaded before routes

#### 5. Login Not Working

**Possible causes:**
- Database not seeded with users
- Password hashing mismatch
- Frontend not connected to backend

**Solutions:**
- Check if users exist in database: `SELECT * FROM users;`
- Verify backend is running
- Check browser console for errors
- Use hardcoded credentials: `NMT` / `12345`

#### 6. Charts Not Displaying

**Cause:** Chart.js not loaded

**Solution:**
- Check internet connection (Chart.js loads from CDN)
- Verify script tag in HTML: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`

---

## 📁 Project Structure

```
ProjectDatabase_NMT/
├── index.html              # Dashboard
├── login.html              # Login page
├── rooms.html              # Room management
├── bookings.html           # Booking system
├── guests.html             # Guest management
├── services.html           # Services
├── staff.html              # Staff management
├── reports.html            # Reports
├── settings.html           # Settings
├── css/                    # Stylesheets
├── js/                     # Frontend JavaScript
├── images/                 # Images and assets
├── server/
│   ├── index.js           # Express server
│   ├── database.js        # DB connection
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
└── database/
    └── database.txt       # SQL schema
```

---

## 🔒 Security Notes

### For Development
- Default credentials are set for easy testing
- `.env` file contains sensitive data (not committed to Git)

### For Production
1. **Change all default passwords**
2. **Use strong JWT secrets**
3. **Enable HTTPS**
4. **Set secure CORS origins**
5. **Implement rate limiting**
6. **Enable SQL injection protection** (already using parameterized queries)
7. **Add input validation**
8. **Set up firewalls**
9. **Regular security audits**

---

## 📚 Additional Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [pgAdmin 4](https://www.pgadmin.org/) - Database management
- [VS Code](https://code.visualstudio.com/) - Code editor

### Extensions (VS Code)
- Live Server - For serving HTML files
- PostgreSQL - Database management
- ESLint - JavaScript linting
- Prettier - Code formatting

---

## 🎯 Next Steps

After successful setup:

1. **Explore the Application**
   - Try all features
   - Create test bookings
   - Add sample rooms

2. **Customize**
   - Change branding
   - Adjust color scheme
   - Add your hotel's data

3. **Enhance**
   - Add more features
   - Implement suggestions from PROJECT_REVIEW.md
   - Add automated testing

4. **Deploy**
   - Choose hosting provider (Heroku, AWS, DigitalOcean)
   - Set up production database
   - Configure domain and SSL

---

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review error messages carefully
3. Check browser console (F12) for frontend errors
4. Check terminal for backend errors
5. Verify database connection
6. Consult project documentation

---

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] PostgreSQL installed and running
- [ ] Database created
- [ ] Schema applied
- [ ] Admin user created
- [ ] Backend dependencies installed
- [ ] `.env` file configured
- [ ] Backend server starts successfully
- [ ] Frontend accessible in browser
- [ ] Can login with credentials
- [ ] Dashboard loads correctly
- [ ] All features accessible

**If all items are checked, you're ready to use the Hotel Management System! 🎉**

---

*Last Updated: 2025*  
*Version: 1.0*
