// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['react-children-utilities'])
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const config = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = withTM(config)
