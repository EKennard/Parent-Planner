# PostgreSQL Setup Guide for Parent Planner

## 🗄️ **Local Development Setup**

### **Step 1: Install PostgreSQL**

#### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run installer and remember your superuser password
3. Default settings are usually fine (Port: 5432)

#### Alternative - Using Docker:
```bash
docker run --name parentplanner-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=parentplanner_db -p 5432:5432 -d postgres:15
```

### **Step 2: Create Database**

Open PostgreSQL Command Line (psql) or pgAdmin and run:
```sql
CREATE DATABASE parentplanner_db;
CREATE USER parentplanner_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE parentplanner_db TO parentplanner_user;
```

### **Step 3: Configure Environment Variables**

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your PostgreSQL credentials:
   ```env
   DB_NAME=parentplanner_db
   DB_USER=parentplanner_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ```

### **Step 4: Install Dependencies & Migrate**

```bash
# Activate virtual environment
source .venv/Scripts/activate  # Windows Git Bash
# or
.venv\Scripts\activate.bat     # Windows CMD

# Install new dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## 🚀 **Heroku Deployment**

### **Your Heroku app will automatically:**
1. Use the PostgreSQL addon database
2. Run migrations on each deploy (via `release` command in Procfile)
3. Parse the `DATABASE_URL` environment variable

### **To deploy your changes:**

```bash
# Add and commit changes
git add .
git commit -m "Switch to PostgreSQL database"

# Push to Heroku (replace with your Heroku remote)
git push heroku main

# Or if you're using GitHub integration:
git push origin main
```

### **Manual migration on Heroku (if needed):**
```bash
heroku run python manage.py migrate --app parentplanner-0a7a2e9a2998
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Connection Error**: Check PostgreSQL is running
   ```bash
   # Windows
   services.msc → PostgreSQL service should be "Running"
   
   # Check if PostgreSQL is listening
   netstat -an | findstr 5432
   ```

2. **Authentication Error**: Verify username/password in `.env`

3. **Database doesn't exist**: Create it manually in psql or pgAdmin

4. **Permission errors**: Make sure user has proper privileges

### **Quick Reset (if needed):**
```bash
# Drop and recreate database
dropdb parentplanner_db
createdb parentplanner_db
python manage.py migrate
```

## 📋 **Benefits of PostgreSQL**

✅ **Production-ready** - Same database in development and production  
✅ **Better performance** - Faster than SQLite for complex queries  
✅ **Advanced features** - Full-text search, JSON fields, etc.  
✅ **Concurrent access** - Multiple users can access simultaneously  
✅ **Data integrity** - Better constraint handling and transactions
