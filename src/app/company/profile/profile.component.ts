import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CompanyService } from '../company.service';
import { Subscription } from "rxjs/Rx";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnDestroy, OnInit{
  private subscription: Subscription
  private company: any
  private paramId

  
  private brandNameCustom
  private selectedBrandNamesAll = {
    id: false,
    name: '',

  }

  //                  companyUpdateProfile() {
  //   let tempBrandName = this.companyService.company.brandName
  //   let body = {
  //     id: this.profileUpdateForm.value.id || this.companyService.company.id,
  //     name: this.profileUpdateForm.value.name || this.companyService.company.name,
  //     address: this.profileUpdateForm.value.address || this.companyService.company.address,
  //     phoneNumber: this.profileUpdateForm.value.phoneNumber || this.companyService.company.phoneNumber,
  //     description: this.profileUpdateForm.value.description || this.companyService.company.description,
  //     website: this.profileUpdateForm.value.website || this.companyService.company.website,
  //     image: this.profileUpdateForm.value.image || this.companyService.company.image,
  //     logo: this.profileUpdateForm.value.logo || this.companyService.company.logo,
  //     BrandNameId: this.profileUpdateForm.value.BrandNameId || this.companyService.company.BrandNameId
  //   }
  //   this.companyService.updateProfile(body)
  //     .subscribe(data => {
  //       if (data.status === 200) {
  //         this.companyService.company = body
  //         this.companyService.company.brandName = tempBrandName
  //         console.log(data.status, 'company updated')
  //       }
  //       else (console.log('inccorrent updating'))

  //     })
  // }
  
  // PROFILE COMPANY IMAGE HUGE
  submitButtonUpdateCompany = false
  updateCompany() {
    let arr = [this.profileImage, this.profileName, this.profileWebsite, this.profileLogo, this.profileAddress, this.profilePhone]
    let arrIndex = ['image', 'name', 'website', 'logo', 'address', 'phoneNumber']
    let body = {
      id: this.companyService.company.id
    }
    arr.forEach((item, index)=> {
      console.log(item, arr[index].toString())
      if (item !== '' && item !== 'http://res.cloudinary.com/leaena/image/upload/c_scale,e_improve,w_674/v1392597331/2014-02-16_14_20_24_jcghgq.jpg' && item !== 'http://res.cloudinary.com/leaena/image/upload/c_scale,e_improve,w_674/v1392597331/2014-02-16_14_20_24_jcghgq.jpg') {
        console.log('WINNER WINNER')
        console.log(item, 'WINNER WINNER')
        let keys = arrIndex[index]
        body[keys] = item
        console.log(body, 'this is body building up')

      }
    })
    this.companyService.updateProfile(body)
    .subscribe((data)=> {
      console.log(data, 'updatePROFILERESPONSE BABY *A*SAFASF*')
      this.router.navigate(['/admin'])
    
  })
  }
  
  cssProfileImage:any = {
    'width': '95%',
    'height': 'auto',
    'margin': 'auto'
  }
  cssProfileControl = 'off'
  cssProfileImageEdited:any 
  profileImage:any
  editImage = false

  //MOUSE ON
  mouseenterProfileImage() {
    if (this.profileImage === undefined) {
      this.profileImage = this.companyService.company.image
      console.log(this.profileImage, 'this.profileImage')
    }
    this.cssProfileImage = 
    { 'width': '80%',
    'height': 'auto',
    'margin': 'auto'
    }
    this.cssProfileControl = 'on'
  }
  //MOUSE OFF
  mouseleaveProfileImage() {
    this.cssProfileImage = { 
      'width': '95%',
      'height': 'auto',
      'margin': 'auto'
    }
    
    if (this.companyService.company.image === this.profileImage) {
      this.cssProfileControl = 'off'
    } else {
      this.cssProfileImageEdited = {
    'background-color': '#008ea8',
    'color': '#008ea8'
  }
      console.log('profile picutre changed')
      this.submitButtonUpdateCompany = true
    }

  }

  // PROFILE COMPANY LOGO 
          
  cssProfileLogo:any = {
    'width': '100%',
    'height': 'auto',
    'margin': '20px auto auto auto'
  }
  cssProfileLogoControl = 'off'
  cssProfileLogoEdited:any 
  profileLogo:any 
  editLogo = false

  //MOUSE ON
  mouseenterProfileLogo() {
    if (this.profileLogo === undefined) {
      this.profileLogo = this.companyService.company.logo
      console.log(this.profileLogo, 'this.profileLogo')
    }
    this.cssProfileLogo = { 
      'height': '50px',
      'width': 'auto',
      'margin': '20px auto auto auto'
      }
    this.cssProfileLogoControl = 'on'
  }
  //MOUSE OFF
  mouseleaveProfileLogo() {

    // this.cssProfileLogo = { 
    //   'width': '100%',
    //   'height': 'auto',
    //   'margin': '20px auto auto auto'
    // }
    console.log(this.companyService.company.logo, '**!!**', this.profileLogo)
    if (this.companyService.company.logo === this.profileLogo) {
      this.cssProfileLogoControl = 'off'
    } else {
      this.cssProfileLogoEdited = {
        'background-color': '#008ea8',
        'color': '#008ea8'
        }
        this.submitButtonUpdateCompany = true
      console.log('profile logo changed')
    } 
    }

  



  companySelectedBrandNamesAll(id, name) {
    this.selectedBrandNamesAll.id = id
    this.selectedBrandNamesAll.name = name
    console.log(this.selectedBrandNamesAll, 'from companySelectedBrandNamesAll')
  }
  
  companyGetAllBrandNames() {
    this.companyService.getAllBrandNames()
      .subscribe(data => console.log(data, "from companyGetAllBrandNames"))
  } 
  //sets brand name, people should then first click this then update/create profile
  companySetBrand() {
    this.companyService.company.BrandNameId = this.selectedBrandNamesAll.id
  }

  companyPostBrandName() {
    let body = {
      name: this.brandNamePostForm.value.brandNameCustom
    }
    this.companyService.postBrandName(body)
    .subscribe(data => {
      this.companyService.brandNamesAll = []
      this.companyGetAllBrandNames()
      console.log(data, "from ")
  })
  }
  /* profile component methods and variables */

            // SUBMIT WHEN PRESSING ENTER IN INPUT
            keyEnter(e, lineName){
              if (e.charCode == 13) {
                switch(lineName) {
                  case 'profileName':
                    this.profileEditName()
                    break
                  case 'profileAddress':
                    this.profileEditAddress()
                    break
                  case 'profilePhone':
                    this.profileEditPhone()
                    break
                  case 'profileWebsite':
                    this.profileEditWebsite()
                    break
                  default:
                    break
                }
                console.log('enter was pressed!')
              }
            }

            
            // FORM FORM FORM FORM 
                              //  NAME / PROFILE EDITS
            profileName = ''
            editName = false
            cssProfileName:any = {
              'margin-bottom' : '5px'
            }

            profileEditName() {
              this.editName === false ? this.editName = true : this.editName = false
                  this.cssProfileName = {
                    'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                  }
              // IF ITS A NEW PROFILE NAME, BLUE BACKGROUND
              let deal = () => {
              if (this.profileName !== '') {
                if (this.profileName !== this.companyService.company.brandName) {
                  this.cssProfileName = {
                    'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                  }
                  this.submitButtonUpdateCompany = true
                }
              } 
              if (this.profileName === '') {
                  this.cssProfileName = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
                
              } 
              // IF ITS THE SAME AS BEFORE, BACKGROUND GOES BACK
              if (this.profileName === this.companyService.company.brandName) {
                this.cssProfileName = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
              }
              }
                  if (this.editName === false) {
                    deal()
                  }
            }

                              //  ADDRESS / PROFILE EDITS
            profileAddress = ''
            editAddress = false
            cssProfileAddress:any = {
              'margin-bottom' : '5px'
            }

            profileEditAddress() {
              this.editAddress === false ? this.editAddress = true : this.editAddress = false
              this.cssProfileAddress = {
                'background-color' : '#008ea8',
                'color' : 'white',
                'margin-bottom' : '5px'
              }
              // IF ITS A NEW PROFILE NAME, BLUE BACKGROUND
              let deal = () => {
              if (this.profileAddress !== '') {
                if (this.profileAddress !== this.companyService.company.address) {
                  this.cssProfileAddress = {
                    'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                  }
                  this.submitButtonUpdateCompany = true
                }
              } 
              if (this.profileAddress === '') {
                  this.cssProfileAddress = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
                
              } 
              // IF ITS THE SAME AS BEFORE, BACKGROUND GOES BACK
              if (this.profileAddress === this.companyService.company.address) {
                this.cssProfileAddress = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
              }
              }
              if (this.editAddress === false) {
                deal()
              }
            }

                              //  PHONE / PROFILE EDITS
            profilePhone = ''
            editPhone = false
            cssProfilePhone:any = {
              'margin-bottom' : '5px'
            }

            profileEditPhone() {
              this.editPhone === false ? this.editPhone = true : this.editPhone = false
                this.cssProfilePhone = {
                  'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                }
              // IF ITS A NEW PROFILE NAME, BLUE BACKGROUND
              let deal = () => {
              if (this.profilePhone !== '') {
                if (this.profilePhone !== this.companyService.company.phoneNumber) {
                  this.cssProfilePhone = {
                    'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                  }
                  this.submitButtonUpdateCompany = true
                }
              } 
              if (this.profilePhone === '') {
                  this.cssProfilePhone = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
                
              } 
              // IF ITS THE SAME AS BEFORE, BACKGROUND GOES BACK
              if (this.profilePhone === this.companyService.company.phoneNumber) {
                this.cssProfilePhone = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
              }
              }
              if (this.editPhone === false) {
                deal()
              }
              
            }


            profileWebsite = ''
            editWebsite = false
            cssProfileWebsite:any = {
              'margin-bottom' : '5px'
            }

            profileEditWebsite() {
              this.editWebsite === false ? this.editWebsite = true : this.editWebsite = false
              this.cssProfileWebsite = {

                'background-color' : '#008ea8',
                'color' : 'white',
                'margin-bottom' : '5px'
              }
              // IF ITS A NEW PROFILE NAME, BLUE BACKGROUND
              let deal = () => {
              if (this.profileWebsite !== '') {
                if (this.profileWebsite !== this.companyService.company.website) {
                  this.cssProfileWebsite = {
                    'background-color': '#008ea8',
                    'color' : 'white',
                    'margin-bottom' : '5px'
                  }
                }
              } 
              if (this.profileWebsite === '') {
                  this.cssProfileWebsite = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
                  this.submitButtonUpdateCompany = true
                
              } 
              // IF ITS THE SAME AS BEFORE, BACKGROUND GOES BACK
              if (this.profileWebsite === this.companyService.company.website) {
                this.cssProfileWebsite = {
                    'background-color': 'white',
                    'color' : 'black',
                    'margin-bottom' : '5px'
                  }
              }
              }
              if (this.editWebsite === false) {
                deal()
              }
            }





  companyUpdateProfile() {
    let tempBrandName = this.companyService.company.brandName
    let body = {
      id: this.profileUpdateForm.value.id || this.companyService.company.id,
      name: this.profileUpdateForm.value.name || this.companyService.company.name,
      address: this.profileUpdateForm.value.address || this.companyService.company.address,
      phoneNumber: this.profileUpdateForm.value.phoneNumber || this.companyService.company.phoneNumber,
      description: this.profileUpdateForm.value.description || this.companyService.company.description,
      website: this.profileUpdateForm.value.website || this.companyService.company.website,
      image: this.profileUpdateForm.value.image || this.companyService.company.image,
      logo: this.profileUpdateForm.value.logo || this.companyService.company.logo,
      BrandNameId: this.profileUpdateForm.value.BrandNameId || this.companyService.company.BrandNameId
    }
    this.companyService.updateProfile(body)
      .subscribe(data => {
        if (data.status === 200) {
          this.companyService.company = body
          this.companyService.company.brandName = tempBrandName
          console.log(data.status, 'company updated')
        }
        else (console.log('inccorrent updating'))

      })
  }



  /* end of profile component methods and variables */

  private brandNamePostForm : FormGroup
  private profileUpdateForm : FormGroup
   /* called before ngOnInit() */
  constructor(private companyService:CompanyService, private router:Router, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder) {

    /* IF CLIENT REFRESHES ON EMPLOYEES/SCHEDULES/OPTIONS THE LOGO AND OTHER INFORMATION 
    DELETES.      **IF USER REFRESHES ON THOSE PAGES, WE SEND EM BACK TO COMPANY/1 */

    

    /*ON company/# path, # of companyId gets rendered*/
   this.company = this.companyService.company;
   this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.paramId = param['id']
        localStorage.setItem('localCompanyId', this.paramId)
        this.companyService.getCompanyById(this.paramId)
          .subscribe((companyInc: any) => {

          this.companyService.profileUpdateControl()
          console.log(this.companyService.profileUpdate, 'profile updated or not')
          //console.log(this.company, ' AFTER')
        })
   })

   /* getting all brandNames available */
   this.companyGetAllBrandNames()

   /* brandNamePostForm goes here */
   this.brandNamePostForm = formBuilder.group({
     'brandNameCustom': [this.brandNameCustom, Validators.required]
   })

   /* profileUpdateForm goes here */
   this.profileUpdateForm = formBuilder.group({
      'BrandNameId': [this.companyService.company.BrandNameId, Validators.required],
      //'brandName': [this.companyService.company.brandName, Validators.required],
      'address': [this.companyService.company.address, Validators.required],
      'description': [this.companyService.company.description, Validators.required],
      'id': [this.companyService.company.id, Validators.required],
      'image': [this.companyService.company.image, Validators.required],
      'logo': [this.companyService.company.logo, Validators.required],
      'name': [this.companyService.company.name, Validators.required],
      'phoneNumber': [this.companyService.company.phoneNumber, Validators.required],
      'website': [this.companyService.company.website, Validators.required]
   })

   }


  ngOnInit() {
    this.companyService.adminCheck()
    this.companyService.profileUpdateControl()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
