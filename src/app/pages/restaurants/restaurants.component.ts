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

  ngOnInit(): void {
    this.route.params.subscribe((res:any) => {
      this.city = res.city      
    })

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

  similar(a:string, b:string) {
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency++;
        }
    }
    

    var weight = equivalency / maxLength;
    return (weight * 100);
}


}
