import { useEffect, useState } from 'react'

export default function GetAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    const ua = (navigator.userAgent || '').toLowerCase()
    setIsIos(/iphone|ipad|ipod/.test(ua))

    const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true
    if (isStandalone) setShow(false)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const onInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      try {
        const choice = await deferredPrompt.userChoice
        // hide after user responds
        setShow(false)
        setDeferredPrompt(null)
      } catch (e) {
        setShow(false)
        setDeferredPrompt(null)
      }
    } else if (isIos) {
      // iOS: instruct user to use Share -> Add to Home Screen
      // keep this simple and unobtrusive
      alert('To install this app on iOS: tap Share → "Add to Home Screen" in Safari.')
    }
  }

  if (!show) return null

  return (
    <div className="install-wrap fade-in">
      <button className="btn btn-primary btn-sm install-btn" onClick={onInstallClick}>
        Get the app
      </button>
      {isIos && <div className="install-hint">Safari → Share → Add to Home Screen</div>}
    </div>
  )
}
