import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form!: FormGroup;
  message!: Message;

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  private showMessage(text: string, type: string = 'danger'){
    this.message = new Message(type, text);
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
            this.showMessage('Correct', 'success');
          }
          else{
            this.showMessage('Incorrect password');
          }
        }
        else{
          this.showMessage('This user does not exist');
        }
      });
  }

}
