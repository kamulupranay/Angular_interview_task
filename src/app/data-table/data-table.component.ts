import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { AppService } from '../app.service';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  users: any[] = [];
  ids: any = [];
  checkDisable:boolean = false;
  sortDir = 1;//1= 'ASE' -1= DSC
  reverse: boolean = false;
  key: string = 'id';
  table: any;
  // dialog: any;
  // moveItemArray:any[] = [];
  // sortArr: any;
  constructor(private appService: AppService, private dialog: MatDialog) {
    this.sortArr('userName');
   }

  ngOnInit(): void {
    this.appService.getUsers().subscribe((res:any)=>{
      this.users = res;
      this.users.forEach((el) =>{
        if(el.id){
          this.checkDisable = false;
        }
      })
    })
  }

  onSortClick(event:any){
    let target = event.currentTarget,
      classList = target.classList;
    // this.sortDir = 1;
    if(this.sortDir == -1){
      this.sortDir = 1;
    }
    else{
      this.sortDir = -1;
    }
    // if (classList.contains('fa-sort')) {
    //   // classList.remove('fa-sort-up');
    //   // classList.add('fa-sort-down');
    //   this.sortDir=-1;
    // } else if(classList.contains('fa-sort')) {
    //   // classList.add('fa-sort-up');
    //   // classList.remove('fa-sort-down');
    //   this.sortDir=1;
    // }
    this.sortArr('userName');

  }

  sortArr(colName:any){
    this.users.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  onDelete(el:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width:"30%",
      hasBackdrop:true,
      data:{
        data:this.users,
        ids: this.ids,
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'Cancel'
        }
      }
    });
    // el.forEach((el:any, index:number) =>{
    //   if(el.isChecked){
    //     console.log(index)
    //   this.users.splice(index, 1);
    //   }
    // })
  }

  onCheck(e:any){
    console.log(e.target.checked);
    // this.checkDisable = !this.checkDisable;
    if(e.target.checked){
      if(this.ids.indexOf(e.target.value) == -1){
        this.ids.push(e.target.value);
        this.checkDisable = true;
      }
     
      
    }
    else{
      var index = this.ids.indexOf(e.target.value);
      this.ids.splice(index, 1);
      if(this.ids.length == 0){
        this.checkDisable = false;
      }
      
    }

  }

  drop(event: CdkDragDrop<Users[]>) {
    // Return the drag container to disabled.
    // this.dragDisabled = true;
    console.log(event);
    const previousIndex = this.users.findIndex((d) => d === event.item.data);

    moveItemInArray(this.users, previousIndex, event.currentIndex);
    this.table.renderRows();

  }
row:any;

start(event:any){  
  this.row = event.target; 
}
dragover(event:any){
  var e = event;
  e.preventDefault(); 
  
  let children= Array.from(e.target.parentNode.parentNode.children);
  
  if(children.indexOf(e.target.parentNode)>children.indexOf(this.row))
    e.target.parentNode.after(this.row);
  else
    e.target.parentNode.before(this.row);
}

}


