const getJSON = async (url) => {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    throw new Error('Unable to get data: ', error)
  }
}

export { getJSON as default }