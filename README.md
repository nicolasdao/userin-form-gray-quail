# UserIn Form - Gray Quail &middot;  [![NPM](https://img.shields.io/npm/v/userin-form-gray-quail.svg?style=flat)](https://www.npmjs.com/package/userin-form-gray-quail) [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause) [![Neap](https://neap.co/img/made_by_neap.svg)](#this-is-what-we-re-up-to)
__*UserIn Form - Gray Quail*__ is a configurable JS form widget that uses the __*[UserIn](https://github.com/nicolasdao/userin)*__ middleware to login to Apps using the following popular Identity Providers:

* Facebook
* Google
* LinkedIn
* GitHub
* Twitter

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/standard_config.jpg" width="400"/></p>

This project uses vanilla JS and CSS. There are no dependencies, except for development. More about modifying this project to your own needs under the [Customizing This Project To Your Own Needs](#customizing-this-project-to-your-own-needs) section.

# Table of Contents

> * [Install](#install) 
> * [Configuration](#configuration) 
>   - [Standard Config](#standard-config)
>   - [Switching To Modal Mode](#switching-to-modal-mode)
>   - [Other Configs](#other-configs)
>   - [Full Parameters List](#full-parameters-list)
> * [List Of Supported Identity Providers](#list-of-supported-identity-providers)
> * [Customizing This Project To Your Own Needs](#customizing-this-project-to-your-own-needs)
>   - [Option 1 - Replace The CSS With Your Own (easiest)](#option-1---replace-the-css-with-your-own): 
>   - [Option 2 - Clone This Project And Build Your Own Form](#option-2---clone-this-project-and-build-your-own-form): 
> * [Contribute](#contribute)
> * [About Neap](#this-is-what-we-re-up-to)
> * [License](#license)

# Install

Add the CSS and the JS into your web page as follow:

```html
<!DOCTYPE html>
<html>
<head>
	<!-- Some HTML here... -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.min.css">
</head>
<body>
	<div id="userin-form-modal"></div>
	<!-- Some HTML here... -->
	<script src="https://cdn.jsdelivr.net/npm/userin-form-gray-quail"></script>
	<script type="text/javascript">
		var loginForm = new UserInForm({
			el: '#userin-form-modal',
			usernamePassword: 'https://your-hosted-userin-domain/default/oauth2'
		})
	</script>
</body>
</html>
```

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/default_config.jpg" width="400"/></p>

This example demonstrates the minimal configuration. 

| Parameter				| Field		| Type		| Description																	|
|-----------------------|-----------|-----------|-------------------------------------------------------------------------------|
| `el` 					| OPTIONAL	| String	| CSS selector to the DOM under which the form is inserted.	If not defined, the form is attached under the body	|
| `usernamePassword` 	| REQUIRED	| String	| URL of your UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2) |

# Configuration
## Standard Config

The configuration above showcases the minimal settings. The following example demonstrates a configuration that is a bit more common:

```js
var loginForm = new UserInForm({
	el: 'some-css-dom-selector',
	logo: "https://neap.co/img/neap_color_horizontal.png",
	tagline: "Killer App",
	blurb: "The adventure begins now",
	usernamePassword: 'http://localhost:3000/default/oauth2',
	facebook: 'http://localhost:3000/facebook/oauth2',
	google: 'http://localhost:3000/google/oauth2',
	terms: 'https://termsfeed.com/blog/saas-terms-use-privacy-policy/', 
	privacyPolicy: 'https://privacypolicies.com/blog/privacy-policy-saas/', 
	forgotPassword: 'https://neap.co', 
	redirectUrls: {
		onSuccess: 'http://localhost:8080/success',
		onError: 'http://localhost:8080/dev'
	}
})
```

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/standard_config.jpg" width="400"/></p>

__*Parameters*__

| Parameter				| Field		| Type		| Description																	|
|-----------------------|-----------|-----------|-------------------------------------------------------------------------------|
| `el` 					| OPTIONAL	| String	| CSS selector to the DOM under which the form is inserted.	If not defined, the form is attached under the body					|
| `logo` 				| OPTIONAL	| String	| URL of the logo that appears at the top of the form.							|
| `tagline` 			| OPTIONAL	| String	| Tagline that appears at the top of the form.									|
| `blurb` 				| OPTIONAL	| String	| Blurb that appears at the top of the form.									|
| `usernamePassword` 	| REQUIRED	| String	| URL of your UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2) |
| `facebook` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Facebook (e.g., http://localhost:3000/facebook/oauth2) 	|
| `google` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Google (e.g., http://localhost:3000/google/oauth2) 	|
| `terms` 				| OPTIONAL	| String	| URL to your terms and conditions web page. 									|
| `privacyPolicy` 		| OPTIONAL	| String	| URL to your privacy policy web page. 											|
| `forgotPassword` 		| OPTIONAL	| String	| URL to your forgot password web page. 										|
| `redirectUrls` 		| OPTIONAL	| Object	| URLs used after successful or failed authentication. 							|


> RECOMMENDATION: Use the URL where this form is hosted for the `redirectUrls.onError`. __*UserIn*__ passes error messages in the query string and this form has been created to handled this format. When an error occurs, the details will be displayed in this form.

> NOTE: The order in which the Identity Providers appear in the form can be modified by changing the order of their definitions. In the example above, putting Google before Facebook cna be done as follow:
> 	```js
>	{
>		google: 'http://localhost:3000/google/oauth2',
>		facebook: 'http://localhost:3000/facebook/oauth2',
>	}
>	```

## Switching To Modal Mode

This example is very similar to the one above, but instead of using a static form, this configuration uses a modal:

```html
<!DOCTYPE html>
<html>
<head>
	<title>UserIn - Gray Quail</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.min.css">
</head>
<body>
	<button id="login">Login</button>
	<div id="main"></div>
	<script src="https://cdn.jsdelivr.net/npm/userin-form-gray-quail"></script>
	<script type="text/javascript">
		var loginForm = new UserInForm({
			el: '#main',
			logo: "https://neap.co/img/neap_color_horizontal.png",
			tagline: "Killer App",
			blurb: "The adventure begins now",
			usernamePassword: 'http://localhost:3000/default/oauth2',
			facebook: 'http://localhost:3000/facebook/oauth2',
			google: 'http://localhost:3000/google/oauth2',
			terms: 'https://termsfeed.com/blog/saas-terms-use-privacy-policy/', 
			privacyPolicy: 'https://privacypolicies.com/blog/privacy-policy-saas/', 
			forgotPassword: 'https://neap.co', 
			redirectUrls: {
				onSuccess: 'http://localhost:8080/success',
				onError: 'http://localhost:8080/dev'
			},
			modal: {
				animate: true
			},
			init: {
				visible: false
			}
		})
		document.getElementById('login').addEventListener('click', function() {
			loginForm.show()
			return false
		})
	</script>
</body>
</html>
```

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/standard_modal.gif" width="400"/></p>

__*Parameters*__

| Parameter				| Field		| Type				| Description															|
|-----------------------|-----------|-------------------|-----------------------------------------------------------------------|
| `modal` 				| OPTIONAL	| Boolean or Object	| To toggle the modal mode, set this property to either true or a truthy object. |
| `modal.animate` 		| OPTIONAL	| Boolean	| Default is false. When false, the modal appears immediately when it is opened. It also disappears immediately when it is closed. When set to true, opening and closing the form respectively fades in and out.	|
| `init` 				| OPTIONAL	| Object	| This object determines the form's behavior after it has loaded.				|
| `init.visible` 		| OPTIONAL	| Boolean	| Default is true. When true, the form appears automatically after it is loaded. When set to false, the form when it has loaded. It must be opened explicitely using the `show()` api as demonstrated at the bottom of the example above. |

## Other Configs
### Changing The Default Form From Sign Up To Log In

Use the `init` property as follow:

```js
init: {
	mode: 'login'
}
```

### Configuring Tagline & Blurb For The Login and Sign Up Forms

Instead of using the `tagline` and `blurb` as previously:

```js
tagline: "Killer App",
blurb: "The adventure begins now"
```

Use:
```js
tagline: {
	signup: "Killer App",
	login: "Welcome Back"
},
blurb: {
	signup: "The adventure begins now",
	login: "Let's continue"
}
```

## Full Parameters List

| Parameter				| Field		| Type		| Description																	|
|-----------------------|-----------|-----------|-------------------------------------------------------------------------------|
| `el` 					| OPTIONAL	| String	| CSS selector to the DOM under which the form is inserted.	If not defined, the form is attached under the body					|
| `usernamePassword` 	| REQUIRED	| String	| URL of your UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2) |
| `logo` 				| OPTIONAL	| String	| URL of the logo that appears at the top of the form.							|
| `tagline` 			| OPTIONAL	| String	| Tagline that appears at the top of the form.									|
| `blurb` 				| OPTIONAL	| String	| Blurb that appears at the top of the form.									|
| `facebook` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Facebook (e.g., http://localhost:3000/facebook/oauth2) 	|
| `google` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Google (e.g., http://localhost:3000/google/oauth2) 	|
| `terms` 				| OPTIONAL	| String	| URL to your terms and conditions web page. 									|
| `privacyPolicy` 		| OPTIONAL	| String	| URL to your privacy policy web page. 											|
| `forgotPassword` 		| OPTIONAL	| String	| URL to your forgot password web page. 										|
| `redirectUrls` 		| OPTIONAL	| Object	| URLs used after successful or failed authentication. 							|
| `modal` 				| OPTIONAL	| Boolean or Object	| To toggle the modal mode, set this property to either true or a truthy object. |
| `modal.animate` 		| OPTIONAL	| Boolean	| Default is false. When false, the modal appears immediately when it is opened. It also disappears immediately when it is closed. When set to true, opening and closing the form respectively fades in and out.	|
| `init` 				| OPTIONAL	| Object	| This object determines the form's behavior after it has loaded.				|
| `init.mode` 			| OPTIONAL	| String	| Default is 'signup'. With 'signup', the default form shown to the user when the widget appears is the signup form. When set to 'login', the first form shown to the user when the widget appears is the login form. |
| `init.visible` 		| OPTIONAL	| Boolean	| Default is true. This configuration is only when the `modal` property is truthy. When true, the form appears automatically after it is loaded. When set to false, the form when it has loaded. It must be opened explicitely using the `show()` api as demonstrated at the bottom of the example above. |

# List Of Supported Identity Providers

This __*[UserIn](https://github.com/nicolasdao/userin)*__ form widjet supports 5 different Identity Providers (IdPs) and the standard username/password form. To use any of those IdPs, your [UserIn](https://github.com/nicolasdao/userin) instance must have been configured to support them. To set up an IdP in _UserIn_, please refer to the documentation [here](https://github.com/nicolasdao/userin#2-create-an-app-in-each-idp-you-want-to-support).

Once configured in _UserIn_, each IdP should have an entry point similar to `https://your-hosted-userin-domain/<idp-name>/oauth2`. Configuring this form with an IdP can then be achieved by modifying this `UserInForm` input as follow:

```js
new UserInForm({
	// other configs...
	usernamePassword: 'https://your-hosted-userin-domain/default/oauth2',
	facebook: 'https://your-hosted-userin-domain/facebook/oauth2',
	google: 'https://your-hosted-userin-domain/google/oauth2',
	linkedin: 'https://your-hosted-userin-domain/linkedin/oauth2',
	github: 'https://your-hosted-userin-domain/github/oauth2',
	twitter: 'https://your-hosted-userin-domain/twitter/oauth2'
})
```

This config will enable all available IdPs in that order:
- Facebook
- Google 
- LinkedIn
- GitHub
- Twitter

To change the order to, for example:
- Twitter
- GitHub
- LinkedIn
- Google 
- Facebook

Simply change the input order as follow:

```js
new UserInForm({
	// other configs...
	usernamePassword: 'https://your-hosted-userin-domain/default/oauth2',
	twitter: 'https://your-hosted-userin-domain/twitter/oauth2',
	github: 'https://your-hosted-userin-domain/github/oauth2',
	linkedin: 'https://your-hosted-userin-domain/linkedin/oauth2',
	google: 'https://your-hosted-userin-domain/google/oauth2',
	facebook: 'https://your-hosted-userin-domain/facebook/oauth2'
})
```
# Customizing This Project To Your Own Needs

This project aims to be modified by you so you can customize it beyond the out-of-the-box configurations we offer. There are 2 ways you can customize this project:

1. __*[Option 1 - Replace The CSS With Your Own (easiest)](#option-1---replace-the-css-with-your-own)*__: With this option, the form's functionalities fit all you needs, but the style does not. To solve this challenge, simply copy this form's CSS, and update it based on your specific needs. 
2. __*[Option 2 - Clone This Project And Build Your Own Form](#option-2---clone-this-project-and-build-your-own-form)*__: With this option, the functionalities of this form do not meet your requirements fully. Instead of recoding everything from scratch, you prefer to leverage our work and modify our code. 

## Option 1 - Replace The CSS With Your Own

The original CSS and its minified version are respectively hosted at:
- [https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.css](https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.css)
- [https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.min.css](https://cdn.jsdelivr.net/npm/userin-form-gray-quail/dist/style.min.css)

Copy the unminified version, modify it, and use your version instead of ours.

## Option 2 - Clone This Project And Build Your Own Form

Follow the next steps to build your own form using this project:

## 1. Clone/Fork This Project

Fork this repo, or clone it using:
```
git clone https://github.com/nicolasdao/userin-form-gray-quail.git
``` 

## 2. Install The Dev Dependencies & Run The Project

```
npm i
```

The only dependencies of this project are dev dependencies which can be described in a nutshell as:

- __babel + webpack + uglifyjs__: Used to compiled the source code written with ES6 to ES5.
- __uglifycss__: Used to compress the CSS.
- __eslint__: Used to lint the code.
- __standard-version__: Used to facilitate the version bumping and the CHANGELOG maintenance.
- __express__: Used to host a test server.

The source code itself does not use any dependencies. It is pure vanilla JS and vanilla CSS.

After installing all the dependencies, run the server:

```
npm start
```

This will host a demo page with a login button at [http://localhost:8080/dev/](http://localhost:8080/dev/).

> INFO: The HTML page hosted at the above URL is the `index-dev.html`. Use this page during your test. The `index-prod.html` is discussed later in step [4. Rebuild For Production Use](#4-rebuild-for-production-use).

## 3. Modify The Source Code To Fit Your Requirements

The source code is located under the `src` folder. There are only 2 files:
- __index.js__: Contains the vanilla ES6 JS responsible to configure the widget.
- __style.css__: Contains the vanilla CSS responsible to styling the widget.

## 4. Rebuild For Production Use

Once you're done with all your code changes and you feel ready to deploy your code in production, follow the next steps:

1. Lint the code to minimize the risk of silly mistakes: `npm run lint`.
2. Change the project name in the `package.json` to `userin-form-<your code name>`. This is important if you're interested in having your form listed as an official _UserIn_ form. If you're not interested, rename that package using whatever name you want. 
3. Compile the code to support ES5 and minimize both the JS and CSS: `npm run build`.
4. Test your rebuilt widget using the __prod__ endpoint:
	1. `npm start`
	2. Browse to [http://localhost:8080/prod/](http://localhost:8080/prod/). This endpoint serves the `index-prod.html` page which is configured to serve the content compiled inside the `dist` folder.

## Deploy Your New Widget To NPM & JsDeliver CDN

Deploy your new UserIn form to NPM: `npm publish`

This command will automatically host your new widget for free using the [https://www.jsdelivr.com/](https://www.jsdelivr.com/) CDN. Your code will be available at:

- Unminified JS: [https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/index.js](https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/index.js)
- Minified JS: [https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/index.min.js](https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/index.min.js)
- Unminified CSS: [https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/style.css](https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/style.css)
- Minified JS: [https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/style.min.css](https://cdn.jsdelivr.net/npm/your-package-name@your-current-version/dist/style.min.css)

# Contribute

Though this project is designed to be forked and modified to your own custom needs, we also accepts pull requests. 

# This Is What We re Up To
We are Neap, an Australian Technology consultancy powering the startup ecosystem in Sydney. We simply love building Tech and also meeting new people, so don't hesitate to connect with us at [https://neap.co](https://neap.co).

Our other open-sourced projects:
#### GraphQL
* [__*graphql-s2s*__](https://github.com/nicolasdao/graphql-s2s): Add GraphQL Schema support for type inheritance, generic typing, metadata decoration. Transpile the enriched GraphQL string schema into the standard string schema understood by graphql.js and the Apollo server client.
* [__*schemaglue*__](https://github.com/nicolasdao/schemaglue): Naturally breaks down your monolithic graphql schema into bits and pieces and then glue them back together.
* [__*graphql-authorize*__](https://github.com/nicolasdao/graphql-authorize.git): Authorization middleware for [graphql-serverless](https://github.com/nicolasdao/graphql-serverless). Add inline authorization straight into your GraphQl schema to restrict access to certain fields based on your user's rights.

#### React & React Native
* [__*react-native-game-engine*__](https://github.com/bberak/react-native-game-engine): A lightweight game engine for react native.
* [__*react-native-game-engine-handbook*__](https://github.com/bberak/react-native-game-engine-handbook): A React Native app showcasing some examples using react-native-game-engine.

#### Authentication & Authorization
* [__*userin*__](https://github.com/nicolasdao/userin): UserIn let's App engineers to implement custom login/register feature using Identity Providers (IdPs) such as Facebook, Google, Github. 

#### General Purposes
* [__*core-async*__](https://github.com/nicolasdao/core-async): JS implementation of the Clojure core.async library aimed at implementing CSP (Concurrent Sequential Process) programming style. Designed to be used with the npm package 'co'.
* [__*jwt-pwd*__](https://github.com/nicolasdao/jwt-pwd): Tiny encryption helper to manage JWT tokens and encrypt and validate passwords using methods such as md5, sha1, sha256, sha512, ripemd160.

#### Google Cloud Platform
* [__*google-cloud-bucket*__](https://github.com/nicolasdao/google-cloud-bucket): Nodejs package to manage Google Cloud Buckets and perform CRUD operations against them.
* [__*google-cloud-bigquery*__](https://github.com/nicolasdao/google-cloud-bigquery): Nodejs package to manage Google Cloud BigQuery datasets, and tables and perform CRUD operations against them.
* [__*google-cloud-tasks*__](https://github.com/nicolasdao/google-cloud-tasks): Nodejs package to push tasks to Google Cloud Tasks. Include pushing batches.

# License
Copyright (c) 2017-2019, Neap Pty Ltd.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Neap Pty Ltd nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL NEAP PTY LTD BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

<p align="center"><a href="https://neap.co" target="_blank"><img src="https://neap.co/img/neap_color_horizontal.png" alt="Neap Pty Ltd logo" title="Neap" height="89" width="200"/></a></p>
