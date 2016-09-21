import fetch from 'universal-fetch'
import headers from './headers'

export function get(url, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: Object.assign(headers(), override)
    })
    .then((response) => {
      if (response.status !== 200) {
        return resolve(response.status)
      }
      return resolve(response.json())
    })
  })
}

export function post(url, body, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: Object.assign(headers(), override),
      body
    })
    .then((response) => {
      if (response.status !== 201) {
        return resolve(response.status)
      }
      return resolve(response.json())
    })
  })
}

export function token(url, body, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: Object.assign(headers(), override),
      body
    })
    .then((response) => {
      return resolve(response.text())
    })
  })
}

export function put(url, body, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: Object.assign(headers(), override),
      body
    })
    .then((response) => {
      return resolve(response.status)
    })
  })
}

export function del(url, override) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: Object.assign(headers(), override)
    })
    .then((response) => {
      return resolve(response.status)
    })
  })
}
