import { useAuthContext } from './useAuthContext'
import { useContactsContext } from './useContactsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchContacts } = useContactsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchContacts({ type: 'SET_CONTACTS', payload: null })
  }

  return { logout }
}