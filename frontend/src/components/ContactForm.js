import { useState } from 'react'
import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const ContactForm = (props) => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const [name, setname] = useState('')
  const [number, setnumber] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const contact = {name, number, email, address}
    
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setname('')
      setnumber('')
      setemail('')
      setaddress('')
      dispatch({type: 'CREATE_CONTACT', payload: json})
    }
    props.setTrigger(false)
  }

  return props.trigger ? (
    <div className="popup" style={{ zIndex: "10" }}>
      <div className="popup-inner">
        <i
          className="bi bi-x-square close-btn"
          role="button"
          onClick={() => props.setTrigger(false)}
        />
    <form className="create text-center" onSubmit={handleSubmit}> 
      <h3>Add a New Contact</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setname(e.target.value)} 
        value={name}
      />

      <label>Number:</label>
      <input 
        type="text" 
        onChange={(e) => setnumber(e.target.value)} 
        value={number}
        
      />

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setemail(e.target.value)} 
        value={email}
        
      />
      <label>Address:</label>
      <input 
        type="text" 
        onChange={(e) => setaddress(e.target.value)} 
        value={address}
        
      />

      <button>Add Contact</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
  ) : (
    ""
  );
}

export default ContactForm