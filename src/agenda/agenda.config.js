import Agenda from 'agenda';

const agenda = new Agenda({ db: { address: process.env.ONLINE_DATABASE, collection: 'agendaJobs' } });

export default agenda;
