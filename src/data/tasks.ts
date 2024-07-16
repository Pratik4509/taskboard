
const DEFAULT_CARDS = [
    // BACKLOG
    {
        title: "Look into render bug in dashboard",
        id: "1",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "SOX compliance checklist",
        id: "2",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "[SPIKE] Migrate to Azure",
        id: "3",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Document Notifications service",
        id: "4",
        column: "backlog",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    // TODO
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Postmortem for outage",
        id: "6",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Sync with product on Q3 roadmap",
        id: "7",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },

    // DOING
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Add logging to daily CRON",
        id: "9",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    // DONE
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    {
        id: '11',
        title: 'Set up project repository',
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
        column: "done",
    },
    {

        id: '12',
        title: 'Design UI mockups',
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
        column: "done",
    },
];

export default  DEFAULT_CARDS;