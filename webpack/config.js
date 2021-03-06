const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = {
  source: path.join(__dirname, '../source'),
  javascript: path.join(__dirname, '../source/js'),
  images: path.join(__dirname, '../source/assets/img'),
  svg: path.join(__dirname, '../source/assets/svg'),
  build: path.join(__dirname, '../build'),
};

const outputFiles = require('./output-files').outputFiles;

const API_ROOT = process.env.API_ROOT;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// ----------
// PLUGINS
// ----------
const extractUserSASS = new ExtractTextPlugin(outputFiles.userSass);
const extractVendorCSS = new ExtractTextPlugin(outputFiles.vendorCss);
// Shared plugins
const plugins = [
  // Extracts CSS to a file
  extractUserSASS,
  extractVendorCSS,
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_ROOT: JSON.stringify(API_ROOT),
      SERVER_RENDER: JSON.stringify(SERVER_RENDER) === 'true',
    },
  }),
];

if (IS_PRODUCTION) {
  // Shared production plugins
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: !SERVER_RENDER, // Keep server logs
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  // Shared development plugins
  plugins.push(
    // Enables pretty names instead of index
    new webpack.NamedModulesPlugin()
  );
}

// ----------
// RULES
// ----------

// Shared rules
let rules = [
  // Babel loader without react hot loader
  // react-hot-loader will is added in webpack.config.js for development only
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]',
        },
      },
    ],
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=client/assets/[name]-[hash].[ext]',
      },

    ],
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader?limit=10000&name=client/assets/[name]-[hash].[ext]',
      },
    ],
  },
];

// Almost the same rule is used in both development and production
// only diffence is source map param and ExtractTextPlugin
// so we are using this method to avoid redundant code
const getSassRule = () => {
  const autoprefixerOptions = {
    browsers: [
      'last 3 version',
      'ie >= 10',
    ],
  };

  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        minimize: IS_PRODUCTION,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        plugins: () => [
          autoprefixer(autoprefixerOptions),
        ],
      },
    },
  ];

  const sassLoaders = cssLoaders.concat([
    {
      loader: 'sass-loader',
      options: { sourceMap: IS_DEVELOPMENT },
    },
  ]
  );

  if (IS_PRODUCTION || SERVER_RENDER) {
    return [
      {
        test: /\.sass$/,
        use: extractUserSASS.extract({
          fallback: 'style-loader',
          use: sassLoaders,
        }),
      }, {
        test: /\.css$/,
        use: extractVendorCSS.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
      },
    ];
  }

  return [
    {
      test: /\.sass$/,
      use: [
        {
          loader: 'style-loader',
        },
      ].concat(sassLoaders),
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
      ].concat(cssLoaders),
    },
  ];
};

// Add SASS rule to common rules
rules = rules.concat(getSassRule());


// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    path.join(__dirname, '../node_modules'),
    paths.javascript,
  ],
};

module.exports = {
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  SERVER_RENDER,
};
