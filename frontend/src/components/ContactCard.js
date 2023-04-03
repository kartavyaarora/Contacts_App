import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ContactCard = ({ contact }) => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/contacts/' + contact._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CONTACT', payload: json})
    }
  }

  return (
    <div className="contact-details">
      <h4>{contact.name}</h4>
      <p><strong>Number : </strong>{contact.number}</p>
      <p><strong>Email : </strong>{contact.email}</p>
      <p><strong>Address : </strong>{contact.address}</p>
      <p>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ContactCard