# Build & Release (no Play Store payment required)

This repository includes a GitHub Actions workflow that can build a signed Android App Bundle (AAB) and upload it as an artifact. You can then download the AAB and distribute it manually or attach it to a GitHub Release.

## What you must do (one-time)

1. Encode your keystore to base64 and add these repository secrets:

- `KEYSTORE_BASE64` — base64 content of `android/bellcorp.keystore`
- `KEYSTORE_PASSWORD` — keystore password
- `KEY_ALIAS` — key alias (e.g., `bellcorp-key`)
- `KEY_PASSWORD` — key password (often same as keystore password)

### How to generate base64 of the keystore

- On Linux/macOS:

```bash
cat android/bellcorp.keystore | base64 -w 0
```

- On Windows PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('android\bellcorp.keystore'))
```

Copy the resulting base64 string.

### Add secrets in GitHub
1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions → New repository secret
3. Create the 4 secrets above

## Trigger the build

- Option A (manual run): Go to the **Actions** tab → **Android Build (AAB)** → **Run workflow** → select `main` → Run workflow.
- Option B (push): Push a commit to `main` and the workflow will run automatically.

## Download the AAB

After the workflow completes:
1. Open the workflow run in **Actions**
2. Find the **Artifacts** section and download the artifact named `bellcorp-aab`

You can distribute the `.aab` to users (they typically need to convert to APK or use tools), or upload it to a Play Console later (requires $25).

## Optional: Create a Release with a tag
If you create a tag (git tag v1.0.0 && git push origin v1.0.0), the workflow will create a GitHub Release and attach the AAB as an asset (see workflow `Create GitHub Release` step).

## Notes
- This workflow runs on GitHub's free CI minutes for public repos; usage is free for public repos. For private repos, usage may consume included minutes.
- The keystore never leaves GitHub Actions: we store its base64 in repository secrets.

If you want, I can:
- help you encode and add secrets
- trigger the workflow for you once secrets are in place
- download the produced AAB and prepare a GitHub Release
