import { Request, Response } from "express";

const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy cread", completedAt: null },
    { id: 3, text: "Buy cheese", completedAt: new Date() },
];

export class TodosController {
    constructor() {}
    public getTodos = (req: Request, res: Response) => {
        return res.json(todos); //! No se pueden hacer dos res.json
    };

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: "ID argument is not a number" });
        const todo = todos.find((todo) => todo.id === id);
        todo
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id: ${id} not found` });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "text property is required" });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null,
        };
        todos.push(newTodo);
        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: "ID argument is not a number" });
        
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return res.status(400).json({ error: `TODO with id: ${id} not found`  });
        
        
        const {text, completedAt} = req.body

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        // todos.forEach((todo, index) => {
        //     if (todo.id === id){
        //         todos[index] = todo
        //     }
        // })
        res.json(todo)


    };

    public deleteTodo = (req: Request, res: Response) => {
        const id  =  +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: "ID argument is not a number" });
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({error: 'No existe el todo'})
        todos.splice(todos.indexOf(todo),1);

        res.json(todo)
    }
}
