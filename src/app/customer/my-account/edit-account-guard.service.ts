import { Injectable } from '@angular/core'
import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { EditAccountComponent } from './edit-account.component'

@Injectable()
export class EditAccountGuard implements CanDeactivate<EditAccountComponent> {
    
    constructor(private router: Router) { }
    canDeactivate( component: EditAccountComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(component && component.editAccountForm.pristine) {
            return true
        }
        return window.confirm("Discard changes?")
    }
    // canDeactivate(
    //     component: EditAccountComponent,
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ): Promise<boolean> | boolean {
    //     // console.log(state.url)
    //     // console.log(component.dialogService)
    //     if(component.editAccountForm.pristine) {
    //         return true
    //     }
    //     return component.dialogService.confirm('Discard changes?')
    // }
}