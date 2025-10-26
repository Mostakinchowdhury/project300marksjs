import data from '../data.json'
import user from './user.json'
export let datas = [...data['bookmarks']]
export let users = [...user]

export const removefromdatas = (dtid) => {
  if (!datas.some((sd) => sd.id == dtid)) {
    return {
      success: false,
      message: 'Bookmark with this id not found'
    }
  }
  datas = datas.filter((sd) => sd.id != dtid)
  return {
    success: true,
    message: 'successfully remove from Bookmark'
  }
}

export const showabledata = () => {
  console.log(' show able data run at now and datas', datas)
  return datas.filter((dt) => !dt.isArchived).length > 0 ? datas.filter((dt) => !dt.isArchived) : []
}
// archived datas
export const archshowabledata = () => {
  let returnvalue =
    datas.filter((dt) => dt.isArchived).length > 0 ? datas.filter((dt) => dt.isArchived) : []
  console.log(`archshowabledata run at now and datas: ${JSON.stringify(returnvalue)}`)
  return returnvalue
}
export const addtodatas = (dt) => {
  if (datas.some((sd) => sd.id == dt.id)) {
    return {
      success: false,
      message: 'Bookmark with this id already exist'
    }
  }
  datas.push(dt)
  return {
    success: true,
    message: 'successfully addded the Bookmark'
  }
}

export const alltags = () => {
  return Array.from(new Set(showabledata().flatMap((dt) => dt.tags || [])))
}

export default datas
