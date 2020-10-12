import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  
  userForm: FormGroup;
  constructor(private userService:UserService,
   @Inject(MAT_DIALOG_DATA) public data: User,
   public dialogRef: MatDialogRef<HomeComponent>, public _snackBar: MatSnackBar) {

    
      this.userForm = this.createFormGroup();
      console.log(data)
      if(data){
        this.userForm.patchValue({
          username: data.username,
          is_enabled: data.is_enabled,
          name: data.name,
          surname: data.surname,  
          password: data.password,
          email: data.email,
          phone: data.phone
        })
      }
      
  }
 createFormGroup() {
    return new FormGroup({
      username: new FormControl(),
      is_enabled: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
    })
  }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
  onSubmit() {
    const result: User = Object.assign({}, this.userForm.value);
    console.log(result);
    if(this.data){
      result.id = this.data.id;
      result.register_date = this.data.register_date;
      this.userService.update(result).subscribe(result => this.dialogRef.close());
      
    }else{
      result.register_date = new Date;
      this.userService.create(result).subscribe(result => this.dialogRef.close() );
        
    }
    let message= "Sucesso ao salvar"
    this.openSnackBar(message, "X");
  }

}
