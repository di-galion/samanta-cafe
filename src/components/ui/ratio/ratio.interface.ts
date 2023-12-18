export interface IRatio {
    name: string,
    checked?: boolean,
    content: string,
    onClick?: (value: string) => void,
    testId?: string
}