import React from "react"
import PropTypes from "prop-types"
import invariant from "invariant"

import { ExtensionRegistryShape } from "../ExtensionRegistry"

/**
 * Allows ExtensionPoints to access the available Extensions
 * 
 * If you don't wrap your components that use ExtensionPoints in an `ExtensionProvider`
 * you have to hand down the available extensions to your components yourself.
 * 
 * @since 1.0 
 */
class ExtensionProvider extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.registry = props.registry
  }

  getChildContext() {
    return {
      registry: this.registry
    }
  }
  
  render() {
    return React.Children.only(this.props.children)
  }
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  ExtensionProvider.prototype.componentWillReceiveProps = function (nextProps) {
    const { registry } = this
    const { registry: nextRegistry } = nextProps

    invariant(
      registry === nextRegistry,
      "You can't change the extension registry after it has been rendered")
  }
} 

ExtensionProvider.propTypes = {
  /**
   * The extension registry to use
   * 
   * Please note: This can not be changed after it has been assigned
   */
  registry: ExtensionRegistryShape.isRequired,

  /**
   * One child element is allowed. This alement and elements further down will have 
   * the extension registry available as in `context.registry`.
   */
  children: PropTypes.element.isRequired
}
ExtensionProvider.childContextTypes = {
  registry: ExtensionRegistryShape.isRequired,
}
export default ExtensionProvider