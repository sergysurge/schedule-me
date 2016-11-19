import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit, OnDestroy {
  
  public user: any
  public editAccountForm: FormGroup
  public submitted: boolean = false
  public incorrectPassword: boolean = false
  public showErrorMsg: boolean = false
  public showSuccessMsg: boolean = false
  private submitSubscription: Subscription
  private userSubscription: Subscription
  private userId: number = Number(localStorage.getItem('userId'))
  
  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {
    this.userSubscription = this.customerService.getUser()
      .subscribe(
        (user) => { 
          this.user = user
          this.editAccountForm.controls['firstName'].setValue(this.user.firstName || '')
          this.editAccountForm.controls['lastName'].setValue(this.user.lastName || '')
          this.editAccountForm.controls['phoneNumber'].setValue(this.user.phoneNumber || '')
          this.editAccountForm.controls['email'].setValue(this.user.email || '')
          this.editAccountForm.controls['image'].setValue(this.user.image || '') 
        },
        (err) => { console.log(err) }
      )
  }

  ngOnInit() {
    console.log('this.user init', this.user)
    this.editAccountForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', []],
      email: ['', [Validators.required]],
      image: ['', []],
      password: ['', [Validators.required]]
    })
    if(!this.user) {
      this.userSubscription = this.customerService.getUserInformation(this.userId, null)
        .subscribe(
          (res) => { 
            this.user = res.response.user
            console.log('user+++++', this.user)
          },
          (err) => { console.log(err) }
        )
    }

  }

  onSubmit(update) {
    console.log('update', update)
    this.submitted = true
    console.log('valid?', this.editAccountForm.valid)
    if (this.editAccountForm.valid) {
      let updateFields = {}
      for (let field in update) {
        if (update[field]) {
          updateFields[field] = update[field]
        }
      }
      console.log(updateFields)
      this.submitSubscription = this.customerService.submitUserUpdates(this.userId, updateFields)
        .subscribe(
          (res) => {
            console.log('res', res)
            if (res.response.success) {
              this.showSuccessMsg = true
              // this.userUpdate.emit(update)
            } else if (res.response.message === 'incorrect password') {
              this.incorrectPassword = true
            }
          },
          (err) => {
            this.showErrorMsg = true
            console.error(err)
          },
          () => {
            console.log('done')
          }
        )
    }
  }

  ngOnDestroy() {
    this.userSubscription && this.userSubscription.unsubscribe()
    this.submitSubscription && this.submitSubscription.unsubscribe()
  }

}
