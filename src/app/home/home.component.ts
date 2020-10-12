import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit{

  title: string;
  users: User[];
  dataSource: MatTableDataSource<User>;
  modal: MatDialog
  constructor(private userService:UserService, public dialog: MatDialog) {
      this.getUserList();

    this.title = 'Desafio Listagem';
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      const value =  (data.name||'').toLowerCase().includes(filter)||(data.username||'').toLowerCase().includes(filter)||(data.email||'').toLowerCase().includes(filter);
      return value;
    };
  }
  getUserList(){
    this.userService.findAll().subscribe(user => {this.users = user;  this.dataSource.data = user;   
    });
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'is_enabled', 'register_date', 'name', 'surname', 'email', 'phone', 'edit','delete'];

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user){
    let dialogRef =  this.dialog.open(CreateUserComponent,{data:user});
    dialogRef.afterClosed().subscribe(result => this.getUserList());
  }
  createUser(){
    let dialogRef = this.dialog.open(CreateUserComponent,{});
    dialogRef.afterClosed().subscribe(result => this.getUserList());
  }
  deleteUser(user){

    this.userService.delete(user).subscribe(retorno => this.getUserList());
  }


}
