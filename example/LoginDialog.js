import React from "react"

import ExtensionPoint from "../lib/ExtensionPoint"

import "./LoginDialog.css"

const EmailInput = () => (
  <input name="email" type="email" placeholder="email"/>    
)

const PasswordInput = () => (
  <input name="password" type="password" placeholder="password"/>
)

/**
 * Allows the LoginDialog to be extended with additional form fields.
 * 
 * @namespace LoginDialog
 */
const LoginDialogExtensionPoint = () => (
  <ExtensionPoint extensionName="LoginDialog"/>
)

const LoginDialog = () => (
  <form className="login" action="javascript:void 0">
    <h2>Login</h2>
    <EmailInput/>
    <PasswordInput/>
    <LoginDialogExtensionPoint/>
    <input type="submit" value="Login"/>
  </form>
)

export default LoginDialog