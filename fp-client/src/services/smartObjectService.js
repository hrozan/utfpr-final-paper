import http from "../providers/http"
import urlJoin from "url-join"
import { API_URL } from "../config"

const smartObjectService = {
  async read() {
    const url = urlJoin(API_URL, "smart-object")
    const result = await http.get(url)
    return result.data
  }
}

export default smartObjectService
