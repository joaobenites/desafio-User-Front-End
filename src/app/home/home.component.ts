import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  constructor(private userService:UserService) {
    this.userService.findAll().subscribe(user => {this.users = user;  this.dataSource.data = user;   
      
    });

    this.title = 'Desafio Listagem';
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      const value =  (data.name||'').toLowerCase().includes(filter)||(data.username||'').toLowerCase().includes(filter)||(data.email||'').toLowerCase().includes(filter);
      return value;
    };
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'is_enabled', 'register_date', 'name', 'surname', 'email', 'phone'];

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
