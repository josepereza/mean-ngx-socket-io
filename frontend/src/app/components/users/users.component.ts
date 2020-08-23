import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import * as io from 'socket.io-client';


declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  socket = io('http://localhost:5000');

  constructor(public  userService: UserService, ) { }

  ngOnInit(): void {
   
    this.getUsers();
    this.socket.on('update-data', (message) => {
      console.log(message);
      this.getUsers();
  });
    
  }

  addUser(form: NgForm){
   
    if(form.value._id){
      this.userService.putUser(form.value)
        .subscribe( res => {
          this.socket.emit('cambio',{
            message : 'cambio BD'
          })
          this.resetForm(form);
          M.toast({html: 'Actualizado correctamente'});
          
          this.getUsers();
        })
    } else{
      this.userService.postUser(form.value)
        .subscribe( res => {
          this.socket.emit('cambio',{
            message : 'cambio BD'
          })
          this.resetForm(form);
          M.toast({html: 'Guardado correctamente'});
          this.getUsers();
        });
      } 
  }

  deleteUser(_id: string){
   
    if(confirm('¿Esta seguro de querer eliminarlo?')){
      this.userService.deleteUser(_id)
        .subscribe( res => {
          this.socket.emit('cambio',{
            message : 'cambio BD'
          })
          this.getUsers();
          M.toast({html: 'Eliminado correctamente'});
        })
      }
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe( res => {
        this.userService.Users = res as User[];
        console.log(res);
      })
  }

  editUser(user: User){
   
    this.userService.selectedUser = user;
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}
