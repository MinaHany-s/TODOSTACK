import { Reminder } from "../../../db/models/reminder.model.js";
import { Tag } from "../../../db/models/tag.model.js";
import { Todo } from "../../../db/models/todo.model.js";
import APIFeatures from "../../utils/apiFeatures.js";
import appError from "../../utils/appError.js";
import cloudinary from "../../utils/cloudinary.js";


export const addTodo = async (req, res, next) => {
    const { title, description, dueDate, tag, reminder } = req.body;
    const userId = req.user._id;

    if (tag) {
        const validTag = await Tag.findOne({ _id: tag, userId });
        if (!validTag) {
            return next(new appError("Invalid tag", 400));
        }
    }

    if (reminder) {
        const validReminder = await Reminder.findOne({ _id: reminder, userId });
        if (!validReminder) {
            return next(new appError("Invalid reminder", 400));
        }
    }



    let uploadedImages = [];
    if (req.files?.images?.length) {
        for (const file of req.files.images) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `toDoMedia/${userId}`
            })
            uploadedImages.push({ secure_url, public_id });
        }
    }
    const todo = await Todo.create({
        userId,
        title,
        description,
        dueDate,
        tag: tag || null,
        reminder: reminder || null,
        photo: uploadedImages.length ? uploadedImages : [],
    });

    const populatedTodo = await Todo.findById(todo._id)
        .populate("tag", "name color")
        .populate("reminder", "time message");


    return res.status(201).json({
        status: "success",
        message: "Todo created successfully",
        todo: populatedTodo,
        timestamp: new Date().toISOString(),
    });
}

export const updateTodo = async (req, res, next) => {
    
    const { todoId } = req.params;
    const { title, description, dueDate, tag, reminder } = req.body;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        return next(new appError("Todo not found", 404));
    }

    if (tag) {
        const validTag = await Tag.findOne({ _id: tag, userId });
        if (!validTag) {
            return next(new appError("Invalid tag", 400));
        }
        todo.tag = tag;
    }

    if (reminder) {
        const validReminder = await Reminder.findOne({ _id: reminder, userId });
        if (!validReminder) {
            return next(new appError("Invalid reminder", 400));
        }
        todo.reminder = reminder;
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (dueDate) todo.dueDate = dueDate;

    if (req.files?.images?.length) {

        const uploadedImages = [];
        for (const file of req.files.images) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `toDoMedia/${userId}`
            });
            uploadedImages.push({ secure_url, public_id });
        }

        todo.photo = uploadedImages;
    }

    await todo.save();

    const populatedTodo = await Todo.findById(todo._id)
        .populate("tag", "name color")
        .populate("reminder", "time message");

    return res.status(200).json({
        status: "success",
        message: "Todo updated successfully",
        todo: populatedTodo,
        timestamp: new Date().toISOString(),
    });
};


export const deleteTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const userId = req.user._id;

        const todo = await Todo.findOne({ _id: todoId, userId });
        if (!todo) {
            return next(new appError("Todo not found", 404));
        }

        if (Array.isArray(todo.photo) && todo.photo.length > 0) {
            for (const image of todo.photo) {
                if (image?.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }
        }

        await todo.deleteOne();

        return res.status(200).json({
            status: "success",
            message: "Todo and associated images deleted successfully",
            timestamp: new Date().toISOString(),
        });

    } catch (err) {
        return next(new appError("Something went wrong during deletion", 500));
    }
};

export const deleteTodoPhoto = async (req, res, next) => {
    const { todoId, publicId } = req.params;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        return next(new appError("Todo not found", 404));
    }

    const photoToDelete = todo.photo.find(p => p.public_id === publicId);
    if (!photoToDelete) {
        return next(new appError("Photo not found in this Todo", 404));
    }

    await cloudinary.uploader.destroy(publicId);

    todo.photo = todo.photo.filter(p => p.public_id !== publicId);
    await todo.save();

    return res.status(200).json({
        status: "success",
        message: "Photo deleted successfully",
        photos: todo.photo,
        timestamp: new Date().toISOString()
    });
};


export const getAllTodos = async (req, res, next) => {

    const userId = req.user._id;
    const features = new APIFeatures(Todo.find({ userId }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const todos = await features.query


    return res.status(200).json({
        status: "success",
        message: "Todos retrieved successfully",
        todos,
        count: todos.length,
        timestamp: new Date().toISOString(),
    });


};
export const getTodo = async (req, res, next) => {

    const { todoId } = req.params;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        return next(new appError("Todo not found", 404));
    }
    return res.status(200).json({
        status: "success",
        message: "Todo retrieved successfully",
        todo,
        timestamp: new Date().toISOString(),
    });

};

export const toggleCompleteTodo = async (req, res, next) => {
    
    const { todoId } = req.params;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        return next(new appError("Todo not found", 404));
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res.status(200).json({
        status: "success",
        message: `Todo marked as ${todo.isCompleted ? "completed" : "not completed"}`,
        todo,
        timestamp: new Date().toISOString(),
    });
};

export const togglePinnedTodo = async (req, res, next) => {
    const { todoId } = req.params;
    const userId = req.user._id;

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
        return next(new appError("Todo not found", 404));
    }

    todo.isPinned = !todo.isPinned;
    await todo.save();

    return res.status(200).json({
        status: "success",
        message: `Todo has been ${todo.isPinned ? "pinned" : "unpinned"}`,
        todo,
        timestamp: new Date().toISOString(),
    });
};

export const markAllComplete = async (req, res, next) => {
    const userId = req.user._id;

    const todos = await Todo.find({ userId, isCompleted: false });
    if (!todos.length) {
        return next(new appError("No incomplete todos found", 404));
    }

    await Todo.updateMany({ userId, isCompleted: false }, { isCompleted: true });

    return res.status(200).json({
        status: "success",
        message: `${todos.length} todos marked as completed`,
        timestamp: new Date().toISOString(),
    });
};
