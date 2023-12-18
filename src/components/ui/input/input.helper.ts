// export const maskInput = (e: any) => {
//     const getNumbersFromString = (str: string) => str.replace(/\D/g, '')
//
//     let inputNumbers = "",
//         input = e.target,
//         selectionStart = input.selectionStart,
//         formattedNumber = getNumbersFromString(input.value)
//
//     if (input.value.length !== selectionStart && formattedNumber.length <= 5) return;
//
//     if (formattedNumber.length < 3) {
//         input.value = formattedNumber
//         return
//     }
//
//     if (formattedNumber.length > 2) {
//         inputNumbers += formattedNumber.substring(0, 2) + '-' + formattedNumber.substring(2, 4)
//     }
//     if (formattedNumber.length > 4) {
//         inputNumbers +=  "-" + formattedNumber.substring(4, 6)
//     }
//
//     input.value = inputNumbers
// }
//
