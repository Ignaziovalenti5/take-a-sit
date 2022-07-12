import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterService } from 'src/app/auth/register.service';
import { Register } from 'src/app/models/register';
import { Restaurant } from 'src/app/models/restaurant';
import { OwnersService } from './owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  constructor(
    private ownersSrv:OwnersService,
    private registerUser:RegisterService,
    private auth:AuthService,
    private router:Router
  ) { }

  step1:boolean = true
  step2:boolean = false
  step3:boolean = false
  isLoading:boolean = false
  
  categories:string[] = []
  categoriesToAdd:string[] = []

  authOwners:Restaurant = {
    restaurant:'',
    address:'',
    city:'',
    cap:'',
    phone:'',
    categories:[],
    lunchStart:'',
    lunchEnd:'',
    dinnerStart:'',
    dinnerEnd:'',
    dayOff:'',
    reviews:[]
  }

  authRegister:Register = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    restaurant: ''
  }

  ngOnInit(): void {    
    this.categories = this.ownersSrv.categories    
  }

  goToStep2(){
    this.step1 = false; 
    this.step2 = true
  }

  addCategory(cat:string){
    if (!this.authOwners.categories.includes(cat)) {
      this.authOwners.categories.push(cat)
    }else{
      this.authOwners.categories = this.authOwners.categories.filter(c => c != cat)
    }
  }

  goToStep3(){
    this.step2 = false;
    this.step3 = true
  }

  registerRestaurant(){
    this.isLoading = true
    
    this.ownersSrv.registerRestaurant(this.authOwners).subscribe((res:any) => {

      
      this.authRegister.restaurant = res.id

      this.registerUser.registerUser(this.authRegister).subscribe((res:any) => {
          
        this.auth.login(this.authRegister).subscribe((res:any) => {

          this.auth.logUser(res.accessToken)
          this.router.navigate(['/owners/dashboard'])
        })
          
      })
    })
    
  }

}
