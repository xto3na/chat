export class Api {
	HOST_SERVER = 'http://localhost:14500';
	
	REGISTER: string = this.HOST_SERVER + '/api/Account/Register';
	
	TOKEN_URL: string = this.HOST_SERVER + '/Token';
}
