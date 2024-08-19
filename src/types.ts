export interface CardType {
    projectId : string,
    title: string,
    id: string,
    column: string,
    description: string,
    label: Array<string>,
    teamMembers: string[]
}

export interface ProjectsTypes {
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string
}

export interface TeamTypes {
    id: string,
    fullName: string,
    profilePicture: string,
    email: string,
    role: string,
    phoneNo: string,
    status: string,
    skills: string[]
}

export interface KanbanState {
    cards: CardType[];
    projects: ProjectsTypes[];
    teams: TeamTypes[];
    isOpen: boolean;
    currentId: string;
}
