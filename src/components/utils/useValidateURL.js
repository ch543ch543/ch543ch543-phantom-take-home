const useValidateURL = (url) => {
  try {
    const newUrl = new URL(url)
    if (newUrl.protocol === 'http:' || newUrl.protocol === 'https:')
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (err) {
    return false
  }
}

export default useValidateURL
