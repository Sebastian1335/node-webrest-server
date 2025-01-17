import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository.impl";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        
        const dataSource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(dataSource)
        const todoController = new TodosController(todoRepository)


        router.get("/", (req, res) => todoController.getTodos(req, res));
        router.get("/:id", (req, res) => todoController.getTodosById(req, res));
        
        router.post("/", (req, res) => todoController.createTodo(req, res));
        router.put("/:id", (req, res) => todoController.updateTodo(req, res));
        router.delete("/:id", (req, res) => todoController.deleteTodo(req, res));
        return router;
    }
}
