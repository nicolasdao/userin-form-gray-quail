
const transitionFn = (getEl, updateFn, time, options) => {
	options = options || {}
	const start = options.start || 0
	const end = options.end || 1
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
	}

	tick()
}

const animateFadeIn = (el, time, options) => transitionFn(() => el.style.opacity, v => el.style.opacity = v, time, options)

const animateTopDown = (el, time, options) => transitionFn(
	() => {
		const v = el.style['margin-top'] || '0'
		const strNumber = (v.match(/^-{0,1}[0-9]+(\.[0-9]+){0,1}/) || [])[0]
		return strNumber ? strNumber*1 : 0
	}, 
	v => el.style['margin-top'] = `${v}px`, 
	time, options)

function UserInForm(config) {
	const formId = `_${Date.now()}`
	const formDomId = `${formId}-userin-login`
	const closeFormBtn = `${formId}-userin-close-form-button`
	const darkBackgroundId = `${formId}-userin-dark-background`

	// Add a dark background to the page behind the form
	const darkBackgroundNode = document.createElement('div')
	darkBackgroundNode.setAttribute('id', darkBackgroundId)
	darkBackgroundNode.classList.add('userin-dark-background')
	const body = document.querySelector('body')
	body.insertBefore(darkBackgroundNode, body.childNodes[0])

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////				   1. START - DECIDE WHICH IDP TO SHOW							/////////////////////////

	const createComponent = config => {
		config = config || {}
		const { logo, tagline, blurb, terms, privacyPolicy, forgotPassword, defaultMode } = config

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

		const buttons = []
		Object.keys(config).forEach(key => {
			if (config[key]) {
				if (key == 'facebookOAuth2') 
					buttons.push(`
					<form action="${config[key]}" class="userin-form-button" target="_top">
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
				else if (key == 'googleOAuth2')
					buttons.push(`
					<form action="${config[key]}" class="userin-form-button" target="_top">
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
				else if (key == 'linkedInOAuth2')
					buttons.push(`
					<form action="${config[key]}" class="userin-form-button" target="_top">
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
				else if (key == 'gitHubOAuth2')
					buttons.push(`
					<form action="${config[key]}" class="userin-form-button" target="_top">
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
				else if (key == 'twitterOAuth2')
					buttons.push(`
					<form action="${config[key]}" class="userin-form-button" target="_top">
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

		const tandCs = []
		if (terms)
			tandCs.push(`<a href="${terms}" target="_blank">Terms of Service</a>`)
		if (privacyPolicy)
			tandCs.push(`<a href="${privacyPolicy}" target="_blank">Privacy Policy</a>`)

		const termsHtml = tandCs.join(', ')

		return `
		<div id="${formDomId}"  class="userin-form-box">
			<div id="${closeFormBtn}"" class="userin-close-button">
				<svg width="25px" height="25px" viewBox="0 0 615 615" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g id="close">
							<circle id="Oval" fill="none" cx="307.5" cy="307.5" r="307.5"></circle>
							<path d="M307.434289,254.401281 L378.852074,182.983496 C393.496735,168.338835 417.240422,168.338835 431.885083,182.983496 C446.529744,197.628157 446.529744,221.371843 431.885083,236.016504 L360.467298,307.434289 L431.885083,378.852074 C446.529744,393.496735 446.529744,417.240422 431.885083,431.885083 C417.240422,446.529744 393.496735,446.529744 378.852074,431.885083 L307.434289,360.467298 L236.016504,431.885083 C221.371843,446.529744 197.628157,446.529744 182.983496,431.885083 C168.338835,417.240422 168.338835,393.496735 182.983496,378.852074 L254.401281,307.434289 L182.983496,236.016504 C168.338835,221.371843 168.338835,197.628157 182.983496,182.983496 C197.628157,168.338835 221.371843,168.338835 236.016504,182.983496 L307.434289,254.401281 Z" id="cross" fill="none"></path>
						</g>
					</g>
				</svg>
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
					<form id="usr-pwd-form" class="userin-email-form" target="_top" action="/login/graphiql" method="post">
						<input type="email" name="email" placeholder="Email" class="userin-input-form" required>
						<input type="password" name="password" placeholder="Password" class="userin-input-form" required>
						<input type="submit" value="Continue" class="userin-login-button">
						<div id="usr-pwd-form-err" class="userin-error-form-message" style="display: none"></div>
					</form>	
				</div>
				<div id="userin-signup-form" class="${signupFormClass}">
					<form id="usr-pwd-reg-form" class="userin-email-form" target="_top" action="/register/graphiql" method="post">
						<input type="text" name="firstName" placeholder="First name" class="userin-input-form" required>
						<input type="text" name="lastName" placeholder="Last name" class="userin-input-form" required>
						<input id="reg-email" type="email" name="email" placeholder="Email" class="userin-input-form" required>
						<input id="reg-pwd" type="password" name="password" placeholder="Password" class="userin-input-form" required>
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
				<div id="userin-signup-footer" class="${signupFooterClass}">
					<div id="userin-switch-to-login" class="userin-signup">
						<a href="javascript:void(0);">Already have an account? Log in</a>
					</div>
				</div>
				<div id="userin-login-footer" class="${loginFooterClass}">
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

	//////////////////////////				   1. END - DECIDE WHICH IDP TO SHOW								/////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////				   2. START - DISPLAY ERROR MESSAGE FROM QUERY STRING				/////////////////////////

	const getQueryString = (field, url) => {
		const href = url ? url : window.location.href
		const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' )
		const string = reg.exec(href)
		return string ? string[1] : null
	}

	const showErrorMsg = () => {
		var errorCode = getQueryString('error_code')
		var errorMsg = getQueryString('error_msg')
		if (errorCode && errorMsg) {
			var form = document.getElementById('usr-pwd-form')
			var errEl = (form.getElementsByTagName('div') || [])[0]
			errEl.innerHTML = decodeURIComponent(errorMsg)
			errEl.style.display = 'block'
		}
	}
	//////////////////////////				    2. END - DISPLAY ERROR MESSAGE FROM QUERY STRING				/////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////						3. START - OVERRIDE FORM SUBMIT BEHAVIOR					/////////////////////////

	const overrideFormBehavior = (formElement) => {
		function processForm(e) {
			if (e.preventDefault) e.preventDefault()
			var inputs = formElement.getElementsByTagName('input')
			var values = {}
			var email, pwd
			for (var index = 0; index < inputs.length; ++index) {
				var el = inputs[index]
				if (el.type != 'submit') {
					if (el.name == 'email') email = el.value
					if (el.name == 'password') pwd = el.value
					values[el.name] = el.value
				}
			}
			var xhttp = new XMLHttpRequest()
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == XMLHttpRequest.DONE) {
					const res = JSON.parse(xhttp.responseText) || {}
					// User does not exists. Show register page
					if (res.errorCode == 300) {
						if (email) document.getElementById('reg-email').value = email
						if (pwd) document.getElementById('reg-pwd').value = pwd
						document.getElementById('login-form').style.display = 'none'
						document.getElementById('register-form').style.display = 'block'
					}
					else if (res.errorCode) {
						var errEl = (formElement.getElementsByTagName('div') || [])[0]
						errEl.innerHTML = res.message
						errEl.style.display = 'block'
					}
					else if (res.redirect)
						window.location.href = res.redirect
				}
			}
			
			xhttp.open('POST', formElement.action, true)
			xhttp.setRequestHeader('Content-type', 'application/json')
			xhttp.send(JSON.stringify(values))
			return false
		}
		return processForm
	}

	//////////////////////////						3. END - OVERRIDE FORM SUBMIT BEHAVIOR						/////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const el = config.el 
	if (!el) 
		throw new Error('Missing required argument \'el\'.')

	const domEl = document.querySelectorAll(el)[0]
	if (!domEl) 
		throw new Error(`DOM '${el}' not found.`)

	domEl.innerHTML = createComponent(config)
	// Override form submit behavior for all login button
	const forms = [document.getElementById('usr-pwd-form'), document.getElementById('usr-pwd-reg-form')]
	for (let i = 0; i < forms.length; i++) {
		if (forms[i].attachEvent) {
			forms[i].attachEvent('submit', overrideFormBehavior(forms[i]))
		} else {
			forms[i].addEventListener('submit', overrideFormBehavior(forms[i]))
		}
	}

	this.show = () => {
		document.getElementById(darkBackgroundId).style.visibility = 'unset'
		document.getElementById(formDomId).style.visibility = 'unset'
		animateFadeIn(document.getElementById(formDomId), 500)
		animateTopDown(document.getElementById(formDomId), 300, { start:-400, end:0 })
	}

	this.hide = () => {
		document.getElementById(darkBackgroundId).style.visibility = 'hidden'
		document.getElementById(formDomId).style.visibility = 'hidden'
	}

	if (config.hide)
		this.hide()
	else
		this.show()

	var _this = this
	document.querySelectorAll(`#${closeFormBtn} svg`)[0].addEventListener('click', function() {
		_this.hide()
	})

	showErrorMsg()

	// show the login form
	const swithForm = (mode) => () => {
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
	document.getElementById('userin-switch-to-login').addEventListener('click', swithForm('login'))
	document.getElementById('userin-switch-to-signup').addEventListener('click', swithForm('signup'))

	return this 
}

module.exports = {
	UserInForm
}