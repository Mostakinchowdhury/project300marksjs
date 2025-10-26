import {
  comaddbookmark,
  comarchivebookmark,
  comeditbookmark,
  compined,
  comunarchivebookmark,
  comunpined,
  deletebookmark
} from './components'
import datas, { archshowabledata, users } from './data'
import { bdcf, rerender } from './main'
import { qs } from './utils'

// bfsfe function for edit
const bfsfe = (e, id) => {
  e.preventDefault()
  let frm = qs('#bigdiolog').querySelector('form')
  let title = frm.querySelector('#title').value
  let description = frm.querySelector('#Description').value
  let url = frm.querySelector('#WebsiteURL').value
  let tags = frm.querySelector('#Tags').value.split(',')
  let favicon = frm.querySelector('#favicon').value
  let pinned = true
  let isArchived = false
  let visitCount = 1
  let createdAt = new Date().toISOString()
  let lastVisited = new Date().toISOString()
  let newobject = {
    title,
    description,
    url,
    tags,
    favicon,
    pinned,
    isArchived,
    visitCount,
    createdAt,
    lastVisited
  }

  let index = datas.findIndex((stm) => stm.id == id)
  if (index !== -1) {
    datas[index] = newobject
  }
}
// bfsf function for add
const bfsf = (e) => {
  e.preventDefault()
  let frm = qs('#bigdiolog').querySelector('form')
  let title = frm.querySelector('#title').value
  let description = frm.querySelector('#Description').value
  let url = frm.querySelector('#WebsiteURL').value
  let tags = frm.querySelector('#Tags').value.split(',')
  let favicon = frm.querySelector('#favicon').value
  let pinned = true
  let isArchived = false
  let visitCount = 1
  let createdAt = new Date().toISOString()
  let lastVisited = new Date().toISOString()
  let lastItem = datas[datas.length - 1]
  let id = lastItem.id.slice(0, -1) + (parseInt(lastItem.id.slice(-1)) + 1)

  let newobject = {
    id,
    title,
    description,
    url,
    tags,
    favicon,
    pinned,
    isArchived,
    visitCount,
    createdAt,
    lastVisited
  }
  datas.push(newobject)
}
// edit bookmark

export const editbookmarkevent = (e, id) => {
  e.stopPropagation()
  let pbd = { ...datas.find((i) => i.id == id) }
  console.log('clicked add bookmark')
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = comeditbookmark(pbd)
  qs('#bigdiolog').querySelector('#Description').oninput = () => {
    qs('#bigdiolog').querySelector('#Description').value =
      qs('#bigdiolog').querySelector('#Description').value.length > 280
        ? qs('#bigdiolog').querySelector('#Description').value.slice(0, 280)
        : qs('#bigdiolog').querySelector('#Description').value
    qs('#bigdiolog').querySelector('#countc').textContent =
      qs('#bigdiolog').querySelector('#Description').value.length
  }
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Edit Bookmark'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    qs('#bigdiolog').querySelector('form').requestSubmit()
  }
  qs('#bigdiolog').querySelector('form').onsubmit = (e) => {
    bfsfe(e, id)
    bdcf()
    rerender()
  }
}

// add bookmark

export const addbookmarkevent = (e) => {
  e.stopPropagation()
  console.log('clicked add bookmark')
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = comaddbookmark()
  qs('#bigdiolog').querySelector('#Description').oninput = () => {
    qs('#bigdiolog').querySelector('#Description').value =
      qs('#bigdiolog').querySelector('#Description').value.length > 280
        ? qs('#bigdiolog').querySelector('#Description').value.slice(0, 280)
        : qs('#bigdiolog').querySelector('#Description').value
    qs('#bigdiolog').querySelector('#countc').textContent =
      qs('#bigdiolog').querySelector('#Description').value.length
  }
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Add Bookmark'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    qs('#bigdiolog').querySelector('form').requestSubmit()
  }
  qs('#bigdiolog').querySelector('form').onsubmit = (e) => {
    bfsf(e)
    bdcf()
    rerender()
  }
}

// archiveevent

export const archiveevent = (e, id) => {
  e.stopPropagation()
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = comarchivebookmark()
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Archive'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    console.log({ ...datas[datas.findIndex((i) => i.id == id)] })
    let item = datas.find((i) => i.id == id)
    item.isArchived = true
    console.log(item)
    bdcf()
    archivecount()
    rerender()
  }
}
// unarchive event listener function
export const unarchiveevent = (e, id) => {
  e.stopPropagation()
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = comunarchivebookmark()
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'UnArchive'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    console.log({ ...datas[datas.findIndex((i) => i.id == id)] })
    let item = datas.find((i) => i.id == id)
    item.isArchived = false
    console.log(item)
    bdcf()
    archivecount()
    rerender()
  }
}
// visitevent
export const visitevent = (id) => {
  let item = datas.find((i) => i.id == id)
  item.visitCount = item.visitCount + 1
  item.lastVisited = new Date().toISOString()
  rerender()
}
export const pinevent = (e, id) => {
  e.stopPropagation()
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = compined()
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Pin'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    console.log({ ...datas[datas.findIndex((i) => i.id == id)] })
    let item = datas.find((i) => i.id == id)
    item.pinned = true
    console.log(item)
    bdcf()
    rerender()
  }
}

export const unpinevent = (e, id) => {
  e.stopPropagation()
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = comunpined()
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Unpin'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    console.log({ ...datas[datas.findIndex((i) => i.id == id)] })
    let item = datas.find((i) => i.id == id)
    item.pinned = false
    console.log(item)
    bdcf()
    rerender()
  }
}
export const deleteevent = (e, id) => {
  e.stopPropagation()
  if (qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.remove('hidden')
  }
  if (qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.remove('hidden')
  }
  qs('#diolog-content').innerHTML = deletebookmark()
  qs('#bigdiolog').querySelector('#bigdiologsubmit').textContent = 'Delete'
  qs('#bigdiolog').querySelector('#bigdiologsubmit').classList.add('bg-red-400', 'text-white')
  qs('#bigdiolog').querySelector('#bigdiologsubmit').onclick = () => {
    console.log({ ...datas })
    let index = datas.findIndex((e) => e.id == id)
    datas.splice(index, 1)
    console.log(datas)
    bdcf()
    rerender()
  }
}

// loginformevent

export const loginformevent = (e) => {
  e.preventDefault()
  e.stopPropagation()
  let email = qs('#loginform').querySelector('#email').value
  let password = qs('#loginform').querySelector('#password').value
  if (!users.some((el) => el.email === email)) {
    alert('You are not our member please try with different email')
    return
  }
  let account = { ...users.find((el) => el.email === email) }
  if (account.password != password) {
    alert('Sorry you enter incorrect password try again')
    return
  }
  alert('✅You are successfully log in redirecting...')
  localStorage.setItem('islogin', true)
  setTimeout(() => {
    qs('#logindiv').classList.add('hidden')
  }, 2200)
}

export const archivecount = () => {
  qs('#archivecount').textContent = archshowabledata().length
}
