// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: ' http://127.0.0.1:8000/api/',
  appy: 'http://127.0.0.1:5000/predict'
};
export const firebaseConfig = {
  apiKey: "AIzaSyCw77B9VbxQh_nmOkHDJ-ad0XdA5BRAr7c",
  authDomain: "smartcommerce-9a879.firebaseapp.com",
  databaseURL: "https://smartcommerce-9a879-default-rtdb.firebaseio.com",
  projectId: "smartcommerce-9a879",
  storageBucket: "smartcommerce-9a879.appspot.com",
  messagingSenderId: "597519090943",
  appId: "1:597519090943:web:d54c7e38a5a83ba3f178ca",
  measurementId: "G-SLRMFZ35PY"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
