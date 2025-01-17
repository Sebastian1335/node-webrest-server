import { UpdateTodoDTO } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRespository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase{
    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase{
    constructor(
        private readonly repository: TodoRespository
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id)
    }
}