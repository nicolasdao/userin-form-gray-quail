
/**
 * Create the UserIn form HTML
 * 
 * @param {String} config.usernamePassword 			URL to the UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2)
 * @param {String} config.ids.formModalId 			ID of the modal's root DOM 
 * @param {String} config.ids.closeFormButtonId 	ID of the modal's close button 
 * @param {Object} config.logo          			Optional. URL of the logo that appears at the top of the form.
 * @param {Object} config.tagline          			Optional. String or object. It adds a tagline at the top of the form. If object, the expected schema
 *                                          		is:
 *                                          			@param {String} config.tagline.login 	Tagline for the login form
 *                                          			@param {String} config.tagline.signup 	Tagline for the signup form
 *                                          	
 * @param {Object} config.blurb            			Optional. String or object. It adds a blurb at the top of the form. If object, the expected schema
 *                                            		is:
 *                                          			@param {String} config.blurb.login 		Blurb for the login form
 *                                          			@param {String} config.blurb.signup 	Blurb for the signup form
 *                                          	
 * @param {String}  config.facebook   				Optional. URL to the Facebook UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2)
 * @param {String}  config.google     				Optional. URL to the Google UserIn auth endpoint (e.g., http://localhost:3000/facebook/oauth2)
 * @param {String}  config.linkedin   				Optional. URL to the LinkedIn UserIn auth endpoint (e.g., http://localhost:3000/linkedin/oauth2)
 * @param {String}  config.github    				Optional. URL to the GitHub UserIn auth endpoint (e.g., http://localhost:3000/github/oauth2)
 * @param {String}  config.twitter  				Optional. URL to the Twitter UserIn auth endpoint (e.g., http://localhost:3000/twitter/oauth2)
 * @param {String}  config.terms           			Optional. URL to the terms and condition page.
 * @param {String}  config.privacyPolicy    		Optional. URL to the privacy policy page.
 * @param {String}  config.forgotPassword   		Optional. URL to the forgot password page.
 * @param {String}  config.redirectUrls.onSuccess 	Optional. Redirect URL after successfull authentication
 * @param {String}  config.redirectUrls.onError 	Optional. Redirect URL after failed authentication
 * @param {Object}  config.modal            		Optional. Boolean of object. If true, the form is a modal rather than a static form. It is 
 *                                            		displayed by default, and shows a close button. If object, the expected schema is:
 *                                              		@param {Boolean} config.modal.animate 	Default false. When true, the form's modal
 *                                              		                                       	fades in and out. 
 * 												                                                                           	
 * @param {String}  config.init.mode 				Optional. Default is 'signup'. Defines which forms is displayed by default. Valid values: 'login', 'signup'.
 * @param {Boolean} config.init.visible 			Optional. Default is true. Only valid when the 'modal' options is truthy. Defines whether the modal
 *                                         			is visible by default or not.  
 * 
 * @return {String}	output 							HTML string.
 */
const _createComponent = config => {
	// 1. Extract and format configuration settings
	config = config || {}
	if (!config.usernamePassword)
		throw new Error('Missing required argument \'usernamePassword\'. Expecting a valid POST URL.')

	const { logo, tagline, blurb, terms, privacyPolicy, forgotPassword, init, redirectUrls, modal, ids, usernamePassword } = config
	const { formModalId, closeFormButtonId } = ids || {}

	if (!formModalId)
		throw new Error('Missing required argument \'config.ids.formModalId\'.')
	if (!closeFormButtonId)
		throw new Error('Missing required argument \'config.ids.closeFormButtonId\'.')

	const { mode:defaultMode='signup' } = init || {}
	const showCloseButton = modal ? true : false
	const modalShadowClass = modal ? 'shadow-for-modal-on' : 'shadow-for-modal-off'

	const { onSuccess, onError } = redirectUrls || {}
	const [formatLoginOAuth2Url, formatSignupOAuth2Url] = (() => {
		const idFn = u => u
		if (!onSuccess || !onError)
			return [idFn,idFn]
		
		const [onSuccessLoginUri, onSuccessSignupUri] = _getLoginSignupURIs(onSuccess)
		const [onErrorLoginUri, onErrorSignupUri] = _getLoginSignupURIs(onError)
		
		return [
			u => `${u}/${onSuccessLoginUri}/${onErrorLoginUri}`,
			u => `${u}/${onSuccessSignupUri}/${onErrorSignupUri}`
		]
	})()

	let { login:loginTagline, signup:signupTagline } = tagline || {}
	let { login:loginBlurb, signup:signupBlurb } = blurb || {}

	if (typeof(blurb) == 'string') {
		loginBlurb = blurb
		signupBlurb = blurb
	}
	if (typeof(tagline) == 'string') {
		loginTagline = tagline
		signupTagline = tagline
	}

	const [loginFormClass, loginTitleClass, loginFooterClass, signupFormClass, signupTitleClass, signupFooterClass] = !defaultMode || defaultMode == 'signup' 
		? ['userin-login-form-hide', 'userin-login-title-hide', 'userin-login-footer-hide', 'userin-signup-form-show', 'userin-signup-title-show', 'userin-signup-footer-show'] 
		: ['userin-login-form-show', 'userin-login-title-show', 'userin-login-footer-show','userin-signup-form-hide', 'userin-signup-title-hide', 'userin-signup-footer-hide']

	// 2. Create HTML buttons based on the selected Identity Providers
	const buttons = []
	Object.keys(config).forEach(key => {
		if (key && config[key]) {
			const k = key.toLowerCase().trim()
			if (k == 'facebook') 
				buttons.push(`
				<form action="${formatSignupOAuth2Url(config[key])}" class="userin-form-button userin-form-id" target="_top">
					<button class="userin-idp-button userin-facebook-button userin-social-button">
						<div class="userin-social-media-logo-container">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="userin-social-media-logo" color="#ffffff">
								<path fill="#ffffff" d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z">
								</path>
							</svg>
						</div>
						<span class="userin-button-msg">Continue with Facebook</span>
						<div></div>
					</button>
				</form>`)
			else if (k == 'google')
				buttons.push(`
				<form action="${formatSignupOAuth2Url(config[key])}" class="userin-form-button userin-form-id" target="_top">
					<button class="userin-idp-button userin-google-button userin-social-button">
						<div class="userin-social-media-logo-container">
							<span class="userin-social-media-logo-background">
								<svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" data-reactid="48">
									<g fill="none" fill-rule="evenodd" data-reactid="49">
										<path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4" data-reactid="50"></path>
										<path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853" data-reactid="51"></path>
										<path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05" data-reactid="52"></path>
										<path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335" data-reactid="53"></path>
										<path d="M20 20h472v472H20V20z" data-reactid="54"></path>
									</g>
								</svg>
							</span>
						</div>
					<span class="userin-button-msg">Continue with Google</span>
					<div></div>
					</button>
				</form>`)
			else if (k == 'linkedin')
				buttons.push(`
				<form action="${formatSignupOAuth2Url(config[key])}" class="userin-form-button userin-form-id" target="_top">
					<button class="userin-idp-button userin-linkedin-button userin-social-button">
						<div class="userin-social-media-logo-container">
							<span class="userin-social-media-logo-background">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 430.117 430.117" style="enable-background:new 0 0 430.117 430.117;" xml:space="preserve">
									<g>
										<path xmlns="http://www.w3.org/2000/svg" style="fill:#0077b5;" id="LinkedIn" d="M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707   c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21   v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824   C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463   c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z    M5.477,420.56h92.184v-277.32H5.477V420.56z"></path>
									</g>
								</svg>
							</span>
						</div>
						<span class="userin-button-msg">Continue with LinkedIn</span>
						<div></div>
					</button>
				</form>`)
			else if (k == 'github')
				buttons.push(`
				<form action="${formatSignupOAuth2Url(config[key])}" class="userin-form-button userin-form-id" target="_top">
					<button class="userin-idp-button userin-github-button userin-social-button">
						<div class="userin-social-media-logo-container">
							<span class="userin-social-media-logo-background">
								<svg width="19px" height="19px" viewBox="0 0 1358 1503" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<g id="github" fill="#424242" fill-rule="nonzero">
											<path d="M425,1502.28724 C417.5,1501.57448 417.525525,1492.90818 430.5,1481.5 C443.474475,1470.09182 457.44219,1471.11804 467,1465.5 C476.55781,1459.88196 475.8838,1453.68826 477.059,1447.26426 C477.452307,1445.11229 477.641284,1442.73473 477.641284,1440.22843 C477.641284,1423.05873 477.487741,1407.02293 477.284591,1385.50203 C477.055457,1361.33433 476.768449,1331.30593 476.531047,1296.88033 C217.732047,1343.86343 157.314047,1162.10533 154.834047,1154.28533 C113.653747,1050.19433 57.022147,1023.65733 56.857947,1023.57833 L54.733147,1022.39014 C-75.705853,933.247544 69.961147,935.095944 70.374547,935.097144 L71.374937,935.097144 C173.394937,942.278254 227.728937,1036.34114 230.689937,1041.59714 L230.700567,1041.59124 C261.711567,1094.72434 299.865967,1120.92474 337.776567,1131.74844 C392.768767,1147.44764 448.223567,1131.56655 480.980567,1118.02524 C485.524267,1091.16694 493.008967,1067.94414 502.350267,1048.27164 C508.644367,1035.01734 515.803067,1023.32914 523.501467,1013.18104 C424.672667,999.157839 325.631467,970.524339 248.261467,905.395039 C162.416567,833.129239 104.234467,717.047039 104.234467,528.271039 L104.297065,528.271039 C104.305333,475.482839 113.442345,427.393039 130.115965,383.940039 C146.641965,340.871139 170.592365,302.284439 200.416365,268.123039 C194.710455,251.908839 186.786465,223.650939 184.284865,186.241839 C181.225805,140.490639 186.217145,80.794839 213.286865,12.353839 L213.911669,11.104229 C213.928205,11.0711581 225.680169,1.06252896 242.292369,0.22152896 C253.250669,-0.33240804 269.789669,0.24278886 292.111269,4.75578896 C335.582969,13.545559 402.171269,37.651889 494.100269,99.024389 C530.420369,89.260209 567.906269,81.840489 605.929269,76.726389 C647.070669,71.194099 688.961969,68.355909 730.798269,68.169299 L730.923466,68.169299 C772.713266,68.355913 814.557366,71.195289 855.672466,76.724029 C893.713466,81.840569 931.234766,89.267329 967.622466,99.030329 C1152.41547,-24.373671 1237.57347,2.84362896 1237.82447,2.91682896 L1245.26896,5.12430896 L1248.13668,12.353839 C1275.31148,80.885039 1280.35008,140.523839 1277.31818,186.178839 C1274.83432,223.579639 1266.94098,251.825739 1261.25868,268.052939 C1291.06498,302.128939 1314.94098,340.667139 1331.43038,383.719939 C1348.13948,427.347539 1357.25168,475.518839 1357.25168,528.270939 C1357.25168,717.569939 1298.98318,833.597939 1212.97068,905.605939 C1135.54468,970.427239 1036.38368,998.686339 937.344676,1012.47094 C948.925376,1027.61744 959.335676,1046.25404 967.463976,1068.44344 C978.404576,1098.31474 985.261976,1134.70094 985.261976,1177.71344 C985.261976,1254.46034 984.695046,1334.31044 984.320637,1387.18044 C984.183629,1406.58124 984.079692,1421.07334 984.079692,1440.22734 L984.017094,1440.22734 C984.018275,1442.62026 984.263945,1445.18679 984.778906,1447.85727 C986.011976,1454.25176 988.4362,1459.79069 994.5,1465.5 C1000.5638,1471.20931 1032.11872,1474.90781 1039,1481.5 C1045.88128,1488.09219 1044.5,1502.28724 1037,1502.28724 C1029.5,1502.28724 1010.5,1501.927 999.743496,1502.18448 C647.653827,1502.25299 468.090827,1502.28724 461.054496,1502.28724 C450.5,1502.28724 432.5,1503 425,1502.28724 Z" id="Path">
											</path>
										</g>
									</g>
								</svg>
							</span>
						</div>
						<span class="userin-button-msg">Continue with GitHub</span>
						<div></div>
					</button>
				</form>`)
			else if (k == 'twitter')
				buttons.push(`
				<form action="${formatSignupOAuth2Url(config[key])}" class="userin-form-button userin-form-id" target="_top">
					<button class="userin-idp-button userin-twitter-button userin-social-button">
						<div class="userin-social-media-logo-container">
							<span class="userin-social-media-logo-background">
								<svg width="19px" height="19px" viewBox="0 0 200 163" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<g id="twitter" fill="#38A1F3" fill-rule="nonzero">
											<path d="M200,19.24 C192.642,22.504 184.733,24.709 176.434,25.701 C184.905,20.623 191.412,12.582 194.475,3 C186.546,7.703 177.765,11.117 168.418,12.957 C160.934,4.982 150.27,-7.10542736e-14 138.468,-7.10542736e-14 C115.808,-7.10542736e-14 97.435,18.371 97.435,41.031 C97.435,44.247 97.798,47.379 98.497,50.382 C64.395,48.671 34.161,32.335 13.923,7.51 C10.391,13.57 8.367,20.618 8.367,28.138 C8.367,42.374 15.611,54.933 26.621,62.291 C19.895,62.078 13.568,60.232 8.036,57.159 C8.032,57.33 8.032,57.502 8.032,57.675 C8.032,77.555 22.176,94.139 40.947,97.909 C37.504,98.847 33.879,99.348 30.137,99.348 C27.493,99.348 24.923,99.09 22.417,98.612 C27.639,114.913 42.792,126.777 60.748,127.107 C46.705,138.113 29.013,144.672 9.788,144.672 C6.476,144.672 3.21,144.478 0,144.098 C18.159,155.741 39.727,162.535 62.899,162.535 C138.372,162.535 179.645,100.011 179.645,45.788 C179.645,44.009 179.605,42.24 179.526,40.479 C187.543,34.695 194.499,27.468 200,19.24 Z" id="Path"></path>
								 		</g>
									</g>
								</svg>
							</span>
						</div>
						<span class="userin-button-msg">Continue with Twitter</span>
						<div></div>
					</button>
				</form>`)
		}
	})

	const socialButtonsHtml = buttons.length > 0 ? ['<p class="or">OR</p>', ...buttons].join('\n') : ''

	// 3. Create HTML for T&Cs
	const tandCs = []
	if (terms)
		tandCs.push(`<a href="${terms}" target="_blank">Terms of Service</a>`)
	if (privacyPolicy)
		tandCs.push(`<a href="${privacyPolicy}" target="_blank">Privacy Policy</a>`)

	const termsHtml = tandCs.join(', ')

	// 4. Glue all HTML into a single Modal
	return `
	<div id="${formModalId}"  class="userin-form-box ${modalShadowClass}">
		<div class="userin-linear-progress-material" style="visibility:hidden">
			<div class="userin-bar userin-bar1"></div>
			<div class="userin-bar userin-bar2"></div>
		</div>
		<div id="${closeFormButtonId}"" class="userin-close-button">
			${showCloseButton ? 
		`<svg width="25px" height="25px" viewBox="0 0 615 615" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="userin-close-button-box" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="close">
						<circle id="Oval" fill="none" cx="307.5" cy="307.5" r="307.5"></circle>
						<path d="M307.434289,254.401281 L378.852074,182.983496 C393.496735,168.338835 417.240422,168.338835 431.885083,182.983496 C446.529744,197.628157 446.529744,221.371843 431.885083,236.016504 L360.467298,307.434289 L431.885083,378.852074 C446.529744,393.496735 446.529744,417.240422 431.885083,431.885083 C417.240422,446.529744 393.496735,446.529744 378.852074,431.885083 L307.434289,360.467298 L236.016504,431.885083 C221.371843,446.529744 197.628157,446.529744 182.983496,431.885083 C168.338835,417.240422 168.338835,393.496735 182.983496,378.852074 L254.401281,307.434289 L182.983496,236.016504 C168.338835,221.371843 168.338835,197.628157 182.983496,182.983496 C197.628157,168.338835 221.371843,168.338835 236.016504,182.983496 L307.434289,254.401281 Z" id="cross" fill="none"></path>
					</g>
				</g>
			</svg>` : ''}
		</div>
		<div class="userin-form-container">
			<div class="userin-logo">
				${logo ? `<img class="userin-logo" src="${logo}" width="100%"></img>` : ''}
			</div>
			<div id="userin-login-title" class="userin-title ${loginTitleClass}">
				${loginTagline ? `<div class="userin-welcome-message">${loginTagline}</div>` : ''}
				${loginBlurb ? `<div class="userin-blurb">${loginBlurb}</div>` : ''}
			</div>
			<div id="userin-signup-title" class="userin-title ${signupTitleClass}">
				${signupTagline ? `<div class="userin-welcome-message">${signupTagline}</div>` : ''}
				${signupBlurb ? `<div class="userin-blurb">${signupBlurb}</div>` : ''}
			</div>
			<div id="userin-login-form" class="${loginFormClass}">
				<form id="usr-pwd-form" class="userin-email-form userin-form-id" target="_top" action="${formatLoginOAuth2Url(usernamePassword)}" method="post" enctype="application/json">
					<input type="email" name="user.email" placeholder="Email" class="userin-input-form" required>
					<input type="password" name="user.password" placeholder="Password" class="userin-input-form" required>
					<input type="submit" value="Continue" class="userin-login-button">
					<div id="usr-pwd-form-err" class="userin-error-form-message" style="display: none"></div>
				</form>	
			</div>
			<div id="userin-signup-form" class="${signupFormClass}">
				<form id="usr-pwd-reg-form" class="userin-email-form userin-form-id" target="_top" action="${formatSignupOAuth2Url(usernamePassword)}" method="post" enctype="application/json">
					<input type="text" name="user.firstName" placeholder="First name" class="userin-input-form" required>
					<input type="text" name="user.lastName" placeholder="Last name" class="userin-input-form" required>
					<input id="reg-email" type="email" name="user.email" placeholder="Email" class="userin-input-form" required>
					<input id="reg-password" type="password" name="user.password" placeholder="Password" class="userin-input-form" required>
					<input type="submit" value="Continue" class="userin-login-button">
					<div id="usr-pwd-reg-form-err" class="userin-error-form-message" style="display: none"></div>
				</form>	
			</div>
			${socialButtonsHtml}
			${termsHtml ? `
			<div class="userin-terms">
				By continuing, you agree to This App's 
				</br>
				${termsHtml}
			</div>` : ''}
			<div id="userin-signup-footer" class="userin-login-signup-switch ${signupFooterClass}">
				<div id="userin-switch-to-login" class="userin-signup">
					<a href="javascript:void(0);">Already have an account? Log in</a>
				</div>
			</div>
			<div id="userin-login-footer" class="userin-login-signup-switch ${loginFooterClass}">
				${forgotPassword ? `
				<div class="userin-forgot-password">
					<a href="${forgotPassword}" target="_blank">Forgot your password?</a>
				</div>
				<div class="userin-horizontal-line"></div>`: ''}
				<div id="userin-switch-to-signup" class="userin-signup">
					<a href="javascript:void(0);">Need an account? Sign up now</a>
				</div>
			</div>
		</div>
		<div class="userin-footer"></div>
	</div>
	`
}

/**
 * Gets the login and signup encode URIs
 * @param  {String|Object} 	u 			If string, this is the URI that represent both the login and signup URIs. If this is an object,
 *                            	  		it must be structured as follow: { login: <string>, signup: <string> }
 *                            	
 * @return {String}			output[0]   Encoded Login URI
 * @return {String}			output[1]   Encoded SignUp URI
 */
const _getLoginSignupURIs = u => {
	if (!u)
		throw new Error('Missing required argument \'u\'.')

	const uType = typeof(u)
	if (uType == 'string')
		return [encodeURIComponent(u), encodeURIComponent(u)]
	
	if (uType != 'object')
		throw new Error('Wrong argument exception. \'u\' must either be a string or an object.')

	if (!u.login || !u.signup)
		throw new Error('Wrong argument exception. When \'u\' is an object, it must specify a \'login\' and a \'signup\' property.')

	if (typeof(u.login) != 'string' || typeof(u.signup) != 'string')
		throw new Error('Wrong argument exception. Both \'u.login\' and \'u.signup\' must be strings.')	

	return [encodeURIComponent(u.login), encodeURIComponent(u.signup)]
}

const _transitionFn = (getEl, updateFn, time, options) => {
	options = options || {}
	const start = options.start === undefined ? 0 : options.start
	const end = options.end === undefined ? 1 : options.end
	const next = options.next && typeof(options.next) == 'function' ? options.next : (() => null) 
	const dst = Math.abs(end-start)
	const reduceFn = start <= end ? ((a,b) => a+b) : ((a,b) => a-b)
	let f = 0

	updateFn(start)

	let last = new Date()
	const tick = function() {
		f = (new Date() - last) / time
		f = f < 1 ? f : 1
		updateFn(reduceFn(start, f * dst))
		//last = new Date()

		if (f < 1) 
			(window.requestAnimationFrame && requestAnimationFrame(tick)) //|| setTimeout(tick, 16)
		else
			next()
	}

	tick()
}

const _animateFade = (el, time, options) => _transitionFn(() => el.style.opacity, v => el.style.opacity = v, time, options)

const _animateVertical = (el, time, options) => _transitionFn(
	() => {
		const v = el.style['margin-top'] || '0'
		const strNumber = (v.match(/^-{0,1}[0-9]+(\.[0-9]+){0,1}/) || [])[0]
		return strNumber ? strNumber*1 : 0
	}, 
	v => el.style['margin-top'] = `${v}px`, 
	time, options)

/**
 * Extracts a specific parameter from the query string. That parameter is also decoded.
 * 
 * @param  {String} field Parameter name
 * @param  {String} url   
 * @return {String}       Decoded parameter's value
 */
const getQueryString = (field, url) => {
	const href = url ? url : window.location.href
	const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' )
	const string = reg.exec(href)
	return string ? decodeURIComponent(string[1]||'') : null
}

const _showErrorMsg = () => {
	const errorCode = getQueryString('error_code')
	const errorMsg = getQueryString('error_msg')
	if (errorCode && errorMsg) {
		const formIds = ['usr-pwd-form', 'usr-pwd-reg-form']
		formIds.forEach(formId => {
			const form = document.getElementById(formId)
			const errEl = (form.getElementsByTagName('div') || [])[0]
			errEl.innerHTML = errorMsg
			errEl.style.display = 'block'
		})
	}
}

const _setInput = (selector, value) => {
	if (value) {
		let input = document.querySelector(selector)
		if (input)
			input.value = value
	}
}

/**
 * Creates a new instance of a UserInForm and attaches it under an existing DOM element. 
 * 
 * @param {String} config.el               			CSS Selector to attach the form under.
 * @param {String} config.usernamePassword 			URL to the UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2)
 * @param {Object} config.logo          			Optional. URL of the logo that appears at the top of the form.
 * @param {Object} config.tagline          			Optional. String or object. It adds a tagline at the top of the form. If object, the expected schema
 *                                          		is:
 *                                          			@param {String} config.tagline.login 	Tagline for the login form
 *                                          			@param {String} config.tagline.signup 	Tagline for the signup form
 *                                          	
 * @param {Object} config.blurb            			Optional. String or object. It adds a blurb at the top of the form. If object, the expected schema
 *                                            		is:
 *                                          			@param {String} config.blurb.login 		Blurb for the login form
 *                                          			@param {String} config.blurb.signup 	Blurb for the signup form
 *                                          	
 * @param {String}  config.facebook   				Optional. URL to the Facebook UserIn auth endpoint (e.g., http://localhost:3000/default/oauth2)
 * @param {String}  config.google     				Optional. URL to the Google UserIn auth endpoint (e.g., http://localhost:3000/facebook/oauth2)
 * @param {String}  config.linkedin   				Optional. URL to the LinkedIn UserIn auth endpoint (e.g., http://localhost:3000/linkedin/oauth2)
 * @param {String}  config.github    				Optional. URL to the GitHub UserIn auth endpoint (e.g., http://localhost:3000/github/oauth2)
 * @param {String}  config.twitter  				Optional. URL to the Twitter UserIn auth endpoint (e.g., http://localhost:3000/twitter/oauth2)
 * @param {String}  config.terms           			Optional. URL to the terms and condition page.
 * @param {String}  config.privacyPolicy    		Optional. URL to the privacy policy page.
 * @param {String}  config.forgotPassword   		Optional. URL to the forgot password page.
 * @param {String}  config.redirectUrls.onSuccess 	Optional. Redirect URL after successfull authentication
 * @param {String}  config.redirectUrls.onError 	Optional. Redirect URL after failed authentication
 * @param {Object}  config.modal            		Optional. Boolean of object. If true, the form is a modal rather than a static form. It is 
 *                                            		displayed by default, and shows a close button. If object, the expected schema is:
 *                                              		@param {Boolean} config.modal.animate 	Default false. When true, the form's modal
 *                                              		                                       	fades in and out. 
 * 												                                                                           	
 * @param {String}  config.init.mode 				Optional. Default is 'signup'. Defines which forms is displayed by default. Valid values: 'login', 'signup'.
 * @param {Boolean} config.init.visible 			Optional. Default is true. Only valid when the 'modal' options is truthy. Defines whether the modal
 *                                         			is visible by default or not.  
 */
function UserInForm(config) {
	// 1. Extract query string params
	const redirectUrl = getQueryString('redirect_url')
	const screenMode = getQueryString('screen') // either null, 'login' or 'signup'
	const firstName = getQueryString('firstName') || getQueryString('firstname')
	const lastName = getQueryString('lastName') || getQueryString('lastname')
	const email = getQueryString('email') 

	// 2. Extract, validate and format settings
	config = config || {}
	// 2.1. Initialize variables
	const formId = `_${Date.now()}`
	const formModalId = `${formId}-userin-login`
	const closeFormButtonId = `${formId}-userin-close-form-button`
	const darkBackgroundId = `${formId}-userin-dark-background`
	config.ids = { formModalId, closeFormButtonId }

	let { init, modal } = config
	// 2.2. Overides some configuration based on the query parameters
	// 2.2.1. Overides screen mode
	if (screenMode == 'login' || screenMode == 'signup') 
		init.mode = screenMode
	// 2.2.2. Overides on success redirect URI
	if (redirectUrl) {
		config.redirectUrls = config.redirectUrls || {}
		config.redirectUrls.onSuccess = redirectUrl
	}
	// 2.3. Add default values
	let { visible:formVisible=true } = init || {}
	const { animate: animateModal } = modal || {}
	const modalOn = modal ? true : false
	if (!modalOn)
		formVisible = true

	// 3. Add a dark background DOM to the page behind the modal
	const darkBackgroundNode = document.createElement('div')
	darkBackgroundNode.setAttribute('id', darkBackgroundId)
	darkBackgroundNode.classList.add('userin-dark-background') 
	darkBackgroundNode.classList.add('userin-container')
	const body = document.querySelector('body')
	body.insertBefore(darkBackgroundNode, body.childNodes[0])

	let domEl
	if (config.el) {
		const el = config.el 
		if (!el) 
			throw new Error('Missing required argument \'el\'.')
		domEl = document.querySelectorAll(el)[0]
		if (!domEl) 
			throw new Error(`DOM '${el}' not found.`)
	} else
		domEl = document.querySelectorAll(`#${darkBackgroundId}`)[0]

	// 4. Inject modal into the current page
	const htmlModal = _createComponent(config)
	const firstChildDomEl = domEl.childNodes[0]
	if (firstChildDomEl)
		domEl.insertBefore(new DOMParser().parseFromString(htmlModal, 'text/html').body.firstChild, firstChildDomEl)
	else
		domEl.innerHTML = htmlModal

	// 5. Make sure that form does not trigger other behaviors attached to its parent.
	document.getElementById(formModalId).addEventListener('click', e => e.stopPropagation())

	// 6. Add the following functionalities to this components:
	// 		6.1. show()
	// 		6.2. hide()
	// 		6.3. swithForm()
	// 6.1.
	this.show = () => {
		const form = document.getElementById(formModalId)

		if (modalOn) {
			const background = document.getElementById(darkBackgroundId)
			background.style.visibility = 'unset'
			if (animateModal) {
				background.style.opacity = 0
				_animateFade(background, 150)
				setTimeout(() => {
					form.style.visibility = 'unset'
					form.style.opacity = 0
					_animateFade(form, 200)
					_animateVertical(form, 150, { start:-100, end:0 })
				},100)
			} else {
				form.style.visibility = 'unset'
				form.style.opacity = 1
				background.style.opacity = 1
			}
		} else {
			form.style.visibility = 'unset'
			form.style.opacity = 1
		}

	}
	// 6.2.
	this.hide = () => {
		const form = document.getElementById(formModalId)
		
		if (modalOn) {
			const background = document.getElementById(darkBackgroundId)
			if (animateModal) {
				_animateVertical(form, 250, { start:0, end:-100 })
				_animateFade(form, 200, { start:1, end:0, next:() => {
					form.style.visibility = 'hidden'
				} })
				
				setTimeout(() => {
					_animateFade(background, 200, { start:1, end:0, next:() => {
						background.style.visibility = 'hidden'	
					} })
				},100)
			} else {
				form.style.visibility = 'hidden'
				background.style.visibility = 'hidden'
				form.style.opacity = 0
				background.style.opacity = 0
			}
		} else {
			form.style.visibility = 'hidden'
			form.style.opacity = 0
		}
	}
	// 6.3.
	this.swithForm = mode => () => {
		const loginTitleEl = document.getElementById('userin-login-title')
		const loginFormEl = document.getElementById('userin-login-form')
		const loginFooterEl = document.getElementById('userin-login-footer')
		const signupTitleEl = document.getElementById('userin-signup-title')
		const signupFormEl = document.getElementById('userin-signup-form')
		const signupFooterEl = document.getElementById('userin-signup-footer')
		const [action1, action2] = mode == 'login' ? ['remove', 'add'] : ['add', 'remove']
		
		loginTitleEl.classList[action1]('userin-login-title-hide')
		loginTitleEl.classList[action2]('userin-login-title-show')
		loginFormEl.classList[action1]('userin-login-form-hide')
		loginFormEl.classList[action2]('userin-login-form-show')
		loginFooterEl.classList[action1]('userin-login-footer-hide')
		loginFooterEl.classList[action2]('userin-login-footer-show')

		signupTitleEl.classList[action2]('userin-signup-title-hide')
		signupTitleEl.classList[action1]('userin-signup-title-show')
		signupFormEl.classList[action2]('userin-signup-form-hide')
		signupFormEl.classList[action1]('userin-signup-form-show')
		signupFooterEl.classList[action2]('userin-signup-footer-hide')
		signupFooterEl.classList[action1]('userin-signup-footer-show')
	}

	// 7. Attach functionalities to certain component's triggers:
	// 		7.1. Hide the form when the close button is clicked or when the user clicks outside of the modal.
	// 		7.2. Show or hide the modal when the modal is loaded for the fist time.
	// 		7.3. Show error messages located in the query string (error_msg and error_code) if there are any. 
	// 		7.4. Switch between login and signup form
	const _this = this
	// 7.1.
	const closeButton = document.querySelectorAll(`#${closeFormButtonId} svg`)[0]
	const modalBackground = document.getElementById(darkBackgroundId)
	const closingDOMs = [closeButton, modalBackground]
	closingDOMs.forEach(d => { if (d) d.addEventListener('click', function() { _this.hide() }) })
	// 7.2.
	if (formVisible)
		this.show()
	else
		this.hide()
	// 7.3. 
	_showErrorMsg()
	// 7.4. 
	document.getElementById('userin-switch-to-login').addEventListener('click', _this.swithForm('login'))
	document.getElementById('userin-switch-to-signup').addEventListener('click', _this.swithForm('signup'))

	// 8. Pre-populate inputs if some have been defined in the query string
	_setInput('#usr-pwd-reg-form input[name="user.firstName"]', firstName)
	_setInput('#usr-pwd-reg-form input[name="user.lastName"]', lastName)
	_setInput('#usr-pwd-reg-form input[name="user.email"]', email)
	_setInput('#usr-pwd-form input[name="user.email"]', email)

	// 9. Attach click events on buttons to show process bar
	const forms = document.querySelectorAll('form.userin-form-id')
	const processBar = document.querySelector(`#${formModalId} .userin-linear-progress-material`)

	for(let i=0;i<forms.length;i++) 
		forms[i].addEventListener('submit', () => processBar.setAttribute('style','visibility:visible'))

	return this 
}

module.exports = {
	UserInForm
}