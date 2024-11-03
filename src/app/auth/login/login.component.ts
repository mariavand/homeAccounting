import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form!: UntypedFormGroup;
  message!: Message;

  constructor(private userService:UsersService, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']){
          this.showMessage({text:'Now, you can login.',  type:'success'});
        }
        else if(params['accessDenied']){
          this.showMessage({text:'You must login first.',  type:'warning'});
        }
      });

    this.form = new UntypedFormGroup({
      'email': new UntypedFormControl('', [Validators.required, Validators.email]),
      'password': new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  private showMessage(message: Message){
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => 
        {if(user){
          if(user.password === formData.password){
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          }
          else{
            this.showMessage({text:'Incorrect password', type:'danger'});
          }
        }
        else{
          this.showMessage({text:'This user does not exist', type:'danger'});
        }
      });
  }

}
