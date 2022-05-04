import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

  constructor(private userService:UsersService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {        
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email], <AsyncValidatorFn>this.forbiddenEmails.bind(this)),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name': new FormControl('', [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
    console.log(this.form);
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name); 
    this.userService.createNewUser(user)
      .subscribe((user: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      });

  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if(user){
            resolve({forbiddenEmail: true});
          }
          else{
            resolve(null);
          }
        })
    });
  }
}
