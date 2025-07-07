import agenda from "./agenda.config.js";
import defineReminderJob from "./jobs/reminder.job.js";

export async function startAgenda() {
    defineReminderJob(agenda);
    await agenda.start();
    await agenda.cancel({ name: 'check due todos' }); 
    await agenda.every('2 minutes', 'check due todos');
}

