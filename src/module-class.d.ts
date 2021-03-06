// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] 
 
/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */
 
/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */
 
/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
// export as namespace myClassLib;
 
declare module "claudia-api-builder" {
 /*~ This declaration specifies that the class constructor function
  *~ is the exported object from the file
  */
 export = ApiBuilder;

 /*~ Write your module's methods and properties in this class */
 class ApiBuilder {
  constructor(options?: any);

  get(uri: string, callback: Function): void;
  put(uri: string, callback: Function): void;
  post(uri: string, callback: Function): void;
  delete(uri: string, callback: Function): void;
 }
}