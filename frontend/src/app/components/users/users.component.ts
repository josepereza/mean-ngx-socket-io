import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Socket } from 'ngx-socket-io';

declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(public  userService: UserService, private socket: Socket ) { }

  ngOnInit(): void {
   
    this.getUsers();
    this.socket
             .fromEvent("update-data").subscribe(data=>{
               console.log('mi socket ', data)
              this.getUsers();
             })
   
    
  }

  addUser(form: NgForm){
   
    if(form.value._id){
      this.userService.putUser(form.value)
        .subscribe( res => {
          this.socket.emit('cambio',{
            message : 'un cambio BD'
          })
          this.resetForm(form);
          M.toast({html: 'Actualizado correctamente'});
          
          this.getUsers();
        })
    } else{
      this.userService.postUser(form.value)
        .subscribe( res => {
          this.socket.emit('cambio',{
            message : 'Un cambio BD'
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
            message : 'Un cambio BD'
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
