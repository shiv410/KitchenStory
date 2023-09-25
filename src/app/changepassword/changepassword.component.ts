import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private authService: AuthService) { }

  onChangePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.authService.changePassword(this.currentPassword, this.newPassword)
        .subscribe((response: { success: any; }) => {
          if (response.success) {
            alert('Password changed successfully!');
          } else {
            alert('Error changing password. Please try again.');
          }
        });
    } else {
      alert('New passwords do not match!');
    }
  }

}
