# 🚀 Quick Reference Guide

A fast reference for common tasks and commands in the Hotel Management System.

---

## 📋 Quick Start Commands

### First Time Setup
```bash
# Clone and install
git clone https://github.com/NguyenManhTuan-20235862/ProjectDatabase_NMT.git
cd ProjectDatabase_NMT/server
npm install

# Setup database
psql -U postgres -c "CREATE DATABASE hotel_management;"
psql -U postgres -d hotel_management -f ../database/database.txt

# Configure
cp .env.example .env  # Edit with your settings

# Start
npm run dev
```

### Daily Development
```bash
# Start backend
cd server && npm run dev

# Start frontend (in separate terminal)
python -m http.server 8000
# OR
npx http-server -p 8000
```

---

## 🔑 Default Credentials

### Frontend Login
```
Username: NMT
Password: 12345
```

### Database
```
User: postgres
Password: (set during PostgreSQL installation)
Database: hotel_management
Host: localhost
Port: 5432
```

---

## 📡 API Quick Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Rooms
```bash
# Get all rooms
curl http://localhost:5000/api/rooms

# Get specific room
curl http://localhost:5000/api/rooms/R001

# Update room status
curl -X PUT http://localhost:5000/api/rooms/R001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Occupied"}'
```

### Bookings
```bash
# Get all bookings
curl http://localhost:5000/api/bookings

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "guestId":"G001",
    "roomId":"R001",
    "checkInDate":"2025-01-15",
    "checkOutDate":"2025-01-20",
    "adults":2,
    "children":0,
    "totalAmount":2500000
  }'
```

### Guests
```bash
# Get all guests
curl http://localhost:5000/api/guests

# Create guest
curl -X POST http://localhost:5000/api/guests \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"John Doe",
    "idNumber":"123456789",
    "email":"john@example.com",
    "phone":"0123456789",
    "address":"123 Street",
    "guestType":"Regular"
  }'
```

### Staff
```bash
# Get all staff
curl http://localhost:5000/api/staff

# Get staff statistics
curl http://localhost:5000/api/staff/stats
```

---

## 🗄️ Database Quick Reference

### Connect to Database
```bash
psql -U postgres -d hotel_management
```

### Common Queries
```sql
-- View all tables
\dt

-- View table structure
\d users
\d rooms
\d bookings

-- Count records
SELECT COUNT(*) FROM rooms;
SELECT COUNT(*) FROM bookings;

-- Check room availability
SELECT * FROM rooms WHERE status = 'Available';

-- Recent bookings
SELECT * FROM bookings ORDER BY createdat DESC LIMIT 10;

-- Active bookings
SELECT b.*, g.fullname, r.roomnumber 
FROM bookings b
JOIN guests g ON b.guestid = g.guestid
JOIN rooms r ON b.roomid = r.roomid
WHERE b.status = 'Confirmed'
ORDER BY b.checkindate;
```

### Quick Data Insertion
```sql
-- Insert room type
INSERT INTO roomtypes (typeid, typename, description, baseprice, capacity)
VALUES ('RT001', 'Standard', 'Standard room', 500000, 2);

-- Insert room
INSERT INTO rooms (roomid, roomnumber, typeid, floor, status)
VALUES ('R001', '101', 'RT001', 1, 'Available');

-- Insert guest
INSERT INTO guests (guestid, fullname, idnumber, phone, email)
VALUES ('G001', 'John Doe', '123456789', '0123456789', 'john@example.com');
```

---

## 🛠️ Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql  # Linux
brew services list  # macOS

# Restart PostgreSQL
sudo systemctl restart postgresql  # Linux
brew services restart postgresql  # macOS

# Test connection
psql -U postgres -c "SELECT 1"
```

### Clear Node Cache
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Reset Database
```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE hotel_management;"
psql -U postgres -c "CREATE DATABASE hotel_management;"
psql -U postgres -d hotel_management -f ../database/database.txt
```

---

## 📝 File Locations

### Configuration Files
```
server/.env                 # Environment variables
server/package.json         # Dependencies
database/database.txt       # SQL schema
```

### Code Files
```
server/index.js            # Main server file
server/database.js         # Database connection
server/routes/             # API endpoints
js/                        # Frontend JavaScript
css/                       # Stylesheets
*.html                     # Pages
```

### Documentation
```
README.md                  # Main documentation
PROJECT_REVIEW.md          # Project assessment
SETUP_GUIDE.md            # Installation guide
TESTING_CHECKLIST.md      # Testing guide
RECOMMENDATIONS.md        # Improvement suggestions
QUICK_REFERENCE.md        # This file
```

---

## 🔍 Common Tasks

### Add a New Room
1. **Via Frontend:**
   - Go to Room Management page
   - Click "Thêm phòng mới"
   - Fill in form and save

2. **Via Database:**
```sql
INSERT INTO rooms (roomid, roomnumber, typeid, floor, status)
VALUES ('R999', '999', 'RT001', 9, 'Available');
```

3. **Via API:**
```bash
# Would need to implement POST /api/rooms endpoint first
```

### Create a Booking
1. **Via Frontend:**
   - Go to Bookings page
   - Click "Đặt phòng mới"
   - Select guest and room
   - Set dates and save

2. **Via API:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "guestId":"G001",
    "roomId":"R001",
    "checkInDate":"2025-01-15",
    "checkOutDate":"2025-01-20",
    "adults":2,
    "totalAmount":2500000
  }'
```

### Check-In a Guest
```sql
-- Update booking status
UPDATE bookings 
SET status = 'Completed' 
WHERE bookingid = 'BK001';

-- Update room status
UPDATE rooms 
SET status = 'Occupied' 
WHERE roomid = 'R001';
```

### Check-Out a Guest
```sql
-- Mark booking as checked out
UPDATE bookings 
SET status = 'Completed' 
WHERE bookingid = 'BK001';

-- Update room to needs cleaning
UPDATE rooms 
SET status = 'Maintenance' 
WHERE roomid = 'R001';
```

---

## 📊 Monitoring

### Check Server Health
```bash
# Test if server is running
curl http://localhost:5000/health

# Check API response
curl http://localhost:5000/api/rooms
```

### Database Statistics
```sql
-- Room statistics
SELECT status, COUNT(*) 
FROM rooms 
GROUP BY status;

-- Booking statistics
SELECT status, COUNT(*) 
FROM bookings 
GROUP BY status;

-- Revenue by date
SELECT DATE(createdat) as date, 
       SUM(totalamount) as revenue
FROM bookings 
WHERE status = 'Completed'
GROUP BY DATE(createdat)
ORDER BY date DESC;
```

---

## 🎨 Customization

### Change Colors
Edit `css/style.css`:
```css
:root {
  --primary-color: #1a73e8;    /* Main blue */
  --secondary-color: #34a853;   /* Green */
  --danger-color: #ea4335;      /* Red */
  --warning-color: #fbbc04;     /* Yellow */
}
```

### Change Logo
Edit in each HTML file:
```html
<div class="logo">
    <h2>Your Hotel Name</h2>
</div>
```

### Modify Dashboard Stats
Edit `index.html`:
```html
<div class="card-info">
    <h3>Your Metric</h3>
    <p>Your Value</p>
</div>
```

---

## 🔒 Security Checklist

### Before Deployment
- [ ] Change default passwords
- [ ] Set strong JWT secret
- [ ] Configure production database
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Add rate limiting
- [ ] Enable Helmet.js
- [ ] Review `.env` variables
- [ ] Remove debug logs
- [ ] Test all endpoints

---

## 🚀 Deployment Quick Start

### Using Heroku
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku open
```

### Using Docker
```bash
docker build -t hotel-management .
docker run -p 5000:5000 hotel-management
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=80
DB_HOST=your-production-db
DB_PASSWORD=strong-password
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain.com
```

---

## 📞 Quick Help

### Get Help
- Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Check [PROJECT_REVIEW.md](PROJECT_REVIEW.md)
- Review [RECOMMENDATIONS.md](RECOMMENDATIONS.md)
- Open GitHub issue

### Useful Commands
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check PostgreSQL version
psql --version

# List running processes
ps aux | grep node

# Check disk space
df -h

# Check memory
free -h
```

---

## ⚡ Performance Tips

### Speed Up Development
```bash
# Use nodemon for auto-restart
npm run dev

# Use Live Server in VS Code
# Right-click HTML → Open with Live Server
```

### Optimize Database
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_bookings_dates ON bookings(checkindate, checkoutdate);
```

### Cache Frequently Accessed Data
```javascript
// Implement caching in future
// See RECOMMENDATIONS.md for details
```

---

## 📚 Learning Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Node.js Docs](https://nodejs.org/docs/)
- [Chart.js Docs](https://www.chartjs.org/docs/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [pgAdmin](https://www.pgadmin.org/) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Code editor

---

## ✅ Daily Checklist

### Before Starting Work
- [ ] Pull latest changes (`git pull`)
- [ ] Start PostgreSQL
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Check for errors in console

### Before Committing
- [ ] Test changes locally
- [ ] Check for syntax errors
- [ ] Update documentation if needed
- [ ] Write descriptive commit message
- [ ] Push to repository

---

**Keep this guide handy for quick reference! 📌**

*Last updated: 2025*
