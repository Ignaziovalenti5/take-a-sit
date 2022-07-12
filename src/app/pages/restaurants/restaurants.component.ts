import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  constructor(
    private restSrv:RestaurantsService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  restaurants:Restaurant[] = []
  restaurant!:Restaurant
  city!:string
  isLoading:boolean = false
  noCity:boolean = false

  currentPage:number = 1
  pages:number[] = []

  ngOnInit(): void {
    this.route.params.subscribe((res:any) => {
      this.city = res.city      
    })
    console.log(location);
    

    this.getRestaurants()
  }

  getRestaurants(){
    this.isLoading = true

    this.restSrv.getRestaurants().subscribe((res:any) => {

      if (this.city) {
        this.noCity = true
        
        this.restaurants = res.filter((r:Restaurant) => r.city.toLowerCase() == this.city.toLowerCase())
        
      }else{
        this.restaurants = res
      }
      
      this.isLoading = false
    })

  }

  searchRestaurantByCity(){
    this.router.navigate(['restaurants/'+this.city])
    this.getRestaurants()
  }

  //TODO pagination
  paginate(restaurant:Restaurant[], restaurantForPage:number){
    
  }


}
