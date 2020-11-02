const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];
const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
      useBuiltIns: 'entry',
      corejs: '3',
      targets: {
        browsers: ['last 2 versions'],
      },
    },
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const emotionPresetOpts = {
  autoLabel: true,
  labelFormat: '[local]',
  useBuiltIns: false,
  throwIfNamespace: true,
};

module.exports = {
  env: {
    production: {
      presets: [
        ...presets,
        // babel preset ordering is reversed: https://babeljs.io/docs/en/presets#preset-ordering
        ['@emotion/babel-preset-css-prop', { ...emotionPresetOpts, sourceMap: false }],
      ],
      plugins,
    },
    development: {
      presets: [
        ...presets,
        ['@emotion/babel-preset-css-prop', { ...emotionPresetOpts, sourceMap: true }],
      ],
      plugins,
    },
  },
};
