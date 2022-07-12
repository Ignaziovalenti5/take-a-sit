import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterService } from 'src/app/auth/register.service';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private registerSrv:RegisterService,
    private auth:AuthService,
    private router:Router
  ) { }

  authRegister:Register = {
    email : '',
    password : '',
    first_name: '',
    last_name: ''
  }

  ngOnInit(): void {
  }

  register(){
    this.registerSrv.registerUser(this.authRegister)
    .subscribe(data => {
        
        this.auth.login(this.authRegister).subscribe((res:any) => {
          
          this.auth.logUser(res.accessToken)
          this.router.navigate(['/'])
        })
    
      
      
    })
  }

}
