# 📱 Google Play Store Deployment Guide for Bellcorp

## Prerequisites

You'll need:
1. **Java Development Kit (JDK)** 11+ 
2. **Android Studio** (with Android SDK installed)
3. **Google Play Developer Account** ($25 one-time)

---

## Step 1: Install Required Tools

### 1a. Install Java (JDK)
```bash
winget install EclipseAdoptium.Temurin.11
```
Verify installation:
```bash
java -version
```

### 1b. Install Android Studio
Download from: https://developer.android.com/studio

After installation:
1. Open Android Studio
2. Go to **Tools > SDK Manager**
3. Ensure you have:
   - Android SDK 33+ installed
   - Android SDK Build-Tools installed
   - Android Emulator (optional)

Set `ANDROID_SDK_ROOT` environment variable:
```powershell
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk", "User")
```

---

## Step 2: Generate a Signing Key

Create a keystore file for signing your app (required for Play Store):

```bash
cd android
keytool -genkey -v -keystore bellcorp.keystore -keyalg RSA -keysize 2048 -validity 36500 -alias bellcorp-key
```

**When prompted, enter:**
- **Keystore password:** Remember this!
- **Key password:** Same as keystore password
- **Name (first/last):** Your name
- **Organization:** Your company name
- **State:** Your state
- **Country code:** US (or your country code)

⚠️ **IMPORTANT:** Save `bellcorp.keystore` file safely. You'll need it for future updates!

---

## Step 3: Build Release APK/AAB

### Option A: Build via Android Studio (Recommended)
1. Open `android/` folder in Android Studio
2. Click **Build > Generate Signed Bundle/APK**
3. Select **Android App Bundle (AAB)** - preferred by Play Store
4. Choose your keystore
5. Select **Release** build type
6. Click **Generate**

The signed AAB will be in: `android/app/release/app-release.aab`

### Option B: Build via Command Line
```bash
cd android
./gradlew bundleRelease -PstoreFile=../bellcorp.keystore -PstorePassword=YOUR_PASSWORD -PkeyAlias=bellcorp-key -PkeyPassword=YOUR_PASSWORD
```

---

## Step 4: Create Google Play Developer Account

1. Go to: https://play.google.com/apps/publish
2. Sign in with your Google Account
3. Pay the $25 registration fee
4. Complete the questionnaire and store info

---

## Step 5: Prepare App Store Listing

### 5a. Create New App
1. Click **All apps > Create app**
2. **App name:** Bellcorp - Expense Tracker
3. **Default language:** English
4. **App type:** Application
5. Click **Create**

### 5b. Fill App Details
Complete these sections:
- **App details (required):**
  - App category: Finance
  - App address/website: https://bellcorp-alpha.vercel.app
  
- **Store listing (required):**
  - Short description: "A secure, personal finance tracker"
  - Full description: Your detailed app description
  - Screenshots: 2-8 screenshots (show UI features)
  - App icon: 512x512 PNG
  - Feature graphic: 1024x500 PNG
  - Promo video: (optional)

- **Content rating (required):**
  - Complete the questionnaire
  
- **Pricing & distribution:**
  - Free or Paid
  - Countries where available

---

## Step 6: Upload & Submit

1. Go to **Release > Production**
2. Click **Create new release**
3. Upload your signed AAB file
4. Review and submit for review

**Review time:** Usually 24-48 hours

---

## Step 7: Update Your App (Future Releases)

Every time you update:
1. Update version in `capacitor.config.json`:
   ```json
   "version": "1.0.1"
   ```
2. Rebuild: `npm run build`
3. Sync: `npx cap sync android`
4. Build release AAB via Android Studio
5. Upload new version to Play Store

---

## 📱 Bellcorp Reference Info

- **App ID:** com.bellcorp.app
- **Keystore file:** bellcorp.keystore
- **Key alias:** bellcorp-key
- **Web URL:** https://bellcorp-alpha.vercel.app

---

## 🔗 Useful Links

- Android App Bundle: https://developer.android.com/guide/app-bundle
- Google Play Console: https://play.google.com/console
- Capacitor Android Docs: https://capacitorjs.com/docs/android
- App Signing: https://support.google.com/googleplay/answer/7384423

---

## Next Actions
1. ✅ Install JDK
2. ✅ Install Android Studio
3. ✅ Generate signing keystore
4. ✅ Build release AAB
5. ✅ Create Play Store account
6. ✅ Fill app store listing
7. ✅ Upload AAB and submit
