import { Injectable } from '@angular/core'
import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { EditAccountComponent } from './edit-account.component'

@Injectable()
export class EditAccountGuard implements CanDeactivate<EditAccountComponent> {
    
    constructor(private router: Router) { }
    canDeactivate( component: EditAccountComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('inside can deactivate')
        if(component && component.editAccountForm.pristine || component.submitted) {
            return true
        }
        return window.confirm("Discard changes?")
    }
}