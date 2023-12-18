export interface ISelect {
    onClick?: (value: string) => void,
    currentValue?: string | number,
    disabled?: boolean,
    testId?: string
}