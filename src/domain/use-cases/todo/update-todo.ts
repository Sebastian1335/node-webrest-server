import { UpdateTodoDTO } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRespository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase{
    execute(dto: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase{
    constructor(
        private readonly repository: TodoRespository
    ){}
    execute(dto: UpdateTodoDTO): Promise<TodoEntity> {
        return this.repository.updateById(dto)
    }
}