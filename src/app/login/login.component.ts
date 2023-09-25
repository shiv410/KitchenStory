import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.userService.getUserByEmail(email).subscribe(user => {
        if (user && user[0] && user[0].password === password) {
          this.authService.login(user[0]);
          if (this.authService.getRole() === 'admin') {
            this.router.navigate(['/admin']);  // Navigate to the AdminComponent
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      }, error => {
        this.errorMessage = 'An error occurred';
      });
    }
  }
}


