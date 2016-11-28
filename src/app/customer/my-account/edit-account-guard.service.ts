import { Injectable } from '@angular/core'
import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { EditAccountComponent } from './edit-account.component'
declare var swal: any

@Injectable()
export class EditAccountGuard{
    
    constructor(private router: Router) { }
    canDeactivate( component: EditAccountComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(component && component.editAccountForm.pristine || component.submitted) {
            return true
        }
        swal({
            title: "Discard changes to your profile",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, discard changes",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm) {
            console.log('isconfirm? ', isConfirm)
            return isConfirm
        })
    }
}