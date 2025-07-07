import { Todo } from "../../../db/models/todo.model.js";
import sendEmail from "../../utils/sendEmail.js";

export default function defineReminderJob(agenda) {
    agenda.define('check due todos', async (job) => {
        console.log('🔁 Checking due todos at', new Date().toLocaleString());
        const now = new Date();
        const todos = await Todo.find({
            dueDate: { $gte: now },
            isCompleted: false,
            reminderSent: false,
        }).populate('userId', 'email name');
        for (const todo of todos) {
            const { email, name } = todo.userId;
            await sendEmail(
                email,
                `⏰ Reminder: "${todo.title}" is due soon`,
                `<p>Hi ${name},<br>Your task "<strong>${todo.title}</strong>" is due at ${todo.dueDate.toLocaleString()}.</p>`,
            );

            todo.dueDate = new Date(todo.dueDate.getTime() + 60 * 60 * 1000);

            await todo.save();
        }
    });

}


