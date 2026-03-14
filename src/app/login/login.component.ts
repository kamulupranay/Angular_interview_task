import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup; 
  constructor(private formBuilder: FormBuilder, private router: Router, private route:ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  onSubmit(){
    console.log(this.loginForm);
    if(this.loginForm.value.userName == 'admin' && this.loginForm.value.password == "admin"){
      this.router.navigate(['/home'], { relativeTo: this.route });
      this.toastr.success('', 'Login Succesfully');
    }
    // else{

    // }
  }

}
