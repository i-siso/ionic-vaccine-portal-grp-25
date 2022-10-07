import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.userService.isAuthenticated()) { return true; }

    // Store the attempted URL for redirecting

    // Navigate to the login page with extras
    this.route.navigate(['/login']);
    return false;
  }

}
