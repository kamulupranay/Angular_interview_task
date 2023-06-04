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
      userName: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required])
    });
    
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.value.userName == 'admin' && this.loginForm.value.password == "admin"){
      this.router.navigate(['/home'], { relativeTo: this.route });
      this.toastr.success('', 'Login Succesfully');
    }
    // else{

    // }
  }

}
