export const sortFunc = (arr, prop, asc) => {
    if (prop) {
        var arrCopy = arr.slice()
        arrCopy.sort((e1, e2) => {
            if (e1[prop] === e2[prop])
                return 0
            else if (e1[prop] < e2[prop])
                return asc ? -1 : 1
            else
                return asc ? 1 : -1
        })
        return arrCopy
    }
    return arr
}

export const formatDateTime = (timestamp) => {
    if (timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return d.toLocaleDateString() + ' - ' + time.substr(0, 5) + time.slice(-2)
    }
    return undefined
}

export const SORT_OPTIONS = {
    Score_Asc: { value: 0, prop: 'voteScore', text: 'Vote Score (Low to High)', asc: true },
    Score_Desc: { value: 1, prop: 'voteScore', text: 'Vote Score (High to Low)', asc: false },
    Date_Asc: { value: 2, prop: 'timestamp', text: 'Date (Low to High)', asc: true },
    Date_Desc: { value: 3, prop: 'timestamp', text: 'Date (High to Low)', asc: false }
}

export const Vote_Score = {
    up: 'upVote',
    down: 'downVote'
}