import Express from "express";
import type { Request, Response } from "express";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/**
 * [GET] /users/
 * @author INSERT NAME HERE
 */
app.get("/users", (req: Request, res: Response) => {

});

/**
 * [POST] /users/
 * @author INSERT NAME HERE
 */
app.post("/users", (req: Request, res: Response) => {

});

/**
 * [DELETE] /users/:id
 * @author INSERT NAME HERE
 */
app.delete("/users/:id", (req: Request, res: Response) => {
  
});

app.listen(3000, (err) => {
  console.log("Server running...");
});
