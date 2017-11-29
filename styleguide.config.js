const { createConfig, babel, postcss } = require('webpack-blocks')

module.exports = {
  title: "react Extension Point",
  styleguideDir: "docs",
  sections: [
    {
      name: "Introduction",
      content: "README.md"
    },
    {
      name: "Components",
      components: 'lib/**/[A-Z]*.js'
    }
  ],
  showCode: true,
  showUsage: true,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  webpackConfig: createConfig([
    babel(),
    postcss()
  ])
}
