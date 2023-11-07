import React, { ReactNode } from "react";
import {
  ExtensionRegistry,
  ExtensionType,
  default as defaultRegistry,
} from "../ExtensionRegistry";
import validateExtensionName from "../internal/validateExtensionName";
import { useExtensionRegistry } from "../ExtensionProvider";

interface ExtensionPointProps {
  extensionName: string;
  children?: ReactNode | ((Extension: ExtensionType, props: any) => ReactNode);
  registry?: ExtensionRegistry;
  props?: any;
}

export type ExtentionPoint = React.FC<ExtensionPointProps>;

const ExtensionPoint = ({
  extensionName,
  children = null,
  registry: registryFromProps,
  ...props
}: ExtensionPointProps) => {
  const registry =
    useExtensionRegistry() || registryFromProps || defaultRegistry;
  const validatedExtensionName = validateExtensionName(extensionName);
  const Extension = registry?.getExtension(validatedExtensionName);

  if (typeof children === "function") {
    return children(Extension, props) || null;
  } else if (typeof Extension === "undefined") {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, props);
    } else {
      return children;
    }
  } else if (!Extension) {
    return null;
  }
  return <Extension {...props} />;
};

export default ExtensionPoint;
