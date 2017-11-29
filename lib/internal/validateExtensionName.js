export default (value) => {
  if (!value || typeof value !== "string") {
    throw new TypeError(`extensionName is required to be a string and can't be: "${value}" (${typeof value})`)
  }
  return value.trim()
}
