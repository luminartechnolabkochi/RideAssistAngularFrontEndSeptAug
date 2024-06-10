import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers:any

  constructor(private service:RideService){

    this.service.isAuthenticated()


      this.ngOnInit()

  }

  ngOnInit(){
    this.service.getCustomers().subscribe(data=>this.customers=data)


  }

  handleDelete(id:any){

    this.service.deleteCustomer(id).subscribe(data=>{

      this.ngOnInit()
      
    })

  }

  generatePdf(id:any){

    console.log("customer id",id);
    

    let customerWorks=this.customers.find((cust:any)=>cust.id==id).works

    console.log(customerWorks);
    

    const doc = new jsPDF()

    let tableBody:any=[]

    customerWorks.forEach((work:any)=>{

      tableBody.push([work.title,work.description,work.amount])

    })




      autoTable(doc, {
        head: [['Title', 'description', 'amount']],
        body: tableBody,
      })
      doc.text("Invoice",10,10)

      doc.text("total Amount 4500",100,200)

    doc.save('table.pdf')
  }


}
