import { Component } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent {

  users: any[] = [];
  authService: any;
  cartService: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.ViewAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete user: ${user.username}?`)) {
      this.userService.DeleteUserById(user.id).subscribe(() => {
        this.users = this.users.filter(u => u !== user);
      });
    }
  }


  viewOrder(userId: any) {
    const currentUser = this.authService.getCurrentUserId(userId);

  }

}
