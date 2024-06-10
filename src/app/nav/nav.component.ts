import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isLoggedIn:boolean=false

  constructor(private service :RideService){

    this.service.loggedInSubject.subscribe((data:any)=>this.isLoggedIn=data)
  }

}
