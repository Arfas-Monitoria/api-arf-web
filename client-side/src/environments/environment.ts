// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { IEnvironment } from "src/app/interface/comum";
import { environment as ref } from "./environment.prod";

let environmentDev: IEnvironment = JSON.parse(JSON.stringify(ref));

environmentDev.production = false
environmentDev.API_PATH = 'http://localhost:8080'

export const environment = environmentDev;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
