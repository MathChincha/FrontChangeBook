import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "https://changebook-user-api.herokuapp.com/api/change-book/v1"
})

const apiBooks = axios.create({
    baseURL: "https://changebook-book-api.herokuapp.com/api/change-book/v1"
})

const apiTransactions = axios.create({
    baseURL: "https://changebook-transaction-api.herokuapp.com/api/change-book/v1"
})

export {
    apiUsers,
    apiBooks,
    apiTransactions
  };