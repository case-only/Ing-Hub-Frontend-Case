
# ING Employee Management

This project is a case study for ING Hub and was created with Lit elements to develop web components. The fictional web application should help HR staff to help manage the company's employee information.

### Features

 - Routing (Vaadin Router)
 - Localization (English and Turkish)
 - List All Employee Records
 - Add a New Employee Record
 - Edit an Existing Employee Record
 - Delete an Existing Employee Record

  

### LitElement JavaScript starter

  

This project includes a sample component using LitElement with JavaScript.

  

This template is generated from the `lit-starter-js` package in [the main Lit

repo](https://github.com/lit/lit). Issues and PRs for this template should be

filed in that repo.

  

### Setup

  

Install dependencies:

  

```bash

npm  i

```
  

### Dev Server

  

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

  

To run the dev server and open the project in a new browser tab:

  

```bash

npm  run  serve

```

  

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.


### Bundling and minification

  

As stated in the [static site generation](#static-site) section, the bundling and minification setup in the Rollup configuration in this project is there specifically for the docs generation.

  

We recommend publishing components as unoptimized JavaScript modules and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

  

Please check the [Publishing best practices](https://lit.dev/docs/tools/publishing/#publishing-best-practices) for information on publishing reusable Web Components, and [Build for production](https://lit.dev/docs/tools/production/) for building application projects that include LitElement components, on the Lit site.

  

### More information

  

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.