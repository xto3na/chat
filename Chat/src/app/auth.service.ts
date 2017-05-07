import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	constructor() { }

	isLoggedIn() {
		const loggedIn: string = localStorage.getItem('loggedIn');

		if ( loggedIn === 'true' ) {
		  return true;
		}
		return false;
	}

}
