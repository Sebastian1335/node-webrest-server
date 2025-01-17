import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoRespository, UpdateTodoDTO } from '../../domain';

const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy cread", completedAt: null },
    { id: 3, text: "Buy cheese", completedAt: new Date() },
];

export class TodosController {
    constructor(
        private readonly todoRespository: TodoRespository
    ) {}
    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRespository.getAll()
        console.log(todos);
        return res.json(todos)
    };

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.todoRespository.findById(id)
            res.json(todo)
        } catch (error) {
            res.status(400).json({error})
        }
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] =  CreateTodoDTO.create(req.body)
        if (error) return res.status(400).json({error})
        
        const todo = await this.todoRespository.create(createTodoDto!)
        res.json(todo)
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if(error) return res.status(400).json({error})
        const updatedTodo = await this.todoRespository.updateById(updateTodoDto!)
        res.json(updatedTodo)
    };

    public deleteTodo = async(req: Request, res: Response) => {
        const id  =  +req.params.id;
        const deletedTodo = await this.todoRespository.deleteById(id);
        res.json(deletedTodo)
    }
}

//! Es necesario separar los controladores de la base de datos