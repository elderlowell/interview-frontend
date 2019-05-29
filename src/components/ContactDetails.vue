<template>
  <div class="">

  </div>
</template>

<script>
import ContactService from '@/services/ContactService'

export default {
  name: 'ContactDetails',
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
