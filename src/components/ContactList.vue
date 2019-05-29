<template>
  <div class="contact-list">
    <div class="pagination">
      <div class="pageOptions">
        <h4>Per Page</h4>
        <div v-for="option in perPageOptions" @click="changeOption(option)" :class="{ activeOption: option === perPage }">{{ option }}</div>
      </div>
      <div class="pageNumbers">
        <h4>Page</h4>
        <div class="pageJump" :class="{ inactiveOption: pageNumber === 1 }" @click="changePageNumber(1)">First</div>
        <div class="pageJump" :class="{ inactiveOption: pageNumber === 1 }" @click="previous()">Prev</div>
        <div class="pageNumberOptions" v-for="page in pages" v-if="Math.abs(pageNumber - page) === 1 || pageNumber === page" :class="{ activeOption: page === pageNumber }" @click="changePageNumber(page)">{{ page }}</div>
        <div class="pageJump" :class="{ inactiveOption: pageNumber === pages.length }" @click="next()">Next</div>
        <div class="pageJump" :class="{ inactiveOption: pageNumber === pages.length }" @click="changePageNumber(pages.length)">Last</div>
      </div>
    </div>
    <ul>
      <li v-for="contact in contacts.slice(firstContact - 1, firstContact - 1 + perPage)" :key="contact.id" class="item" :class="{ isFavorite: contact.is_favorite }" @click="selectContact(contact.id)">
        {{ contact.name }}
        <div v-if="selected === contact.id">
          <p>{{ contact.email }}</p>
          <p>{{ contact.phone }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'

export default {
  name: 'ContactList',
  data () {
    return {
      contacts: [],
      selected: 0,
      contactsCount: 0,
      firstContact: 1,
      pageNumber: 1,
      pages: [],
      pagesToDisplay: 3,
      perPage: 10,
      perPageOptions: [5,10,15,20]
    }
  },
  beforeMount () {
    this.getContacts()
  },
  methods: {
    async getContacts () {
      const { data } = await ContactService.getContacts()

      this.contacts = data.contacts
      this.contactsCount = data.count
      this.getTotalPages()
    },
    selectContact(num) {
      this.selected = num
    },
    getTotalPages() {
      this.pages = []
      for (var i = 0; i < Math.ceil(this.contactsCount / this.perPage); i++) {
        this.pages.push(i + 1)
      }
    },
    getFirstContact() {
      this.firstContact = (this.pageNumber * this.perPage) - this.perPage + 1
    },
    changeOption(num) {
      this.perPage = num
      this.getTotalPages()
      this.getFirstContact()
    },
    changePageNumber(num) {
      this.pageNumber = num
      this.getFirstContact()
    },
    previous() {
      if (this.pageNumber != 1) {
        this.pageNumber --
        this.getFirstContact()
      }
    },
    next() {
      if (this.pageNumber != this.pages.length) {
        this.pageNumber ++
        this.getFirstContact()
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .contact-list
    padding-bottom: 30px
    margin: 0 5%
  ul
    max-width: 400px
    margin: 0 auto 1em
    border: 1px solid lightgray
    padding: 0
  @mixin odd()
    &:nth-child(odd)
      @content
  li
    list-style: none
    padding: 10px
    text-align: left
    @include odd()
      background-color: #eaf1f8
    p
      margin: 0
      font-weight: normal
  li:hover
    text-decoration: underline
    cursor: pointer
  .isFavorite
    font-weight: bold
  .pagination
    max-width: 400px
    margin: 0 auto 16px
    div
      text-align: left
      a
        color: #2360a1
        flex: 1
        width: 30px
  .pageOptions
    display: flex
    line-height: 30px
    margin-bottom: 16px
    h4
      flex: 1
      margin: 0
    div
      width: 30px
      height: 30px
      text-align: center
      border: 1px solid lightgray
      cursor: pointer
  .pageNumbers
    display: flex
    line-height: 30px
    h4
      flex: 1
      margin: 0
    div
      height: 30px
      text-align: center
      border: 1px solid lightgray
      cursor: pointer
    .pageJump
      padding: 0 10px
    .pageNumberOptions
      width: 30px
  .activeOption
    background-color: #eaf1f8
  .inactiveOption
    background-color: #e8e8e8
</style>
