import * as http from "../providers/http"
import urlJoin from "url-join"
import { API_URL } from "../config"

export async function read() {
  const url = urlJoin(API_URL, "smart-object")
  const result = await http.get(url)
  return result.data
}
