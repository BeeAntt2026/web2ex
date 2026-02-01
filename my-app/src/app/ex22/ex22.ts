import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Custom validator to check for special characters
function customValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const valid = !pattern.test(control.value);
    return valid ? null : { nameNotMatch: true };
  };
}

// Password match validator
function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPass = control.get('confirmPass');
  
  if (!password || !confirmPass) {
    return null;
  }
  
  return password.value === confirmPass.value ? null : { misMatch: true };
}

@Component({
  selector: 'app-ex22',
  standalone: false,
  templateUrl: './ex22.html',
  styleUrl: './ex22.css',
})
export class Ex22 {
  regForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.regForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), customValidator(/\@|\#|\$|\%|\^|\&/g)]],
      email: ['test@gmail.com'],
      password: [''],
      confirmPass: ['']
    }, { validators: [passwordValidator] });
  }

  get name() {
    return this.regForm.controls['name'];
  }

  setDefaultValues(): void {
    this.regForm.patchValue({
      name: 'Thanh AN',
      email: 'test@gmail.com',
      password: '',
      confirmPass: ''
    });
  }

  onSubmit(): void {
    console.log('Reactive Form submitted:', this.regForm.value);
  }
}
