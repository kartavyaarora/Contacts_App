import { useEffect, useState }from 'react'
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ContactCard from '../components/ContactCard'
import ContactForm from '../components/ContactForm'

const Home = () => {
  const [popup, setpopup] = useState(false);
  const {contacts, dispatch} = useContactsContext()
  const {user} = useAuthContext()
  console.log(user)
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CONTACTS', payload: json})
      }
    }

    if (user) {
      fetchContacts()
    }
  }, [dispatch, user])

  return (
    <>
    <center>
    <div className='bg-dark user mb-3 rounded-bottom'>
      <span className=' text-white m-2 email'>
      <i className="bi bi-envelope-fill mx-1" />
        {user.email}</span>
      <span className='text-white m-2'>
      <i className="bi bi-person-fill mx-1" />
        {user.name}</span>
      <span className='text-white m-2'>
      <i className="bi bi-phone-fill mx-1" />
        {user.number}</span>
      </div>
      </center>
    <div className="container home">
      <button className="btn btn-success add" onClick={() => setpopup(true)}>Add Contact</button>
      <div className='contacts'>
        {contacts && contacts.map((data) => (
          <ContactCard key={data._id} contact={data} />
        ))}
      </div>
      <ContactForm trigger={popup} setTrigger={setpopup} />
    </div>
    </>
  )
}

export default Home