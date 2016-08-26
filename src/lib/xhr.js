import fetch from 'universal-fetch'
import headers from './headers'

export function get(url, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: Object.assign(headers, override)
    })
    .then((response) => {
      resolve(response.json())
    })
  })
}

export function post(url, body, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: Object.assign(headers, override),
      body
    })
    .then((response) => {
      resolve(response.json())
    })
  })
}

export function put(url, body, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: Object.assign(headers, override),
      body
    })
    .then((response) => {
      resolve(response.json())
    })
  })
}

export function del(url, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: Object.assign(header, override)
    })
    .then((response) => {
      resolve(response.json())
    })
  })
}
