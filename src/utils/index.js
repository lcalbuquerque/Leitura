// Funções e variáveis utilizadas pelo App

export const sortFunc = (arr, prop, asc) => {
  if(prop){
    var arrCopy = arr.slice()
    arrCopy.sort((e1, e2) => {
      if(e1[prop] === e2[prop])
        return 0
      else if(e1[prop] < e2[prop])
        return asc ? -1 : 1
      else
        return asc ? 1 : -1 
    })
    return arrCopy
  }
  return arr
}

export const formatDateTime = (timestamp) => {
  if(timestamp){
      const d = new Date(timestamp)
      const time = d.toLocaleTimeString('en-US')
      return d.toLocaleDateString() + ' - ' + time.substr(0, 5) + time.slice(-2)
  }
  return undefined
}

export const CONSTS = {
  SORT_BY: {
    OPTIONS: {
      SCORE_ASC: { VALUE: 0, PROP: 'voteScore', TEXT: 'Vote Score (Low to High)', ASC: true },
      SCORE_DESC: { VALUE: 1, PROP: 'voteScore', TEXT: 'Vote Score (High to Low)', ASC: false },
      DATE_ASC: { VALUE: 2, PROP: 'timestamp', TEXT: 'Date (Low to High)', ASC: true },
      DATE_DESC: { VALUE: 3, PROP: 'timestamp', TEXT: 'Date (High to Low)', ASC: false }
    }
  },
  VOTE_SCORE: {
    OPTIONS: { UP: 'upVote', DOWN: 'downVote' }
  }
}