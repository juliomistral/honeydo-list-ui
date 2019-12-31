
export interface AppState {
    userId: number;
    currentListId: number;
    currentError?: string;
    currentMessage?: string;
}

export const initialState: AppState = {
    userId: null,
    currentListId: null,
    currentError: null,
    currentMessage: null
};
