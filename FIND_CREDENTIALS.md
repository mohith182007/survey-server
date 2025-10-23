# 🔍 How to Find Your Database Username & Password

## Your Database ID
```
dpg-d3sqbl7gi27c73drmh20-a
```

---

## 📍 Where to Find Your Credentials

### Step 1: Go to Render Dashboard
```
https://dashboard.render.com
```

### Step 2: Find Your Database

```
Render Dashboard
└── Databases (or click on "Databases" tab)
    └── Look for your database
        └── You should see: "survey_db" (or similar name)
```

---

## 📺 What You'll See on Database Page

```
┌─────────────────────────────────────────────────────┐
│ survey_db                                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Status: Available                            ✅    │
│ Region: Ohio (or your region)                     │
│ Created: Oct 23, 2025                            │
│                                                     │
│ ─────── Connections ────────                      │
│                                                     │
│ User                                              │
│ survey_admin                    ← COPY THIS!      │
│                                                     │
│ Password                                          │
│ a8Kx3pL8mN9qR2sT5uV...          ← COPY THIS!    │
│                                                     │
│ Host (Internal)                                   │
│ dpg-d3sqbl7gi27c73drmh20-a.render.internal        │
│                                                     │
│ Database                                          │
│ survey_db                       ← This matches!   │
│                                                     │
│ Port                                              │
│ 5432                            ← Always this     │
│                                                     │
│ ─────── Or Use Full Connection String ────────    │
│                                                     │
│ Internal Database URL                             │
│ postgresql://survey_admin:a8K...@dpg-d3sqb...    │
│ [Copy button]                   ← OR COPY THIS!   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ✅ What You Need to Copy

### Option A: Copy Individual Fields (Easy)
1. Click on **User** field → Copy `survey_admin`
2. Click on **Password** field → Copy the password
3. Note the **Host**: `dpg-d3sqbl7gi27c73drmh20-a.render.internal`
4. Note the **Database**: `survey_db`
5. Note the **Port**: `5432`

Then combine them:
```
postgresql://survey_admin:PASSWORD@dpg-d3sqbl7gi27c73drmh20-a.render.internal:5432/survey_db
```

### Option B: Copy Full Connection String (Easier!) ✨
1. Find **"Internal Database URL"**
2. Click the **[Copy]** button
3. Done! You have the complete string

---

## 🎯 The Full String Format

You're looking for this format:

```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

Which becomes:

```
postgresql://survey_admin:PASSWORD_HERE@dpg-d3sqbl7gi27c73drmh20-a.render.internal:5432/survey_db
```

---

## 📋 Filling Out Your Details

Find these on your database page:

| Field | Example | Found At |
|-------|---------|----------|
| **User** | survey_admin | "User" field |
| **Password** | a8Kx3pL8mN9... | "Password" field |
| **Host** | dpg-d3sqbl7gi27c73drmh20-a.render.internal | "Host (Internal)" field |
| **Database** | survey_db | "Database" field |
| **Port** | 5432 | "Port" field |

---

## 🔗 Result: Your Complete Connection String

```
postgresql://survey_admin:YOUR_PASSWORD@dpg-d3sqbl7gi27c73drmh20-a.render.internal:5432/survey_db
```

Replace `YOUR_PASSWORD` with the actual password you find.

---

## ⚡ Quick Steps

1. Go to: https://dashboard.render.com
2. Click on: **survey_db** database
3. Find: **"Connections"** section
4. Look for: **"Internal Database URL"** (best) OR individual fields
5. Copy: The complete string or individual parts
6. Come back here and share it with me

---

## 💡 Pro Tips

✅ **Use "Internal Database URL"** - It's already formatted correctly  
✅ **Password might be long** - It's OK, copy the whole thing  
✅ **Keep the full string safe** - You'll need it multiple times  
✅ **Double-check before using** - Make sure no extra spaces  

---

## 🚀 Next Step

Once you have the connection string, tell me:

> "Here's my connection string: postgresql://..."

And I'll help you:
1. Set up your backend service on Render
2. Deploy your application
3. Get it LIVE! 🎉

---

**Ready? Go to:** https://dashboard.render.com
