module.exports = {
	env: {
		browser: true,
		commonjs: true,
		node: true,
		es6: true,
		mocha: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off'
	},
	settings: {
		react: {
			version: '16.6'
		}
	}
};
