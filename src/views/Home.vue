<template>
  <div id="home">
    <h1>MarketDial Address Book</h1>
    <NewContactForm />
    <ContactList />
  </div>
</template>

<script>
// @ is an alias to /src
import ContactList from '@/components/ContactList'
import NewContactForm from '@/components/NewContactForm'

export default {
  name: 'home',
  components: {
    ContactList,
    NewContactForm
  }
}
</script>
