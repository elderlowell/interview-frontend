<template>
  <div class="contact-list">
    <ul>
      <li v-for="contact in contacts" :key="contact.id" class="item">{{ contact.name }}</li>
    </ul>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'

export default {
  name: 'ContactList',
  data () {
    return {
      contacts: []
    }
  },
  beforeMount () {
    this.getContacts()
  },
  methods: {
    async getContacts () {
      const { data } = await ContactService.getContacts()

      this.contacts = data.contacts
    }
  }
}
</script>

<style scoped lang="sass">
</style>