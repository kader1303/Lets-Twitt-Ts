import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"

import { app, auth } from "~firebase"

setPersistence(auth, browserLocalPersistence)

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)

  const firestore = useMemo(() => (user ? getFirestore(app) : null), [user])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
    }
  }

  // const onLogin = () => {
  //   setIsLoading(true)
  //   chrome.identity.getAuthToken({ interactive: true }, async function (token) {
  //     if (chrome.runtime.lastError || !token) {
  //       console.error(chrome.runtime.lastError)
  //       setIsLoading(false)
  //       return
  //     }
  //     if (token) {
  //       const credential = GoogleAuthProvider.credential(null, token)
  //       try {
  //         await signInWithCredential(auth, credential)
  //       } catch (e) {
  //         console.error("Could not log in. ", e)
  //       }
  //     }
  //   })
  // }
  
  const onLogin = () => {
    setIsLoading(true);
    if (isEdgeBrowser()) {
      const redirectUrl = chrome.identity.getRedirectURL();
      console.log(redirectUrl);
      const params = new URLSearchParams({
        response_type: 'token',
        client_id: process.env.PLASMO_PUBLIC_FIREBASE_CLIENT_ID,
        redirect_uri: redirectUrl,
        // redirect_uri: 'extension://ahbnhofkalcmplfgbbcmhdjeddeojcji/popup.html',
        scope: 'email profile',
        state: 'state',
        // nonce: 'nonce',
      });
      const authUrl = `https://accounts.google.com/o/oauth2/auth?${params}`;
      chrome.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true,
        },
        async (redirectUrl) => {
          if (chrome.runtime.lastError || !redirectUrl) {
            console.error(chrome.runtime.lastError);
            setIsLoading(false);
            return;
          }
          const token = extractTokenFromUrl(redirectUrl);
          if (token) {
            const credential = GoogleAuthProvider.credential(null, token);
            try {
              await signInWithCredential(auth, credential);
            } catch (e) {
              console.error('Could not log in. ', e);
            }
          }
        }
      );
    } else {
      chrome.identity.getAuthToken({ interactive: true }, async function (token) {
        if (chrome.runtime.lastError || !token) {
          console.error(chrome.runtime.lastError);
          setIsLoading(false);
          return;
        }
        if (token) {
          const credential = GoogleAuthProvider.credential(null, token);
          try {
            await signInWithCredential(auth, credential);
          } catch (e) {
            console.error('Could not log in. ', e);
          }
        }
      });
    }
  };
  
  const extractTokenFromUrl = (url: string): string | null => {
    const hash = url.split('#')[1];
    if (!hash) {
      return null;
    }
    const params = new URLSearchParams(hash);
    return params.get('access_token');
  };
  
  const isEdgeBrowser = (): boolean => {
    return navigator.userAgent.indexOf("Edg") != -1;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  return {
    isLoading,
    user,
    firestore,
    onLogin,
    onLogout
  }
}
