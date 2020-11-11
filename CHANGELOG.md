# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/darleikroth/react-native-zbase/compare/v1.0.0...v1.0.1) (2020-11-11)


### Features

* **list-item:** if not iconLeft provided do not render left element ([4495e5d](https://github.com/darleikroth/react-native-zbase/commit/4495e5d82b7ac362544f4b0bb138dbdb7abead95))

## [1.0.0](https://github.com/darleikroth/react-native-zbase/compare/v0.13.10...v1.0.0) (2020-10-23)


### ⚠ BREAKING CHANGES

* **list-item:** In order to use the new component `Pressable` of React Native, is mandatory to
update the React Native version to 0.63.0.

### Features

* **list-item:** started to use `Pressable` component for press interactions ([ea8358b](https://github.com/darleikroth/react-native-zbase/commit/ea8358bc2baa82659bc4b62b7a6327d01c6a9d5f))

### [0.13.10](https://github.com/darleikroth/react-native-zbase/compare/v0.13.9...v0.13.10) (2020-10-21)


### Features

* **simple-item:** add titleNumberOfLines prop ([2d4cf86](https://github.com/darleikroth/react-native-zbase/commit/2d4cf862492eba3b5bf1b154d915dfff78207782))

### [0.13.9](https://github.com/darleikroth/react-native-zbase/compare/v0.13.8...v0.13.9) (2020-10-02)


### Features

* **list-item:** add `right` prop at SimpleItem ([a8a41b7](https://github.com/darleikroth/react-native-zbase/commit/a8a41b7116b879a231dac57f117f99503fef83a8))

### [0.13.8](https://github.com/darleikroth/react-native-zbase/compare/v0.13.7...v0.13.8) (2020-08-18)


### Features

* **divider:** improve to use default hairlineWidth style ([2f6e251](https://github.com/darleikroth/react-native-zbase/commit/2f6e25177d1c9429a7e9ab5a5e60ed08b6870a43))

### [0.13.7](https://github.com/darleikroth/react-native-zbase/compare/v0.13.6...v0.13.7) (2020-08-11)


### Features

* **android:** improvemts at searchbar component (react-navigation v5 major compatibility) ([6e1c63c](https://github.com/darleikroth/react-native-zbase/commit/6e1c63cd74f3e94d6022279ec92f40895e9779d0))

### [0.13.6](https://github.com/darleikroth/react-native-zbase/compare/v0.13.5...v0.13.6) (2020-08-11)

### [0.13.5](https://github.com/darleikroth/react-native-zbase/compare/v0.13.4...v0.13.5) (2020-06-04)


### Features

* **options:** add `onPress` & `onLongPress` options, `callback` param is deprecated ([3924750](https://github.com/darleikroth/react-native-zbase/commit/3924750779dc9874feb24515fe45b788d51d1707))

### [0.13.4](https://github.com/darleikroth/react-native-zbase/compare/v0.13.3...v0.13.4) (2020-04-01)


### Bug Fixes

* fontWeight for android ([e789501](https://github.com/darleikroth/react-native-zbase/commit/e789501))



### [0.13.3](https://github.com/darleikroth/react-native-zbase/compare/v0.13.2...v0.13.3) (2019-11-22)


### Bug Fixes

* bump lodash.template from 4.4.0 to 4.5.0 ([aaf8bde](https://github.com/darleikroth/react-native-zbase/commit/aaf8bde))
* bump mixin-deep from 1.3.1 to 1.3.2 ([27b4f25](https://github.com/darleikroth/react-native-zbase/commit/27b4f25))



### [0.13.2](https://github.com/darleikroth/react-native-zbase/compare/v0.13.1...v0.13.2) (2019-11-22)


### Bug Fixes

* **package:** remove viewpager dependence, change to peerDependencies ([144f4c3](https://github.com/darleikroth/react-native-zbase/commit/144f4c3))



### [0.13.1](https://github.com/darleikroth/react-native-zbase/compare/v0.13.0...v0.13.1) (2019-10-09)


### Features

* add touchDisabled to disable all interactions for the component ([4f169b5](https://github.com/darleikroth/react-native-zbase/commit/4f169b5))



## [0.13.0](https://github.com/darleikroth/react-native-zbase/compare/v0.12.1...v0.13.0) (2019-09-03)


### refactor

* **list-item:** improves styles, code syntax and use `memo` from react hooks ([246c767](https://github.com/darleikroth/react-native-zbase/commit/246c767))


### BREAKING CHANGES

* **list-item:** Using React Hooks for the element, which requires react-native >= 0.59.0



### [0.12.1](https://github.com/darleikroth/react-native-zbase/compare/v0.12.0...v0.12.1) (2019-08-29)


### Bug Fixes

* **select-items:** removed requestAnimationFrame on callback ([007f1db](https://github.com/darleikroth/react-native-zbase/commit/007f1db))



## [0.12.0](https://github.com/darleikroth/react-native-zbase/compare/v0.11.1...v0.12.0) (2019-08-23)


### Features

* **search-view:** improvements to set more style options to the component ([c306232](https://github.com/darleikroth/react-native-zbase/commit/c306232))



### [0.11.1](https://github.com/darleikroth/react-native-zbase/compare/v0.11.0...v0.11.1) (2019-07-10)


### Bug Fixes

* improve some code and removed console.log ([d4d9995](https://github.com/darleikroth/react-native-zbase/commit/d4d9995))



## [0.11.0](https://github.com/darleikroth/react-native-zbase/compare/v0.10.1...v0.11.0) (2019-07-10)


### Features

* **touchable:** upgrade this element to use `react-native-gesture-handler` as native touchable ([e9bcd8f](https://github.com/darleikroth/react-native-zbase/commit/e9bcd8f))



### [0.10.1](https://github.com/darleikroth/react-native-zbase/compare/v0.10.0...v0.10.1) (2019-06-19)


### Bug Fixes

* **view-pager:** set "removeClippedSubviews" to "false" on ScrollView component, for IOS ([14e17cb](https://github.com/darleikroth/react-native-zbase/commit/14e17cb))



## [0.10.0](https://github.com/darleikroth/react-native-zbase/compare/v0.9.10...v0.10.0) (2019-05-27)


### Features

* **view-pager:** changed to use "@react-native-community/viewpager" ([c0936ca](https://github.com/darleikroth/react-native-zbase/commit/c0936ca))
