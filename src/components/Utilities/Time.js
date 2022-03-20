import moment from 'moment'

export const dateMoment = (dateString) => {
  return moment(dateString).utc().format('DD-MM-YYYY')
}
export const timeMoment = (dateString) => {
  return moment(dateString).format('hh:mm A')
}
export const time = (dateString) => {
  return moment(dateString).format('YYYY-MM-DD HH:mm')
}
export const timeConverter = (str) => {
  const date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

export const hours = (z) => {
  let time = z.split(':')[0]
  if (time < 12) return `${z} AM`
  if (time > 12) {
    let newTime = +time - 12
    return `${newTime} PM`
  } else return `${time} Noon`
}

export const daily = (value) => {
  let result = ''
  if (value === 1) result = 'daily'
  else result = `${value} days`
  return result
}
export const duration = (value) => {
  let result = ''
  if (value === 1) result = 'once'
  if (value === 2) result = 'twice'
  if (value === 3) result = 'thrice'
  else if (value > 3) result = `${value} times`
  return result
}

export const returnpercent = (a, b) => {
  return (+b / +a).toFixed(2) * 100
}
export const financialPercent = (a, b) => {
  return Math.round((a / (b + a)) * 100)
}

export const selectOptions = [
  { key: 'Jan', value: '1' },
  { key: 'Mar', value: '3' },
  { key: 'May', value: '5' },
  { key: 'Jul', value: '7' },
  { key: 'Sept', value: '9' },
  { key: 'Nov', value: '11' },
  { key: 'Jan', value: '1' },
]
export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num)
}
export const unformat = (amount, locale) => {
  let thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '')
  let decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '')

  return parseFloat(
    amount
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), ','),
  )
}
export const monthNames = ['Jan', 'Mar', 'May', 'Jul', 'Sept', 'Nov', 'Jan']
