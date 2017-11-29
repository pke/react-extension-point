import validateExtensionName from "../internal/validateExtensionName"
import PropTypes from "prop-types"

export const ExtensionRegistryShape = PropTypes.shape({
  addExtension: PropTypes.func.required,
  getExtension: PropTypes.func.required,
})

const required = name => {
  throw new TypeError(`${name} is required`)
}

export const createExtensionRegistry = () => {
  const extensions = {}
  return {
    addExtension(extensionName, extension = required("extension")) {
      extensionName = validateExtensionName(extensionName)
      extensions[extensionName.toLowerCase()] = extension
    },

    getExtension(extensionName) {
      extensionName = validateExtensionName(extensionName)
      return extensions[extensionName.toLowerCase()]
    }
  }
}

export default createExtensionRegistry()