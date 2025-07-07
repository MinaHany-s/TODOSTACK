import express from 'express'
import * as TC from './todo.controller.js'
import * as TV from './todo.validations.js'
import auth from '../../middlewares/auth.js'
import systemRoles from '../../constants/systemRoles.js'
import validate from '../../middlewares/validate.js'
import asyncHandler from '../../utils/asyncHandler.js'
import { multerHost, validExtensions } from '../../middlewares/multer.js'
import reminderRouter from '../Reminder/reminder.routes.js'

const todoRouter = express.Router()


todoRouter.post('/',
    auth([systemRoles.user]),
    multerHost(validExtensions.image).fields([
        { name: "image", maxCount: 1 },
        { name: "images", maxCount: 3 }
    ]),
    validate(TV.addTodoValidation),
    asyncHandler(TC.addTodo)
)
todoRouter.patch('/mark-all-complete',
    auth([systemRoles.user]),
    validate(TV.toggleCompleteTodoValidation),
    asyncHandler(TC.markAllComplete)
)


todoRouter.patch('/:todoId',
    auth([systemRoles.user]),
    multerHost(validExtensions.image).fields([
        { name: "images", maxCount: 3 }
    ]),
    validate(TV.updateTodoValidation),
    asyncHandler(TC.updateTodo)
)

todoRouter.delete('/:todoId',
    auth([systemRoles.user]),
    validate(TV.deleteTodoValidation),
    asyncHandler(TC.deleteTodo)
)

todoRouter.get('/:todoId',
    auth([systemRoles.user]),
    validate(TV.getAllTodosValidation),
    asyncHandler(TC.getTodo)
)

todoRouter.get('/',
    auth([systemRoles.user]),
    validate(TV.getAllTodosValidation),
    asyncHandler(TC.getAllTodos)
)

todoRouter.delete('/:todoId/photos/:publicId',
    auth([systemRoles.user]),
    asyncHandler(TC.deleteTodoPhoto)
);


todoRouter.patch('/:todoId/toggle-complete',
    auth([systemRoles.user]),
    validate(TV.toggleCompleteTodoValidation),
    asyncHandler(TC.toggleCompleteTodo)
)


todoRouter.patch('/:todoId/toggle-pin',
    auth([systemRoles.user]),
    validate(TV.toggleCompleteTodoValidation),
    asyncHandler(TC.togglePinnedTodo)
)



// Dashboard


// Nest Reminder Routes under specific Todo
todoRouter.use('/:todoId/reminder' , reminderRouter)

export default todoRouter