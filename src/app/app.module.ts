import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [UsersService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
