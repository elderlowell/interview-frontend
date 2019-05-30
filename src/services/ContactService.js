import api from '@/api'

export default {
  getContacts: () => api().get(`/contacts`),
  postContact: (contact) => api().post('/contact', {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    is_favorite: contact.is_favorite
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}
