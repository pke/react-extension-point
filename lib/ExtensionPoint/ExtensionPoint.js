import React from "react"
import PropTypes from "prop-types"

import { ExtensionRegistryShape } from "../ExtensionRegistry"
import validateExtensionName from "../internal/validateExtensionName"

/**
 * Marks an extensible part of the component this is rendered in.
 * 
 * @param {String} extensionName the name of the Extension that should be rendered here.
 * 
 * @since 1.0
 */
const ExtensionPoint = ({
  extensionName = validateExtensionName(),
  children = null,
  registry,
  ...props },
  context) => {
  registry = registry || context.registry || require("../ExtensionRegistry").default
  const Extension = registry && registry.getExtension && registry.getExtension(extensionName)

  if (typeof children === "function") {
    return children(Extension, props) || null
  } else if (typeof Extension === "undefined") {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, props)
    } else {
      return children
    }
  } else if (!Extension) {
    return null
  }
  return <Extension {...props} />
}
ExtensionPoint.propTypes = {
  /**
   * Name of the extension. Case-insensitive.
   */
  extensionName: PropTypes.string.isRequired,
  /**
   * A React node or function.
   * 
   * If this is a function it must have this signature:  
   * `function(Extension, props)`  
   * 1. `Extension`: The extension or `undefined` 
   * if no extension was found.  
   * Please not that it can also be `null` which should be
   * treated as to prevent the Extension Points default content
   * to render.  
   * 2. `props`: The props handed in from the Extension Point.  
   * Usually your function just splashes them to the `Extension`
   * like so:  
   * `<Extension {...props}/>`
   * 
   * @param {Component} Extension component to render
   * @param {Object} props for the Extension component
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  registry: ExtensionRegistryShape,
}
ExtensionPoint.contextTypes = {
  registry: ExtensionRegistryShape,
}
export default ExtensionPoint
