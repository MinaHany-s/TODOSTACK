import { Reminder } from "../../../db/models/reminder.model.js";
import { Todo } from "../../../db/models/todo.model.js";
import appError from "../../utils/appError.js";

export const addReminder = async (req, res, next) => {
    try {
        const { remindAt, message } = req.body;
        const { todoId } = req.params;
        const userId = req.user._id;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return next(new appError("Todo not found", 404));
        }

        if (!remindAt || !message) {
            return next(new appError("remindAt and message are required", 400));
        }

        const remindAtDate = new Date(remindAt);
        if (isNaN(remindAtDate)) {
            return next(new appError("Invalid remindAt date format", 400));
        }

        if (remindAtDate.getTime() <= Date.now()) {
            return next(new appError("remindAt must be a future date", 400));
        }

        const reminder = await Reminder.create({
            userId,
            todoId,
            remindAt: remindAtDate,
            message,
        });
        return res.status(201).json({
            status: "success",
            message: "Reminder created successfully",
            reminder,
            timestamp: new Date().toISOString(),
        });

    } catch (err) {
        return next(new appError("Something went wrong", 500));
    }
};




export const deleteReminder = async (req, res, next) => {
    const { reminderId } = req.params;
    const userId = req.user._id;

    const reminder = await Reminder.findOne({ _id: reminderId, userId });
    if (!reminder) {
        return next(new appError("Reminder not found", 404));
    }

    await Reminder.findByIdAndDelete(reminderId);

    return res.status(200).json({
        status: 'success',
        message: 'Reminder cancelled and deleted successfully',
        reminderId,
    });
};
