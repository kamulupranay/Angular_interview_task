import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor( @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  private appService: AppService, private toastr: ToastrService) { 
    if(data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    
    this.data.ids.map((id:any, index:number) =>{
      console.log(id, 'ids');
      var itemdata =  this.data.data.findIndex((item:any)=> item.id == id);
      if(itemdata !== -1 ){
        this.data.data.splice(itemdata,1);
      }
      console.log(itemdata, 'itemData');
     
        // this.data.data.splice(itemdata,1);
        // this.data.ids.splice(index,1);    
      
    });
    console.log(this.data.data);
    this.toastr.error('Deleted Successfully');
   
    
    
    // const filterData = this.data.data.filter((el:any, index:number) =>{
    //   console.log(this.data.ids);
    //   console.log(el.id);
    //   console.log(this.data.ids.indexOf(el.id.toString()));
    //   if(this.data.ids.indexOf(el.id.toString()) != -1){
    //     console.log('if')
    //     this.data.data.splice(index, 1);
    //   }
    //   return this.data.data;
    // });
    // console.log(filterData);
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
