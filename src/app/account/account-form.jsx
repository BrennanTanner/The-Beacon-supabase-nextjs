'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import OneSignal from 'react-onesignal'

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user
  const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
  
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false)

  /**
   * Initializes OneSignal SDK for a given Supabase User ID
   * @param uid Supabase User ID
   */
  const initializeOneSignal = async (uid) => {
    if (oneSignalInitialized) {
      return
    }
    setOneSignalInitialized(true)
    await OneSignal.init({
      appId: oneSignalAppId,
      notifyButton: {
        enable: true,
      },

      allowLocalhostAsSecureOrigin: true,
    })

    await OneSignal.setExternalUserId(uid)
  }

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  async function createFriendRequest( userId ) {
   try {
     setLoading(true)
     
     let { error } = await supabase.from('connection_requests').upsert({
       sender: userId,
       receiver: 'cbf30feb-dec7-456e-ab81-39b2be0f63fa',
       created_at: new Date().toISOString(),
       status: 'p',
     })
     console.log(error);
     if (error) throw error
     alert('request sent!')
   } catch (error) {
     alert('Error sending request!')
   } finally {
     setLoading(false)
   }
 }

 useEffect(() => {
  const initialize = async () => {
    if (user) {
      initializeOneSignal(user.id)
    }
  }

  initialize()

  const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
    // if (user) {
    //   initializeOneSignal(user.id)
    // }
  })

  return () => {
    authListener.data.subscription.unsubscribe()
  }
}, [])

 async function acceptFriendRequest( userId ) {
  try {
    setLoading(true)
    //console.log(userId);
    let { error } = await supabase
    .from('connection_requests')
    .update({ status: 'a' })
    .eq('receiver', userId)

    console.log(error);
    if (error) throw error
    alert('request sent!')
  } catch (error) {
    alert('Error sending request!')
  } finally {
    setLoading(false)
  }

}

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => createFriendRequest(user.id)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'friend request'}
        </button>
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => acceptFriendRequest(user.id)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'accept request'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}