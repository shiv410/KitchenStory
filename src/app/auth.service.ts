import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<any>;

  private baseURL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.email === 'admin@gmail.com' && user.password === 'admin@123') {
      localStorage.setItem('role', 'admin');
    } else {
      localStorage.setItem('role', 'user');
    }
  }

  changePassword(currentPassword: string, newPassword: string) {
    return of({ success: true });
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') ? true : false;
  }

  // getCurrentUser(): any {
  //   return JSON.parse(localStorage.getItem('currentUser') || '{}');
  // }

  getCurrentUserId(): number {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    return currentUser ? currentUser.id : null;
  }

  getRole(): string {
    return localStorage.getItem('role') || 'user';
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${userId}`);
  }

}
