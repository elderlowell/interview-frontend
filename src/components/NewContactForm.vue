<template>
  <div class="contactFormContainer">
    <form class="contactForm" id="contactForm">
      <h3>Add a New Contact</h3>
      <div class="fieldGroup">
        <label for="name">Contact Name: </label>
        <input type="text" id="name" v-model="newContact.name" required>
      </div>
      <div class="fieldGroup">
        <label for="email">Email Address: </label>
        <input type="email" id="email" v-model="newContact.email">
      </div>
      <div class="fieldGroup">
        <label for="phone">Phone Number: </label>
        <input type="tel" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="newContact.phone">
      </div>
      <div class="small">Format "111-111-1111"</div>
      <div class="fieldGroup">
        <label for="favorite">Favorite: </label>
        <div class="inline-radio" id="favorite">
        	<div>
            <input type="radio" name="favorite" value="false" v-model="newContact.is_favorite">
            <label>No</label>
          </div>
          <div>
            <input type="radio" name="favorite" value="true" v-model="newContact.is_favorite">
            <label>Yes</label>
          </div>
        </div>
      </div>
      <div class="buttonGroup">
        <button type="reset" name="button">Clear</button>
        <button type="button" @click="saveContact()" name="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'

export default {
  name: 'NewContactForm',
  data () {
    return {
      newContact: {
        name: '',
        email: '',
        phone: '',
        is_favorite: false
      }
    }
  },
  methods: {
    saveContact() {
      ContactService.postContact(this.newContact)
      document.getElementById('contactForm').reset()
    }
  }
}
</script>

<style scoped lang="sass">
  .contactFormContainer
    margin: 0 5%
  .contactForm
    max-width: 400px
    margin: 1em auto
    border: 1px solid lightgray
    padding: 0
  .fieldGroup
    padding: 10px
    text-align: left
    display: flex
    label
      flex: 2
    input
      flex-grow: 1
      font-size: inherit
      color: inherit
    input:not([type=radio])
      border: 1px solid lightgray
  .small
    font-size: 14px
    text-align: left
    padding: 0 15px
    color: #DC143C
  .inline-radio
  	display: flex
  	overflow: hidden
    border: 1px solid #b6b6b6
  .buttonGroup
    padding: 15px
    text-align: right
  button
    margin-left: 10px
    padding: 5px 10px
    background: none
    border-radius: 4px
    font-size: 16px
    color: inherit
    cursor: pointer
</style>
