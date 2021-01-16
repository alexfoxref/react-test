export const getResponseMessage = (defaultMessage, res) =>
  res?.message
    ? typeof res?.message === 'string'
      ? res?.message
      : res?.message[Object.keys(res?.message || {})[0]]
    : defaultMessage

export const useMessage = (html, error) => {
  if (html && window.M) {
    if (error) {
      html = `[Ошибка]: ${html}`
    }
    window.M.toast({ html })
  }
}
