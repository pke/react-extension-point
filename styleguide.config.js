const path = require('path');

module.exports = {
  title: "React Extension Point",
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
  webpackConfig: {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }
      ]
    },
    // ... other webpack configuration
  }
};
