# Project BKFabric 

LVTN - HCMUT18: Xây dựng hệ thống quản lý đơn đặt hàng cho doanh nghiệp vải trên mobile.
Dự án được phát triển và build trên môi trường Expo.
## Technical

- **Flux architecture**
  - [Redux](https://redux.js.org/docs/introduction/)
- **Routing and navigation**
  - [React Navigation](https://github.com/react-navigation/react-navigation) for native mobile
- **UI Toolkit/s**
  - [Native Base](https://nativebase.io/) for native mobile
- **Connect API**
  - [Axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
- **BarCode Scanner**
  - [BarCode](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/) expo-barcode-scanner provides a React component that renders a viewfinder for the device's camera
- **React Native Chart Kit**
  - [React Native Chart Kit](https://www.npmjs.com/package/react-native-chart-kit) Line Chart, Bezier Line Chart, Progress Ring, Bar chart, Pie chart, Contribution graph
## Project scaffolding
```
- expo                           # Expo project
- src                            # source code for both platform
  - api                          # api for app project
  - components                   # Precision components
  - constants
     - images                    # define default images
  - navigation                   # Navigation functions
  - page                         # Screen for App
  - redux                        #  This will contain all our redux state management files like actions, reducers,
   store config, saga, etc.
  - utils                        # Utility
     - axios                     # Support call api with axios
     - transfer                  # Function support transfer order status and bill status
  - theme                        # Theme support for App
  - app.js                       # Register model, router, plugins  
  ## https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
     - actionsType               #
     - actions                   # The only way to mutate the internal state is to dispatch an action.
        - authActions
     - reducers                  #
        - authReducer
        - loadingReducer
        - index                  # combine Reducers
     - saga
        - authSaga
        - index                  # fork all listener
     - selectors                 # compute derived data and used as input.
        - authSelector
     - store                     # A store holds the whole state tree of your application
- babelrc.js
- eslintrc.js
- package.json
- index.js
```

## Alias
- api
- components
- utils
- pages
- constants
- navigations
- assets
- redux
- theme
```

## 🚀 Getting Started

```
### 1. Installation

```bash
$ yarn install || npm install
```
### 2. Run expo project

```sh
$ yarn start || npm start || expo start
```

## Coding convention

- React component: https://github.com/airbnb/javascript/tree/master/react
- Folder name in **scenes**: camelCase
- Folder name in **components**: PascalCase

# How to create a new flow:

1. Go to **pages** folder and define the new component
3. Create the new screen at **in src/pages**

## Lib extends Default

- moment
- lodash
- react-native-vector-icons
- native-base (UI kit)
- react-native-dotenv
- redux-persist
- @react-native-community/hooks
- @react-native-async-storage/async-storage
- @react-navigation/native
- react-native-chart-kit
- react-native-timeline-flatlist
- react-redux
- @react-navigation/material-bottom-tabs
## Team member

[@VanTien266](https://github.com/VanTien266)

[@ttnghia179](https://github.com/ttnghia179)

[@nguyenvantinh06](https://github.com/nguyenvantinh06)

## Release App

Download at https://drive.google.com/drive/folders/18uDByx0CyZwAr7OE019P1he9-1r7QiEL?usp=sharing