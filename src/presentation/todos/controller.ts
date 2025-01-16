import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain';

const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy cread", completedAt: null },
    { id: 3, text: "Buy cheese", completedAt: new Date() },
];

export class TodosController {
    constructor() {}
    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await prisma.todo.findMany()
        return res.json(todos); //! No se pueden hacer dos res.json
    };

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        // if (isNaN(id))
        //     return res
        //         .status(400)
        //         .json({ error: "ID argument is not a number" });
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });
        todo
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id: ${id} not found` });
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] =  CreateTodoDTO.create(req.body)
        if (error) return res.status(400).json({error})
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if(error) return res.status(400).json({error})
        const todo = await prisma.todo.findFirst({
            where: {id}
        })
        if(!todo) return res.status(404).json({error: `TODO with id: ${id} not found`})
        const updatedTodo = await prisma.todo.update({
            where:{id},
            data: updateTodoDto!.values
        })
        res.json(updatedTodo)
    };

    public deleteTodo = async(req: Request, res: Response) => {
        const id  =  +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: "ID argument is not a number" });
        
        const todo = await prisma.todo.findFirst({
            where: {id}
        })
        if(!todo) return res.status(404).json({error: `TODO with id: ${id} not found`})
        const deleted = await prisma.todo.delete({
            where:{
                id: id
            }
        });
        (deleted)
            ? res.json(deleted)
            : res.status(400).json({error: 'Todo no existe'});
        res.json({todo, deleted})
    }
}

//! Es necesario separar los controladores de la base de datos