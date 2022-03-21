import { Injectable } from '@nestjs/common';
import { KLogger } from './klogger';

@Injectable()
export class AppService {

    private readonly todos = []
    private readonly logger = new KLogger(AppService.name)    
    constructor(){
    }

    public createTodo(body : any){
      this.logger.log("createTodo:body",body)
      this.todos.push({
        _id: this.todos.length + 1,
        ...body
      })
      this.logger.log("createTodo:this.todos",this.todos)
      return body
    }

    public getAllTodos(){
      this.logger.log("getAllTodos:this.todos",this.todos)
      return this.todos;
    }

    public getById(id : number){
      this.logger.log("getById:id",id,"data getiriliyor")
      return this.todos.find(todo => todo._id == id)
    }
    
    public deleteTodo(id : number){
      const targetIndex = this.todos.findIndex(t => t._id == id)
      this.logger.log("deleteTodo:targetIndex",targetIndex)
      if(targetIndex != -1){
        this.todos.splice(this.todos.findIndex(t => t._id == id),1)
      }else{
        this.logger.log("deleteTodo:targetIndex",this.todos,"silinme olmadi!")
      }
      this.logger.log("deleteTodo:this.todos",this.todos)
    }
}