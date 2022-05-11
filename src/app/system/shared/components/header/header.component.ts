import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user!: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user')!);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
