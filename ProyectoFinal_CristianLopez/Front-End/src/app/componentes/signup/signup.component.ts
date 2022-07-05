import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignup:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formSignup=this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        password: ['', [Validators.required]],
        email:['', [Validators.email]]
      }
    )

    
   }

  ngOnInit(): void {
  }

}
