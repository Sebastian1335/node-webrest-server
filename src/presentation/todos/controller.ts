import { Request, Response } from "express";
import { CreateTodo, CreateTodoDTO, DeleteTodo, GetTodo, GetTodos, TodoRespository, UpdateTodo, UpdateTodoDTO } from '../../domain';

const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy cread", completedAt: null },
    { id: 3, text: "Buy cheese", completedAt: new Date() },
];

export class TodosController {
    constructor(
        private readonly todoRespository: TodoRespository
    ) {}
    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRespository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json(error))
    };

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRespository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] =  CreateTodoDTO.create(req.body)
        if (error) return res.status(400).json({error})
        
        new CreateTodo(this.todoRespository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if(error) return res.status(400).json({error})
        new UpdateTodo(this.todoRespository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json(error))
    };

    public deleteTodo = async(req: Request, res: Response) => {
        const id  =  +req.params.id;
        new DeleteTodo(this.todoRespository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }
}

//! Es necesario separar los controladores de la base de datos