export interface IRatio {
    currentInput?: number
    onClick?: (value: string) => {},
    variant?: "main" | "order",
    width?: "lg" | "sm",
    testId?: string
}