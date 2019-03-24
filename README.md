# UserIn Form - Gray Quail &middot;  [![NPM](https://img.shields.io/npm/v/userin-form-gray-quail.svg?style=flat)](https://www.npmjs.com/package/userin-form-gray-quail) [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause) [![Neap](https://neap.co/img/made_by_neap.svg)](#this-is-what-we-re-up-to)
__*UserIn Form - Gray Quail*__ is a configurable JS form widget that uses the __*[UserIn](https://github.com/nicolasdao/userin)*__ middleware to login to Apps using the following popular Identity Providers:

* Facebook
* Google
* LinkedIn
* GitHub
* Twitter

# Table of Contents

> * [Install](#install) 
> * [Configuration](#configuration) 
>   - [Standard Config](#standard-config)
>   - [Switching To Modal Mode](#switching-to-modal-mode)
>   - [Other Configs](#other-configs)
> * [List Of Supported Identity Providers](#list-of-supported-identity-providers)
> * [About Neap](#this-is-what-we-re-up-to)
> * [License](#license)

# Install

Add the CSS and the JS into your web page as follow:

```html
<!DOCTYPE html>
<html>
<head>
	<!-- Some HTML here... -->
	<link rel="stylesheet" href="style.min.css">
</head>
<body>
	<div id="userin-form-modal"></div>
	<!-- Some HTML here... -->
	<script src="index.min.js"></script>
	<script type="text/javascript">
		var loginForm = new UserInForm({
			el: '#userin-form-modal',
			usernamePassword: 'https://your-hosted-userin-domain/default/oauth2'
		})
	</script>
</body>
</html>
```

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/default_config.jpg" width="600"/></p>

This example demonstrates the minimal configuration. 

| Parameter				| Field		| Type		| Description																	|
|-----------------------|-----------|-----------|-------------------------------------------------------------------------------|
| `el` 					| REQUIRED	| String	| CSS selector to the DOM under which the form is inserted.						|
| `usernamePassword` 	| REQUIRED	| String	| URL of your UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2) 	|

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
	facebookOAuth2: 'http://localhost:3000/facebook/oauth2',
	googleOAuth2: 'http://localhost:3000/google/oauth2',
	terms: 'https://termsfeed.com/blog/saas-terms-use-privacy-policy/', 
	privacyPolicy: 'https://privacypolicies.com/blog/privacy-policy-saas/', 
	forgotPassword: 'https://neap.co', 
	redirectUrls: {
		onSuccess: 'http://localhost:8080/success',
		onError: 'http://localhost:8080/dev'
	}
})
```

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/standard_config.jpg" width="600"/></p>

__*Parameters*__

| Parameter				| Field		| Type		| Description																	|
|-----------------------|-----------|-----------|-------------------------------------------------------------------------------|
| `el` 					| REQUIRED	| String	| CSS selector to the DOM under which the form is inserted.						|
| `logo` 				| OPTIONAL	| String	| URL of the logo that appears at the top of the form.							|
| `tagline` 			| OPTIONAL	| String	| Tagline that appears at the top of the form.									|
| `blurb` 				| OPTIONAL	| String	| Blurb that appears at the top of the form.									|
| `usernamePassword` 	| REQUIRED	| String	| URL of your UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2) 	|
| `facebookOAuth2` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Facebook (e.g., http://localhost:3000/facebook/oauth2) 	|
| `googleOAuth2` 		| OPTIONAL	| String	| URL of your UserIn OAuth endpoint for Google (e.g., http://localhost:3000/google/oauth2) 	|
| `terms` 				| OPTIONAL	| String	| URL to your terms and conditions web page. 									|
| `privacyPolicy` 		| OPTIONAL	| String	| URL to your privacy policy web page. 											|
| `forgotPassword` 		| OPTIONAL	| String	| URL to your forgot password web page. 										|
| `redirectUrls` 		| OPTIONAL	| Object	| URLs used after successful or failed authentication. 							|


> RECOMMENDATION: Use the URL where this form is hosted for the `redirectUrls.onError`. __*UserIn*__ passes error messages in the query string and this form has been created to handled this format. When an error occurs, the details will be displayed in this form.

> NOTE: The order in which the Identity Providers appear in the form can be modified by changing the order of their definitions. In the example above, putting Google before Facebook cna be done as follow:
> 	```js
>	{
>		googleOAuth2: 'http://localhost:3000/google/oauth2',
>		facebookOAuth2: 'http://localhost:3000/facebook/oauth2',
>	}
>	```

## Switching To Modal Mode

This example is very similar to the one above, but instead of using a static form, this configuration uses a modal:

```html
<!DOCTYPE html>
<html>
<head>
	<title>UserIn - Gray Quail</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<button id="login">Login</button>
	<div id="main"></div>
	<script src="index.js"></script>
	<script type="text/javascript">
		var loginForm = new UserInForm({
			el: '#main',
			logo: "https://neap.co/img/neap_color_horizontal.png",
			tagline: "Killer App",
			blurb: "The adventure begins now",
			usernamePassword: 'http://localhost:3000/default/oauth2',
			facebookOAuth2: 'http://localhost:3000/facebook/oauth2',
			googleOAuth2: 'http://localhost:3000/google/oauth2',
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

<p align="center"><img src="https://raw.githubusercontent.com/nicolasdao/userin-form-gray-quail/master/doc/img/animated_config.gif" width="600"/></p>

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

# List Of Supported Identity Providers

```js
usernamePassword: 'http://localhost:3000/default/oauth2',
facebookOAuth2: 'http://localhost:3000/facebook/oauth2',
googleOAuth2: 'http://localhost:3000/google/oauth2',
linkedInOAuth2: 'http://localhost:3000/linkedin/oauth2',
gitHubOAuth2: 'http://localhost:3000/github/oauth2',
twitterOAuth2: 'http://localhost:3000/twitter/oauth2'
````

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
