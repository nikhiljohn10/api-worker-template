<p align="center"><img src="https://api.nikz.in/icon/256-fff-W-0ff-f0f" alt="API Worker Template"></p>

## API Worker Template for Cloudflare Workers

[![wrangler](https://img.shields.io/badge/wrangler-1.8.4-success)](https://github.com/cloudflare/wrangler) &nbsp;
[![npm](https://img.shields.io/badge/npm-6.14.5-success)](https://github.com/npm/cli/releases/tag/v6.14.5) &nbsp;
[![node](https://img.shields.io/badge/node-v14.2.0-success)](https://nodejs.org/dist/latest-v14.x/docs/api/) &nbsp;
[![ubuntu](https://img.shields.io/badge/ubuntu-18.04.4-success)](https://releases.ubuntu.com/18.04.4/)

Worker template to create an API with cloudflare worker and wrangler

#### Wrangler

You can use [wrangler](https://github.com/cloudflare/wrangler) to generate a new Cloudflare Workers project based on this template by running the following command from your terminal:

```
wrangler generate myapp https://github.com/nikhiljohn10/api-worker-template
```

Before publishing your code you need to edit `wrangler.toml` file and add your Cloudflare `account_id` - more information about publishing your code can be found [in the documentation](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/).

Once you are ready, you can publish your code by running the following command:

```
wrangler publish
```

#### Routing

`index.js` have the code `const app = new App('/api/v1')`. This will set the base path to `/api/v1`. This means, your base url will be `example.com/api/v1`

`/user/:userId` matchs `"https://example.com/api/v1/users/nikhiljohn10"` and respond with `{ userId: "nikhiljohn10"}`

`app.method_name(url_path, handler_method)` is the route loader method. `method_name` can be `connect, delete, head, options, patch, post, put, trace`, `url_path` is a regular expression and `handler_method` is executed by passing request and worker response object as arguments. So handler should be taking those parameters. Eg: `(req, res) => res.json(req)` will send back the request object received as json.


#### How to manage API

*Structure:*

[`./index.js`](https://github.com/nikhiljohn10/api-worker-template/blob/master/index.js) : This is the entry point for the API

[`./api/app.js`](https://github.com/nikhiljohn10/api-worker-template/blob/master/api/app.js) : This file helpwith the logical routing and execution

[`./api/controllers.js`](https://github.com/nikhiljohn10/api-worker-template/blob/master/api/controllers.js) : This file contains methods that are attached to routes

[`./api/response.js`](https://github.com/nikhiljohn10/api-worker-template/blob/master/api/response.js) : This file have various response models

[`./api/routes.js`](https://github.com/nikhiljohn10/api-worker-template/blob/master/api/routes.js) : This file contain and loads all the routes in to API

You can use `controllers.js` and `routes.js` to easily create an API.

#### Publisher script

If you are working directly on the system where wrangler is executed, then use `wrangler publish`

If you need the code to be auto published when you save a file in the working directory or you are executing inside a network directory, you will have to use the following.

```
Publish from remote storage and observe file changes

Usage: ./publisher [-h|-n|-s DIR]

Options:
	 -h|--help                  Displays this help
	 -n|--no-npm-install        Publish without npm install
	 -s|--source-dir [DIR]      Source directory name
	 -w|--wait [NUMBER]      	Waiting time in seconds (default: 2 seconds)
```

#### Serverless

To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
