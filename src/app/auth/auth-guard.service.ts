import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        if (localStorage.getItem('userId') !== null && localStorage.getItem('jwt-token') !== null) {
            return true
        }
        this.router.navigate(['/'])
        return false
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        console.log('inside can activate child')
        return this.canActivate(route, state)
    }
}