
const DEFAULT_CARDS = [
    // BACKLOG
    {
        projectId: '1',
        title: "Look into render bug in dashboard",
        id: "1",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "SOX compliance checklist",
        id: "2",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "[SPIKE] Migrate to Azure",
        id: "3",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "Document Notifications service",
        id: "4",
        column: "backlog",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    // TODO
    {
        projectId: '1',
        title: "Research DB options for new microservice",
        id: "5",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "Postmortem for outage",
        id: "6",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "Sync with product on Q3 roadmap",
        id: "7",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },

    // DOING
    {
        projectId: '1',
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        projectId: '1',
        title: "Add logging to daily CRON",
        id: "9",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    // DONE
    {
        projectId: '1',
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    {
        projectId: '1',
        id: '11',
        title: 'Set up project repository',
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
        column: "done",
    },
    {
        projectId: '1',
        id: '20',
        title: 'Design UI mockups',
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
        column: "done",
    },
    {
        projectId: '2',
        id: '16',
        title: 'Develop card filtering and searching',
        description: 'Implement functionality to filter and search cards based on title, label, or team member.',
        label: 'Development',
        teamMembers: ['Alice'],
        column: "todo",
    },
    {
        projectId: '2',
        id: '17',
        title: 'Design and implement card comments',
        description: 'Create a system for users to add comments to cards for discussion and collaboration.',
        label: 'Design, Development',
        teamMembers: ['Charlie', 'Bob'],
        column: "backlog",
    },
    {
        projectId: '2',
        id: '18',
        title: 'Integrate with existing issue tracker',
        description: 'Connect the Kanban board with your existing issue tracking system for seamless data flow.',
        label: 'Development',
        teamMembers: ['Bob'],
        column: "backlog",
    },
    {
        projectId: '1',
        id: '12',
        title: 'Design UI mockups',
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
        column: "done",
    },
    {
        projectId: '2',
        id: '13',
        title: 'Implement drag and drop functionality',
        description: 'Build the drag and drop functionality for cards within the Kanban board.',
        label: 'Development',
        teamMembers: ['Alice', 'Bob'],
        column: "doing",
    },
    {
        projectId: '1',
        id: '14',
        title: 'Write unit tests for core components',
        description: 'Develop unit tests to ensure the core components of the Kanban board function correctly.',
        label: 'Testing',
        teamMembers: ['Emily'],
        column: "todo",
    },
    {
        projectId: '3',
        id: '15',
        title: 'Deploy the Kanban board to production',
        description: 'Deploy the completed Kanban board application to the production environment.',
        label: 'Deployment',
        teamMembers: ['John'],
        column: "backlog",
    },
];

export default DEFAULT_CARDS;