const minutesNumber = fixNumber(Array.from(Array(60).keys()))
const hourNumber = fixNumber(Array.from(Array(13).keys()))

function fixNumber(value:number[]):string[] {
    let res = value.map(hour => {
        if (hour < 10) {
            let test:string = "0" + hour.toString()
            return test
        }
        return hour.toString()
    })
    return res
}

export { minutesNumber, hourNumber }