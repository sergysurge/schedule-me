import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        console.log('inside can activate')
        if (this.authService.isLoggedIn()) {
            return true
        }
        this.router.navigate([''])
        return false
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        console.log('inside can activate child')
        return this.canActivate(route, state)
    }
}