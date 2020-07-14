# Changelog

<a name="4.1.0"></a>
## 4.1.0 (2020-07-14)

### Added

- ✨ translatableFactory: add optional onError prop [[a47c475](https://github.com/AckeeCZ/jerome/commit/a47c47553684a9562af0dfbfa327958ee65e131b)]
- ➕ Add @ackee/browserslist-config package [[2996dad](https://github.com/AckeeCZ/jerome/commit/2996dadc2be69131b9004f74efaa196d77151161)]

### Changed

- 🔧 Update changelog script [[5e44ecf](https://github.com/AckeeCZ/jerome/commit/5e44ecf77cc6ca922ee83f5aac9e369b26a6061f)]
- ⬆️ Loosen up peer dependencies (from patch to minor version) [[9cfa24b](https://github.com/AckeeCZ/jerome/commit/9cfa24b0c5b23c8649fceb5275bcdaa51d5867c8)]
- 🔧 Replace npm command with yarn [[91ebdc4](https://github.com/AckeeCZ/jerome/commit/91ebdc4c5bc302d62e24ce2d6c2ab54a68fa9920)]
- ⬆️ Upgrade @babel/* packages [[9f614a4](https://github.com/AckeeCZ/jerome/commit/9f614a48a56d6e72549d9759d36c6c65a2d1edb2)]

<a name="4.0.1"></a>
## 4.0.1 (2020-05-20)

### Changed

- 🚨 Fix lint errors [[63ec326](https://github.com/AckeeCZ/jerome/commit/63ec3266ea9b7cf2d56afb5ec2a21d06066f5548)]
- 🔧 Setup husky to run lint before push [[2daf101](https://github.com/AckeeCZ/jerome/commit/2daf101787c23ee159875dc1c554399068bdf817)]
- ♻️ Use async/await instead of promise based try catch [[bcef378](https://github.com/AckeeCZ/jerome/commit/bcef37806e77eef7305b75868d0f750cd98ebfde)]

### Fixed

- 🐛 Catch errors when opening DB and fallback to mock DB in that case [[580a243](https://github.com/AckeeCZ/jerome/commit/580a2430f85b4f99727dafd5b68d64d510cd7550)]

<a name="4.0.0"></a>
## 4.0.0 (2020-05-04)

### Added

- ✨ Add second entry point for antd compliant imports [[24efcf7](https://github.com/AckeeCZ/jerome/commit/24efcf752399276124f17a9c929829a5275d5291)]
- ✨ Uses create intl and RawIntlProvider It is usefull to create intl in the component instead of delegating it to the IntlProvider since it can be sent to the saga to be stored for an external usage. [[14b473a](https://github.com/AckeeCZ/jerome/commit/14b473ad495b1021e6e886abe37a3925e9bd6165)]
- 📝 Add vulnerabilities badge into the readme [[5662a0c](https://github.com/AckeeCZ/jerome/commit/5662a0c3a3c2343d299db24992f7a36523c116c2)]

### Changed

- ⬆️ Upgrade version of nodejs image used at ci server [[2b63152](https://github.com/AckeeCZ/jerome/commit/2b63152e7a998a091e9a8280d13adcbdd0c84fd1)]
- ♻️ Separate antd related code into standalone &quot;index&quot; file [[9ff4870](https://github.com/AckeeCZ/jerome/commit/9ff4870f1e4e805ba6b37f3c37e945bd6c71dc32)]
- 🔧 Mark package as sideEffects free [[bdb6d81](https://github.com/AckeeCZ/jerome/commit/bdb6d819cf9c25fecb40592e90d21c08c42135aa)]
- ⚡ Add yarnrc to have better release commits [[a2c32ef](https://github.com/AckeeCZ/jerome/commit/a2c32ef87d18352036c9a303e786baf0d49e2ed5)]
- ♻️ Replace changelog-it with gitmoji-changelog [[dbbd642](https://github.com/AckeeCZ/jerome/commit/dbbd642c6ffe128d770d2c0195b0baf56ad2221f)]
- ♻️ Refactors the intlProvider saga The saga now doesn&#x27;t create the duplication of the intl from the react intl provider but uses the intl instance from the intl provider [[e74cc0b](https://github.com/AckeeCZ/jerome/commit/e74cc0b25fbd9fb93a87fb903bea355a8de06c73)]

### Removed

- 🔥 Remove package-lock [[702fbc0](https://github.com/AckeeCZ/jerome/commit/702fbc029b4e513f0caa8f07ce6609dd4f6aa403)]

### Fixed

- 💚 Split build into phases [[2ac4e87](https://github.com/AckeeCZ/jerome/commit/2ac4e876724162d6faab7fe5f5120b9f23f342ee)]
- ✏️ Add types for jest [[6734e82](https://github.com/AckeeCZ/jerome/commit/6734e82e59816f5659fc7a61bff675644b5fcaa7)]

### Security

- 🔒 Add resolutions for marked pkg to fix moderate vulnerabilities [[a22dd9c](https://github.com/AckeeCZ/jerome/commit/a22dd9cf849feb214166e48de5016ec8a4028b28)]

<a name="3.1.0"></a>

## 3.1.0 (2020-03-24)

### Added
- ⬆️ upgrade to antd config provider

<a name="3.0.0"></a>

## 3.0.0 (2019-09-04)

### Added
- Tests execution at CI server
- Husky scripts

### Changed
- Change reducer factory interface - it can receive list of languages and use it
  to determine default language from window.navigator.
- Do nothing for GET_LOCALE action in reducer
- Exclude tests from typechecking

<a name="2.0.0"></a>

## 2.0.0 (2019-08-23)

### Changed
- Split translatableHOC to translatableFactory and translatableWithAntdFactory
- Upgrade react-intl to version 3 having new context API and doesn't require key={locale}

<a name="1.1.1"></a>

## 1.1.1 (2019-08-22)

### Added
- Prepare script to build sources before publishing

<a name="1.1.0"></a>

## 1.1.0 (2019-08-22)

### Added
- Export action types

<a name="1.0.2"></a>

## 1.0.2 (2019-07-02)

### Fixed
- Publish once again with correctly generated `lib` files

<a name="1.0.1"></a>

## 1.0.1 (2019-07-02)

### Fixed
- Fixed using  on server with simple mock of indexedDB

<a name="1.0.0"></a>

## 1.0.0 (2019-06-24)

### Changed
- Upgrade `redux-saga` to `1.x` version.

<a name="0.3.4"></a>

## 0.3.4 (2019-06-24)

### Fixed
- Don't use ES modules in CommonJS environment.

<a name="0.3.3"></a>

## 0.3.3 (2019-05-27)

### Changed
- Replace source directory for antd imports - `antd/lib` -> `antd/es`.

<a name="0.3.2"></a>

## 0.3.2 (2019-04-29)

### Changed
- Replace quite large `localforage` package with smaller one `idb` package.

<a name="0.3.1"></a>

## 0.3.1 (2019-01-30)

### Changed
- Update changelog-it

<a name="0.3.0"></a>

## 0.3.0 (2019-01-30)

### Added
- CHANGELOG.md and script for generating its records

<a name="0.2.5"></a>

## 0.2.5 (2019-01-30)

### Fixed
- Exclude stories from build [`850a0df`](https://github.com/AckeeCZ/jerome/commit/850a0df75ddc71ab1e9be7af41999ee279109126)

<a name="0.2.4"></a>

## 0.2.4 (2019-01-30)

### Fixed
- Ignore story and definitions when transpiling [`921bb34`](https://github.com/AckeeCZ/jerome/commit/921bb34516b3500973ac65bd5e7454bab75bfc04)

<a name="0.2.3"></a>

## 0.2.3 (2019-01-24)

### Changed
- Improve documentation [`2d1e327`](https://github.com/AckeeCZ/jerome/commit/2d1e327c58dc2a37af675dcdefdbd9c282139e54)

<a name="0.2.2"></a>

## 0.2.2 (2019-01-21)

### Added
- New baner & badges into readme [`9c956c0`](https://github.com/AckeeCZ/jerome/commit/9c956c0e3fe75a44ac14eb3c239690e5aa2d3c34)

### Changed
- Use tslint-config-ackee instead of tslint:recommended [`ced9c83`](https://github.com/AckeeCZ/jerome/commit/ced9c836b0765cbee2fbb1d5c3c9f802d120123e)

### Removed
- Unused utility-types package [`c6177fd`](https://github.com/AckeeCZ/jerome/commit/c6177fd39075cf5b972901886502f960fe36c1e1)

### Fixed
- Loading story source by upgrade to storybook@4 [`d65571b`](https://github.com/AckeeCZ/jerome/commit/d65571b044e4b3787c2bd3fb6599c9b855d7feff)
- Starting storybook [`48fd035`](https://github.com/AckeeCZ/jerome/commit/48fd03529ef12ade2d3c83f069b1a0cf072efd20)

<a name="0.2.1"></a>

## 0.2.1 (2018-12-11)

### Fixed
- Fix readme formatting for npm [`2439190`](https://github.com/AckeeCZ/jerome/commit/24391909c26d47a0107b6a19d924cf7349eaaff4)

<a name="0.2.0"></a>

## 0.2.0 (2018-12-11)

### Added
- Add getIntl saga for accessing the intl provider outside React context [`26c9dce`](https://github.com/AckeeCZ/jerome/commit/26c9dced97ef5cedf69b17206736121bd0478096)
- Start npm script - compiles files on change [`025fb0e`](https://github.com/AckeeCZ/jerome/commit/025fb0ecc9629c623ec7ad466a9277af3f7ec6cd)
- MIT license [`724f438`](https://github.com/AckeeCZ/jerome/commit/724f4386ad3513eed014856d9c203e71100f881f)

### Changed
- Update packages and set correct git repo url [`5334a89`](https://github.com/AckeeCZ/jerome/commit/5334a899c7937216566f3c85d4219997e67c6285)
- translatableHOC: set Fragment as default textComponent [`986f43d`](https://github.com/AckeeCZ/jerome/commit/986f43d82afe788c0a3139ef5f44522dc697ec5e)
- Install localforage package [`d87f44b`](https://github.com/AckeeCZ/jerome/commit/d87f44b2623dd85a65a9a5841d8cada5355c0ccd)
- Extend coverage of the .npmignore [`6d1fb8d`](https://github.com/AckeeCZ/jerome/commit/6d1fb8dabbc66e28b4feb864ee883fd688abe09b)
- Add return type to the translatableFactory [`02f3673`](https://github.com/AckeeCZ/jerome/commit/02f3673c71be41ee6c55c281af15dc905d563bd4)

### Fixed
- TranslatableHOC: Fix intLocaleData type [`fe66503`](https://github.com/AckeeCZ/jerome/commit/fe66503d919a39c2a5b6874b7cbb0bc6da9e9be6)
- Storybook npm script [`87d731e`](https://github.com/AckeeCZ/jerome/commit/87d731e29652530dbbc7aa111c1318a042753268)
- Ts warning [`b3d295b`](https://github.com/AckeeCZ/jerome/commit/b3d295b40d9f7af6f903b1a323de7a015b25f6d4)

<a name="0.1.1"></a>

## 0.1.1]( 2018-12-11)

### Changed
- Hopefuly last attempt for valid deploying token [`8955f54`](https://github.com/AckeeCZ/jerome/commit/8955f54d80ab9adb644ce9cb991115cf085b0190)

<a name="0.1.9"></a>

## 0.1.9 (2018-12-11)

### Changed
- Another key [`155b42d`](https://github.com/AckeeCZ/jerome/commit/155b42d9e6ee5fa1b5aa9b04e73dc67e84bad3c3)

<a name="0.1.8"></a>

## 0.1.8 (2018-12-11)

### Changed
- Another attempt for correct access token [`38347fd`](https://github.com/AckeeCZ/jerome/commit/38347fdacd8a039e979c9f04e3a2f7735f86af4a)  [`78908b9`](https://github.com/AckeeCZ/jerome/commit/78908b9e87febbcec9f15a312924b2dea321e804)

<a name="0.1.6"></a>

## 0.1.6 (2018-12-11)

### Changed
- Try another auth token for deploying [`1b53b5b`](https://github.com/AckeeCZ/jerome/commit/1b53b5bbf84077d6da385b4130130fffb3ffce1c)

<a name="0.1.5"></a>

## 0.1.5 (2018-12-11)

### Changed
- Try the npm auth token again after travis login --com [`c300d4e`](https://github.com/AckeeCZ/jerome/commit/c300d4ed98fd38b6bf3bcfe14e1b8dfbadb2c752)

<a name="0.1.4"></a>

## 0.1.4 (2018-12-11)

### Changed
- Try to use token from ~/.npmrc [`5dc83d5`](https://github.com/AckeeCZ/jerome/commit/5dc83d564509422824a9531b9b426d1d6d9d5eca)

<a name="0.1.3"></a>

## 0.1.3 (2018-12-11)

### Fixed
- Generate npm auth token for ackeecz user - old was for ackee which doesn't exist anymore [`aca6290`](https://github.com/AckeeCZ/jerome/commit/aca62907d987a14d22ae48f2cd8719a890cbde2c)

<a name="0.1.2"></a>

## 0.1.2 (2018-12-11)

### Changed
- Regenerate npm access token into travis.yml [`d59c368`](https://github.com/AckeeCZ/jerome/commit/d59c368bf87e70be2aad309455a8cc18fbd19bb8)

<a name="0.1.1"></a>

## 0.1.1 (2018-12-10)

### Added
- Public access for publishing into package.json [`750a39c`](https://github.com/AckeeCZ/jerome/commit/750a39c45f72a83de4f79f79a5a6b9ad5eb8d554)

<a name="0.1.0"></a>

## 0.1.0 (2018-12-10)

### Added
- Welcome Jerome to the world [`faf86ba`](https://github.com/AckeeCZ/jerome/commit/faf86ba312df23aa7032e490cbcdeca2d1261300)

