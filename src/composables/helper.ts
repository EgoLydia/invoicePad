export const shortenId = (str: string, num: number) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num)
}
