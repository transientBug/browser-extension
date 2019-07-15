# Bookmarking the www-bugs

The officially supported Firefox and Chrome extension for the transientBug
bookmarking service.

[![Build Status](https://travis-ci.org/transientBug/browser-extension.svg?branch=master)](https://travis-ci.org/transientBug/browser-extension)

## Development

Known MVP work:

- [ ] Finish filling this & other docs out
- [ ] Add a `bundle` or `package` command for building the packages to upload
- [ ] Tests where appropriate
- [ ] Standardize styling of add on
- [ ] Rich markdown previews in descriptions with Slate.js

### Getting Started

Notable things:

- Debug flags are editable in the preferences when built with the environment variable `REACT_APP_DEBUGGABLE=true`.
- `yarn build` or `npm run build` will build/bundle the extension into `/build`
- `yarn storybook` or `npm run storybook` will start a storybook which has most of the components featured
  - Stories live along side their components under `<component name>.stories.js` files.

To contribute, please fork this repo, make your changes and submit a PR back to this repository.

### Firefox

To load the extension into Firefox temporarily, visit `about:debugging` or see [this MDN doc](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

### Chrome

To load the extension into Chrome temporarily, visit `chrome://extensions` or see [this Google Dev doc](https://developer.chrome.com/extensions).

This extension makes use of the [Mozila WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) to enable the use of the newer Promise based WebExtension APIs which are unavailable in Chrome. There could be edge cases which arise only in Chrome as a result of this.

## Credits

- Bookmark Icons from the [Google Material Design](https://material.io/icons/) project.
- Save & Link Icons from [Zondicons](http://www.zondicons.com/).

## License

MIT
