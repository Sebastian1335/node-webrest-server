import { CreateTodoDTO } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRespository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase{
    execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase{
    constructor(
        private readonly repository: TodoRespository
    ){}
    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.repository.create(dto)
    }
}