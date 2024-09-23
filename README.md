## BizzomateNumberInput
Pluggable Mendix Widget based on the react-number-format library. Provides a more user-friendly and customizable input for numeric data.

## Features
* Much richer input for numbers with a configurable decimal separator, thousand separator, prefix and suffix
* Add a list of allowed decimal separators and they will automatically be converted
* Allows auto-formatting of numbers when saved to string attributes
* Sets inputMode on field to trigger correct keyboards on mobile devices

## Usage
* Select this widget instead of the Text Box in Studio Pro
* Select input type (decimal/integer/string) and attribute
* Go to the "Formatting"-tab for all extra options
* Set "Custom separator" to true and "Decimal separator behavior" to "custom" for full-control
* Or let the widget use the Mendix language settings and allow both "," and "." from the user as input

## Issues, suggestions and feature requests
[\[link to GitHub issues\]](https://github.com/bizzomate/bizzomateNumberInput/issues)

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.