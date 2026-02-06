# Finding Your Firebase Config Values

## Step-by-Step Visual Guide

### 1. Open Firebase Console
Go to: https://console.firebase.google.com/

### 2. Select Your Project
Click on your project name (e.g., "my-portfolio")

### 3. Access Project Settings
- Click the **⚙️ Gear icon** (top-left, next to "Project Overview")
- Select **"Project settings"**

### 4. Scroll to "Your apps" Section
- Scroll down to the **"Your apps"** section
- If you haven't added a web app yet, click **"Web" (`</>`)** icon
- Give it a nickname (e.g., "Portfolio Website")

### 5. Find Your Config
You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567",
  authDomain: "my-portfolio-12345.firebaseapp.com",
  projectId: "my-portfolio-12345",
  storageBucket: "my-portfolio-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

### 6. Copy and Replace
**Open:** `src/App.jsx`

**Find this (around line 35):**
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Replace with your actual values:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567",  // ← Your actual API key
  authDomain: "my-portfolio-12345.firebaseapp.com",   // ← Your actual domain
  projectId: "my-portfolio-12345",                     // ← Your actual project ID
  storageBucket: "my-portfolio-12345.appspot.com",    // ← Your actual bucket
  messagingSenderId: "123456789012",                   // ← Your actual sender ID
  appId: "1:123456789012:web:abcdef1234567890abcdef"  // ← Your actual app ID
};
```

### 7. Save the File
- **Save** `App.jsx` (Cmd/Ctrl + S)
- The dev server will **auto-reload**

---

## What Each Value Means

| Value | Purpose |
|-------|---------|
| **apiKey** | Identifies your Firebase project |
| **authDomain** | Used for Firebase Authentication |
| **projectId** | Your unique project identifier |
| **storageBucket** | Cloud Storage location (not used yet) |
| **messagingSenderId** | For Firebase Cloud Messaging (optional) |
| **appId** | Your web app's unique ID |

---

## Security Note

⚠️ **These values are safe to expose in client-side code.**

Firebase uses security rules to protect your data, not API key secrecy.

However, for production:
- Use environment variables
- Set up proper Firestore security rules
- Enable App Check for additional security

---

## After Updating Config

### Test Your Setup
1. Make sure dev server is running: `npm run dev`
2. Open http://localhost:5173/
3. Open browser console (F12)
4. Look for any Firebase errors

### Expected Console Messages (Normal)
```
✅ Firebase initialized successfully
✅ User authenticated anonymously
✅ Listening to Firestore collection
```

### Common Error Messages

**"Failed to get document because the client is offline"**
- **Cause:** Firestore database not created yet
- **Fix:** Go to Firebase Console → Build → Firestore Database → Create

**"Missing or insufficient permissions"**
- **Cause:** Firestore rules too restrictive
- **Fix:** Use test mode rules (see `FIREBASE_SETUP.md`)

**"Invalid API key"**
- **Cause:** Copied config incorrectly
- **Fix:** Double-check all values, ensure no extra spaces

---

## Next: Enable Services

After updating config, you need to enable:

### 1. Firestore Database
**Firebase Console → Build → Firestore Database**
- Click "Create database"
- Choose "Start in test mode"
- Select location
- Click "Enable"

### 2. Authentication
**Firebase Console → Build → Authentication**
- Click "Get started"
- Go to "Sign-in method" tab
- Enable "Anonymous"
- Click "Save"

---

## Verification Checklist

After setup, verify:
- [ ] Firebase config updated in `App.jsx`
- [ ] Firestore Database created and enabled
- [ ] Anonymous Authentication enabled
- [ ] Dev server running without errors
- [ ] Can access admin mode (PIN: 2024)
- [ ] Can add a test project successfully

---

## Ready to Go! 🎉

Once all checkboxes are ticked:
1. Add your real projects via admin panel
2. Upload images to hosting service
3. Test all features (filtering, gallery, edit, delete)
4. Deploy to production!

---

**Need more help?** Check `FIREBASE_SETUP.md` for detailed instructions.
