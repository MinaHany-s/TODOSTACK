import express from 'express'
import auth from '../../middlewares/auth.js'
import systemRoles from '../../constants/systemRoles.js'
import validate from '../../middlewares/validate.js'
import asyncHandler from '../../utils/asyncHandler.js'
import * as RV from './reminder.validations.js'
import * as RC from './reminder.controller.js'


const reminderRouter = express.Router({ mergeParams: true });


reminderRouter.post('/',
    auth([systemRoles.user]),
    validate(RV.addReminderValidation),
    asyncHandler(RC.addReminder)
)
reminderRouter.delete('/:reminderId',
    auth([systemRoles.user]),
    validate(RV.deleteReminderValidation),
    asyncHandler(RC.deleteReminder)
);




export default reminderRouter