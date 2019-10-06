# Bookmarking the www-bugs

The officially supported Firefox and Chrome extension for the transientBug
bookmarking service.

[![Build Status](https://travis-ci.org/transientBug/browser-extension.svg?branch=master)](https://travis-ci.org/transientBug/browser-extension)

## Development

This extension was scaffolded out using [Create-React-App](https://create-react-app.dev/) and is developed in [TypeScript](https://www.typescriptlang.org/). Styling is done with [emotion](https://emotion.sh/docs/introduction) and [Tailwind CSS](https://tailwindcss.com/) through the [Tailwind Babel macro](https://github.com/bradlc/babel-plugin-tailwind-components). State is managed through a light-weight (and probably way too "clever") immutable store modeled after Redux & friends and built with React Hooks, Contexts and [Immer.js](https://github.com/immerjs/immer); Actions and reducers are organized in a [ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/) like pattern. All of this lives in `src/`.

### How to Build

Thanks to CRA and `web-ext`, building the extension is as easy as:

```shell
yarn install
yarn package
```

### Notable Things

- Debug flags are editable in the preferences when built with the environment variable `REACT_APP_DEBUGGABLE=true`.
- `yarn build` or `npm run build` will build/bundle the extension into `/build`
- `yarn storybook` or `npm run storybook` will start a storybook which has most of the components featured
  - Stories live along side their components under `<component name>.stories.js` files.

To contribute, please fork this repo, make your changes and submit a PR back to this repository.

### Tasks

Known MVP work:

- [x] Add a `bundle` or `package` command for building the packages to upload
- [ ] Tests where appropriate
- [ ] Standardize styling of add on

Known Bugs:

- [ ] Turbolinks and the like page loaders don't cause the page-action icon to change
- [ ] Lots of tags causes the description box to move down while the page doesn't scroll

Enhancements:

- [ ] Fetching tags from tB's autocomplete endpoint (TODO: document)
- [ ] Rich markdown previews in descriptions with Slate.js
- [ ] Transition from Travis-CI to GitHub Actions

### Firefox

To load the extension into Firefox temporarily, visit `about:debugging` or see [this MDN doc](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

### Chrome

_NOTE:_ Chrome support is a work in progress.

To load the extension into Chrome temporarily, visit `chrome://extensions` or see [this Google Dev doc](https://developer.chrome.com/extensions).

This extension makes use of the [Mozila WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) to enable the use of the newer Promise based WebExtension APIs which are unavailable in Chrome. There could be edge cases which arise only in Chrome as a result of this.

## Credits

- Bookmark Icons from the [Google Material Design](https://material.io/icons/) project.
- Save & Link Icons from [Zondicons](http://www.zondicons.com/).

## License

MIT
