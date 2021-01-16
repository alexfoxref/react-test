import { config } from '../config'

export const getData = async url => {
  const res = await fetch(`${config.baseURL}${url}${config.developer}`)

  if (!res.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${res.status}`)
  }

  return await res.json()
}

export const postData = async (url, body, headers) => {
  const res = await fetch(`${config.baseURL}${url}${config.developer}`, {
    method: 'POST',
    body,
    headers,
  })

  if (!res.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${res.status}`)
  }

  return await res.json()
}
