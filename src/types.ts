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


export interface KanbanState {
    cards: CardType[];
    projects: ProjectsTypes[];
    isOpen: boolean;
    currentId: string;
}
