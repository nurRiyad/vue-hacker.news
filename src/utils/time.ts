import moment from 'moment'

export const timeDifferene = (createTime: number): string => {
  const cTime = moment()
  const nTime = moment.unix(createTime)

  const years = cTime.diff(nTime, 'years')
  const months = cTime.diff(nTime, 'months')
  const days = cTime.diff(nTime, 'days')
  const hours = cTime.diff(nTime, 'hours')
  const minutes = cTime.diff(nTime, 'minutes')

  if (years)
    return years > 1 ? `${years} years ago` : `${years} year ago`

  else if (months)
    return months > 1 ? `${months} months ago` : `${months} month ago`

  else if (days)
    return days > 1 ? `${days} days ago` : `${days} day ago`

  else if (hours)
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`
  else if (minutes)
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`

  else return 'now'
}
