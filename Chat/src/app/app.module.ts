import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'chat', component: ChatComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	// {
	// 	path: 'words',
	// 	component: WordsComponent
   //  // ,children: [
   //  //   { path: '', component: AboutHomeComponent }, // url: about/
   //  //   { path: 'item/:id', component: AboutItemComponent } // url: about/item
   //  // ]
	// },
	// { path: 'contact', component: ContactComponent },
	// { path: 'about', component: AboutComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
		HomeComponent,
		LoginComponent,
		MenuComponent,
		SignupComponent,
		ChatComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
		HttpModule
	],
	providers: [
		{provide: LocationStrategy, useClass: HashLocationStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
