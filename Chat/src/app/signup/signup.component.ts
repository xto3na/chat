import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Api } from '../api';
import { Observable } from 'rxjs/Observable';



@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

	login = '';
	password = '';
	confirmPassword = '';

	api: Api;
	headers_to = new Headers();
	
		constructor(private http: Http) {
			this.api = new Api();
			this.headers_to.append('Content-Type', 'application/json');
		}

		ngOnInit() {
	}
	
	register() {
			const registerData = {
				'Email': this.login,
				'Password': this.password,
				'ConfirmPassword': this.confirmPassword
			};
			
			const registerUrl = this.api.REGISTER;
			console.log('registerUrl', registerUrl);
		this.http.post(registerUrl, JSON.stringify(registerData), {headers: this.headers_to}).subscribe((response: any) => { console.log('response', response ); });
	}

}
