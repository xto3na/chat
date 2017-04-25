/*
 * 
 * This script reworks swagger for Asp.Net OWIN OAuth 2.0 Authentication Server with bearer token
 * Version 1.0.0
 * 
 * Copyright (c) 2016 Eugene Sidorenko
 * https://github.com/deveugene/
 *
 * Licensed under MIT
 * 
 */

'use strict';

if (!window.swaggerUi) {
	throw new ReferenceError('Swagger UI not found');
}

(function () {

	var CredentialsTemplate = function () {
		return '<input type="checkbox" id="setEndpoint" /><label style="font-size: 0.7em;">&nbsp;Set endpoint&nbsp;</label> \
                <input type="text" id="endpoint" placeholder="Auth API endpoint" style="width: 280px; display: none;" value="<%= typeof(endpoint) !== "undefined" ? endpoint : ""%>" /> \
                <br /> \
                <input type="text" id="username" placeholder="username" style="width: 100px" /> \
                <input type="password" id="password" placeholder="password" style="width: 100px" /> ';
	};

	var TokenTemplate = function () {
		return '<input type="text" id="bearerToken" placeholder="bearer token" style="width: 140px;" />';
	};

	var BearerTokenView = Backbone.View.extend({
		constructor: function (options) {
			if (!options) {
				throw new Error('options is undefined');
			}

			if (!options.hasOwnProperty('el')) {
				throw new Error('el is undefined');
			}

			if (options.hasOwnProperty('templateType')) {
				this.templateType = options.templateType;
			} else {
				this.templateType = 'tokenOnly';
			}

			if (options.hasOwnProperty('model')) {
				this.model = options.model;
			}

			if (options.hasOwnProperty('endpoint')) {
				this.endpoint = options.endpoint;
			} else {
				this.endpoint = '/Token';
			}

			this.options = options;
			this.setElement(options.el);

			this.template = '';
			if (this.templateType === 'withCredentials') {
				this.template += CredentialsTemplate();
			}
			this.template += TokenTemplate();
		},

		events: {
			'change input#bearerToken': 'onChangeBearerToken',
			'change input#username': 'onChangeUsername',
			'change input#password': 'onChangePassword',
			'change input#setEndpoint': 'onChangeEndpointVisible',
			'change input#endpoint': 'onChangeEndpoint'
		},

		render: function () {
			var _self = this;
			var rendered = null;

			if (this.model) {
				rendered = _.template(this.template, this.model);
			} else {
				rendered = _.template(this.template);
			}

			$(this.el).html(rendered);

			this.log('rendered');
			return this;
		},

		dispose: function () {
			this.remove();
		},

		log: function (msg) {
			if (msg) {
				console.log(new Date().toTimeString() + ': ' + msg);
			}
		},

		sendAuthRequest: function (username, password) {
			var _self = this;
			var bearerToken = $(this.el).find('input#bearerToken')[0];
			$.post(this.endpoint, 'grant_type=password&username=' + username + '&password=' + password)
				.then(function (data, textStatus, xhr) {
					bearerToken.value = [data.token_type, ' ', data.access_token].join('');
					_self.onChangeBearerToken({ target: bearerToken });
				}, function (response, textStatus, xhr) {
					var data = JSON.parse(response.responseText);
					bearerToken.value = '<' + textStatus.toUpperCase() + '> ' + data.error_description;
				});
		},

		// Event handlers

		onChangeEndpointVisible: function (e) {
			var isChecked = e.target.checked;
			if (isChecked) {
				$('#endpoint').show(1000);
			} else {
				$('#endpoint').hide(1000);
				this.endpoint = this.options.endpoint;
			}
		},

		onChangeEndpoint: function (e) {
			var endpoint = e.target.value;
			if (endpoint && endpoint.trim() !== '') {
				this.endpoint = endpoint;
			} else {
				this.endpoint = this.options.endpoint;
			}
		},

		onChangeBearerToken: function (e) {
			var token = e.target.value;
			if (token && token.trim() !== '') {
				// Set Authorization HTTP header
				var oAuth = new SwaggerClient.ApiKeyAuthorization('Authorization', token, 'header');
				swaggerUi.api.clientAuthorizations.add('bearer_token', oAuth);
				this.log('Added HTTP header with token: ' + token);
			} else {
				// Remove Authorization HTTP header
				swaggerUi.api.clientAuthorizations.remove('bearer_token');
				this.log('Remove Authorization HTTP header');
			}
		},

		onChangeUsername: function (e) {
			var username = e.target.value;
			var password = $(this.el).find('input#password')[0].value;
			if (username && password) {
				this.sendAuthRequest(username, password);
			}
		},

		onChangePassword: function (e) {
			var username = $(this.el).find('input#username')[0].value;
			var password = e.target.value;
			if (username && password) {
				this.sendAuthRequest(username, password);
			}
		}
	});

	$('div#header').height(50);
	$('#input_apiKey').parent().next().hide();
	new BearerTokenView({
		el: $('#input_apiKey').parent(),
		templateType: 'withCredentials', //tokenOnly or withCredentials
		endpoint: '/Token'
	}).render();
})();