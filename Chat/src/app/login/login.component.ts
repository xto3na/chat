import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Api } from '../api';
import { ErrorComponent } from '../shared/error/error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	login = '';
	password = '';

	error: ErrorComponent;
	api: Api;
	headers_to = new Headers();

	constructor(private http: Http) {
		this.api = new Api();
		this.headers_to.append('Content-Type', 'application/json');
		this.error = new ErrorComponent();
	}

	saveToken(token: any) {
		localStorage.setItem('token', token.json().access_token);
		localStorage.setItem('loggedIn', 'true');
	}

  ngOnInit() {

  }

  loginPost() {
	  const data = ['grant_type=password&' + 'username=' + this.login + '&password=' + this.password].join('');
	  this.http.post(this.api.TOKEN_URL, data).subscribe(
		  token => this.saveToken(token),
		  error =>  this.error.show(error));
  }
	  
	  
	  // xhr.success(function (responseData) {
		 //  const token = responseData.access_token; // TODO Получить из ответа токен
		 //  localStorage.setItem('tokenBearer', responseData.token_type + ' ' + token);
		 //  localStorageService.set('authData', responseData);
		 //  successCallback();
	  // });
	  // xhr.error(function () {
		 //  errorCallback();
	  // });
  }

