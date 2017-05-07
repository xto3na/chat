import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

	message: string;
	
  constructor() { }

  ngOnInit() {
  }

  show(message: string): string {
  	this.message = message;
    return message;
  }

}
