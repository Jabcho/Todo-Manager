import axios from "axios"

let eventGuid = 0
//let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


export const INITIAL_EVENTS = function(info, successCallback, failureCallback) {
  // 4번째 인자를 받아서 초기화할 때 좀 만져줄수없나...
  console.log('initialized')
  console.log(info)
    axios.get('/api/calendar/getInitialEvents')
    .then((res) => {
        successCallback(res.data)
      }
    )
    .catch((err) => {
      failureCallback(err);
    })
  }


/*
export const INITIAL_EVENTS = function() {
  console.log("initialized")
  return axios.get('/api/calendar/getInitialEvents')
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    console.log(err)
  })
}*/
/*
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'long event',
    start: '2022-12-19',
    end: '2022-12-21'
  }
]*/

export function createEventId() {
  eventGuid ++
  let nowStr = new Date().toISOString()
  const createdId = eventGuid + '_' + nowStr
  return String(createdId)
}