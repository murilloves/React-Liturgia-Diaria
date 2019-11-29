import axios from 'axios'

const TextService = {
  fetchText : () => {
    const res = axios.get(`https://baconipsum.com/api/?callback=?`)
    return res
  },
}

export default TextService
