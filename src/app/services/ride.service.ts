import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {

 public  loggedInSubject = new Subject()

 public refreshRequired =new Subject()

  constructor(private http:HttpClient) {

   }

   getCustomers(){

   



    return this.http.get("http://127.0.0.1:8000/api/customers/",{"headers":this.getHeaders()}) //observable

  
   }

   retrieveCustomer(id:any){

    let token=this.getAccessToken()

    let headers=new HttpHeaders().set("Authorization","Bearer "+token)

    return this.http.get(`http://127.0.0.1:8000/api/customers/${id}/`,{"headers":this.getHeaders()})
   }

   createCustomer(data:any){

    let token=this.getAccessToken()

    let headers=new HttpHeaders().set("Authorization","Bearer "+token)

    return this.http.post("http://127.0.0.1:8000/api/customers/",data,{"headers":headers})
   

   }

   updateCustomer(id:any,data:any){

    let token=this.getAccessToken()

    let headers=new HttpHeaders().set("Authorization","Bearer "+token)

    return this.http.put(`http://127.0.0.1:8000/api/customers/${id}/`,data,{"headers":headers})
   }

   deleteCustomer(id:any){
    let token=this.getAccessToken()

    let headers=new HttpHeaders().set("Authorization","Bearer "+token)

    return this.http.delete(`http://127.0.0.1:8000/api/customers/${id}/`,{"headers":headers})
   }

   getTokenPair(data:any){
    

    return this.http.post("http://127.0.0.1:8000/api/token/",data)

   }

   getAccessToken(){

    return localStorage.getItem("access")

   }


   getHeaders(){

    let token=this.getAccessToken()

    let headers=new HttpHeaders().set("Authorization","Bearer "+token)

    return headers

   }

   isAuthenticated(){

    this.loggedInSubject.next("access" in localStorage)

   }

   createWork(id:any,data:any){

    return this.http.post(`http://127.0.0.1:8000/api/customer/${id}/work/`,data,{headers:this.getHeaders()})
   }

   refreshWorkList(){

    this.refreshRequired.next(true)
   }


}
