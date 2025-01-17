import { CreateTodoDTO, TodoDatasource, TodoEntity, TodoRespository, UpdateTodoDTO } from "../../domain";
import { TodoDatasourceImpl } from "../datasource/todo.datasource.impl";

export class TodoRepositoryImpl implements TodoRespository{

    constructor(
        private readonly dataSource: TodoDatasource
    ){}

    create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDTO)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id)
    }
    updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        return this.dataSource.updateById(updateTodoDTO)
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id)
    }

}