import { alltags, archshowabledata, showabledata } from './data'
import {
  addbookmarkevent,
  archivecount,
  archiveevent,
  deleteevent,
  editbookmarkevent,
  loginformevent,
  pinevent,
  unarchiveevent,
  unpinevent,
  visitevent
} from './eventfunc'
import { qs } from './utils'
export let isArchivedpage = false
let currenttags = []
const tagscontainer = document.getElementById('tags')
// tags import
let renderabletags = alltags()
let showdata = showabledata()
const sortshowdata = () => {
  if (sortbyvalue === 'mv') {
    showdata.sort((a, b) => {
      let avc = a.visitCount
      let bvc = b.visitCount

      return avc == bvc ? 0 : avc > bvc ? -1 : +1
    })
  } else if (sortbyvalue === 'ra') {
    showdata.sort((a, b) => {
      let ara = new Date(a.createdAt)
      let bra = new Date(b.createdAt)

      return ara == bra ? 0 : ara > bra ? -1 : +1
    })
  } else if (sortbyvalue === 'pin') {
    showdata.sort((a, b) => {
      let aip = a.pinned
      let bip = b.pinned

      return (aip && bip) || (!aip && !bip) ? 0 : aip && !bip ? -1 : +1
    })
  } else {
    showdata.sort((a, b) => {
      let arv = new Date(a.lastVisited)
      let brv = new Date(b.lastVisited)

      return arv == brv ? 0 : arv > brv ? -1 : +1
    })
  }
}
const smvcfta = (ct) => {
  if (ct.length > 0) {
    qs('#resulttitle').textContent = 'Bookmarks tagged:'
    qs('#resultfor').textContent = ct.join(',')
    qs('#resultfor').classList.add('text-[#014745]')
  } else {
    qs('#resulttitle').textContent = isArchivedpage ? 'Archived bookmarks' : 'All bookmarks'
    qs('#resultfor').textContent = ''
    qs('#resultfor').classList.remove('text-[#014745]')
  }
}
const updateShowdata = () => {
  smvcfta(currenttags)
  if (currenttags.length > 0) {
    showdata = !isArchivedpage
      ? showabledata().filter((dt) => dt.tags.some((tag) => currenttags.includes(tag)))
      : archshowabledata().filter((dt) => dt.tags.some((tag) => currenttags.includes(tag)))
  } else {
    showdata = !isArchivedpage ? showabledata() : archshowabledata()
  }
}
// rerender function

// diolog
const sortButton = document.querySelector('#sort')
const dialog = document.querySelector('#sortDialog')
let sortbyvalue = 'pin'

qs('#archivepage').onclick = () => {
  if (isArchivedpage) {
    return
  }
  isArchivedpage = true
  qs('#resulttitle').textContent = 'Archived bookmarks'
  rerender()
}
qs('#homepage').onclick = () => {
  if (!isArchivedpage) {
    return
  }
  isArchivedpage = false
  rerender()
}

dialog.querySelectorAll('div').forEach((el) => {
  el.onclick = () => {
    dialog.querySelectorAll('div').forEach((i) => {
      if (!i.querySelector('img').classList.contains('hidden')) {
        i.querySelector('img').classList.add('hidden')
      }
      if (i.classList.contains('bg-graybg')) {
        i.classList.remove('bg-graybg')
      }
    })
    dialog.classList.remove('flex')
    dialog.classList.add('hidden')
    el.classList.add('bg-graybg')
    el.querySelector('img').classList.remove('hidden')
    sortbyvalue = el.dataset.sort
    sortshowdata()
    rerender()
    console.log(sortbyvalue)
  }
})

sortButton.addEventListener('click', (e) => {
  e.stopPropagation()
  if (dialog.classList.contains('hidden')) {
    dialog.classList.remove('hidden')
    dialog.classList.add('flex')
  } else {
    dialog.classList.remove('flex')
    dialog.classList.add('hidden')
  }
})

const needrerender = {
  rendertags: () => {
    renderabletags.forEach((tag) => {
      let div = document.createElement('div')
      div.className = 'flex justify-between px-2'
      div.innerHTML = `
       <div class="flex items-center gap-1.5">
                <input type="checkbox" name="${tag}" id="${tag}" class="cursor-pointer"/>
                <p
                  class="text-[#4C5C59] active:outline-0 focus:outline-0 focus-visible:outline-0 focus:border-0 active:border-0 focus-visible:border-0"
                >
                  ${tag}
                </p>
              </div>
              <span
                class="bg-graybg size-[25px] rounded-full text-[#4D4D4D] flex justify-center items-center px-2 py-0.5 text-[12px] font-medium manrope"
              >
                ${showdata.filter((dt) => dt.tags.includes(tag)).length}
              </span>
      `
      const checkbox = div.querySelector('input')
      checkbox.addEventListener('click', () => {
        if (currenttags.some((l) => l == tag)) {
          currenttags = currenttags.filter((tg) => tg != tag)
        } else {
          currenttags = [...currenttags, tag]
        }
        updateShowdata()
        console.log(currenttags)
        rerender()
      })
      tagscontainer.appendChild(div)
    })
  },
  renderbookmark: () => {
    qs('#cardcontainer').innerHTML = ''
    showdata.forEach((dt, ind) => {
      let div = document.createElement('div')
      div.className =
        'card min-h-[240px] bg-white rounded-xl p-2.5 flex flex-col justify-between gap-2'
      div.innerHTML = `
       <!-- head section of card -->
              <div class="flex justify-between items-center gap-2 cardhead">
                <div class="flex items-center gap-2.5">
                  <img
                    src="${dt.favicon}"
                    alt="prontendmentor"
                    class="size-[44px] rounded-lg object-cover border-[1px] border-strk"
                  />
                  <div class="flex flex-col justify-between py-1">
                    <h3 class="text-xl font-bold manrope text-font1">${dt.title}</h3>
                    <p class="text-font2 font-medium text-xs">${dt.url
                      .split('.')
                      .slice(1)
                      .join('.')}</p>
                  </div>
                </div>
                <div class="relative z-20">
                  <button
                    class="bg-white hover:bg-graybg size-8 rounded-lg flex justify-center items-center border-[1px] border-strk ulpopcb relative z-10"
                  >
                    <img src="./assets/images/icon-menu-bookmark.svg" alt="menu" class="size-5" />
                  </button>
                  <!-- there dot -->
                  <ul
                    class="flex flex-col gap-4 p-3 rounded-lg bg-white dsdb min-w-[140px] sm:min-w-[170px] md:min-w-[200px] absolute top-full right-0 mt-3 ulpop hidden z-20"
                  >
                  <!-- visit list item -->
                    <li class="flex items-center gap-2.5 cursor-pointer" id="visit">
                      <img
                        src="./assets/images/icon-visit.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Visit</p>
                    </li>
                    <!-- copy url -->
                    <li class="flex items-center gap-2.5 cursor-pointer" id="copyurl">
                      <img
                        src="./assets/images/icon-copy.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Copy URL</p>
                    </li>
                    <!-- Unarchive -->
                     <li class="flex items-center gap-2.5 cursor-pointer ${
                       isArchivedpage ? '' : 'hidden'
                     }" id="Unarchive">
                      <img
                        src="./assets/images/icon-unarchive.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Unarchive</p>
                    </li>
                     <!-- Delete Permanently -->
                     <li class="flex items-center gap-2.5 cursor-pointer ${
                       isArchivedpage ? '' : 'hidden'
                     }" id="DeletePermanently">
                      <img
                        src="./assets/images/icon-delete.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Delete Permanently</p>
                    </li>
                    <!-- unpin -->
                    <li class="flex items-center gap-2.5 cursor-pointer ${
                      !isArchivedpage ? '' : 'hidden'
                    }" id="${dt.pinned ? 'unpin' : 'pin'}">
                      <img
                        src="${
                          !dt.pinned
                            ? './assets/images/icon-pin.svg'
                            : './assets/images/icon-unpin.svg'
                        }"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">${
                        dt.pinned ? 'Unpin' : 'Pin'
                      }</p>
                    </li>
                    <!-- edit list item -->
                     <li class="flex items-center gap-2.5 cursor-pointer ${
                       !isArchivedpage ? '' : 'hidden'
                     }" id="edit">
                      <img
                        src="./assets/images/icon-edit.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Edit</p>
                    </li>
                    <!-- archive list item -->
                     <li class="flex items-center gap-2.5 cursor-pointer ${
                       !isArchivedpage ? '' : 'hidden'
                     }" id="archive">
                      <img
                        src="./assets/images/icon-archive.svg"
                        alt="icon-visited"
                        class="size-5 object-cover"
                      />
                      <p class="manrope font-semibold text-sm text-font2">Archive</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="divider" class="h-[1px] bg-[#DDE9E7]"></div>
              <!-- middle part of card -->
              <div class="space-y-3">
                <!-- description -->
                <p class="manrope text-sm font-medium text-font2" id="description180">${
                  dt.description.length > 180
                    ? dt.description.slice(0, 181) + '...'
                    : dt.description
                }
                </p>
                <!-- tags -->
                <div class="flex items-center gap-2 tagsholder">

                </div>
              </div>
              <div id="dividerf" class="h-[1px] bg-[#DDE9E7] -mx-3"></div>
              <!-- downpart of card -->
              <div id="downofcard" class="flex justify-between items-center gap-2">
                <!-- seen and date -->
                <div class="flex items-center gap-3">
                  <!-- seen part -->
                  <div class="flex items-center gap-1">
                    <img
                      src="./assets/images/icon-visit-count.svg"
                      alt="icon eye"
                      class="size-5 block"
                    />
                    <p id="visited-count" class="manrope font-medium text-xs text-font2">${
                      dt.visitCount
                    }</p>
                  </div>
                  <!-- last visited part -->
                  <div class="flex items-center gap-1">
                    <img
                      src="./assets/images/icon-last-visited.svg"
                      alt="icon last visited"
                      class="size-5 block"
                    />
                    <p id="last-visited" class="manrope font-medium text-xs text-font2">${new Date(
                      dt.lastVisited
                    )
                      .toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short'
                      })
                      .replace(',', '')}</p>
                  </div>
                  <!-- creted part -->
                  <div class="flex items-center gap-1">
                    <img
                      src="./assets/images/icon-created.svg"
                      alt="icon created"
                      class="size-5 block"
                    />
                    <p id="created" class="manrope font-medium text-xs text-font2">${new Date(
                      dt.createdAt
                    )
                      .toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short'
                      })
                      .replace(',', '')}</p>
                  </div>
                </div>
                <!-- pin part -->
                <img
                  src="${
                    dt.pinned ? './assets/images/icon-pin.svg' : './assets/images/icon-unpin.svg'
                  }"
                  alt="pin icon"
                  class="size-5 block object-cover"
                />
              </div>
      `

      let ulpop = div.querySelector('.ulpop')
      // popup
      div.querySelector('.ulpopcb').onclick = () => {
        div.querySelector('.ulpop').classList.toggle('hidden')
      }

      // visit dynamic
      ulpop.querySelector('#visit').onclick = () => {
        ulpop.classList.add('hidden')
        visitevent(dt.id)
        window.open(dt.url, '_blank')
      }
      // copy dynamic
      ulpop.querySelector('#copyurl').onclick = () => {
        ulpop.classList.add('hidden')
        navigator.clipboard
          .writeText(dt.url)
          .then(() => alert('✅ successfully url copy in your clipboard'))
          .catch(() => alert('🚫 sorry fail to copy'))
      }
      // Unarchive li functionality
      ulpop.querySelector('#Unarchive').onclick = (e) => {
        ulpop.classList.add('hidden')
        unarchiveevent(e, dt.id)
      }
      // Delete Permanently li functionality
      ulpop.querySelector('#DeletePermanently').onclick = (e) => {
        ulpop.classList.add('hidden')
        deleteevent(e, dt.id)
      }

      // edit li functionality
      ulpop.querySelector('#edit').onclick = (e) => {
        ulpop.classList.add('hidden')
        editbookmarkevent(e, dt.id)
      }
      // archive functionality
      ulpop.querySelector('#archive').onclick = (e) => {
        ulpop.classList.add('hidden')
        archiveevent(e, dt.id)
      }
      // pin functionality
      if (ulpop.querySelector('#pin')) {
        ulpop.querySelector('#pin').onclick = (e) => {
          ulpop.classList.add('hidden')
          pinevent(e, dt.id)
        }
      } else {
        ulpop.querySelector('#unpin').onclick = (e) => {
          ulpop.classList.add('hidden')
          unpinevent(e, dt.id)
        }
      }
      // tags render
      dt.tags.forEach((tg) => {
        let tagp = document.createElement('p')
        tagp.className = 'manrope font-medium text-xs text-font2 bg-graybg p-1.5 rounded-sm'
        tagp.textContent = tg
        div.querySelector('.tagsholder').appendChild(tagp)
      })
      qs('#cardcontainer').appendChild(div)
    })
  }
}
export const rerender = () => {
  showdata = !isArchivedpage ? showabledata() : archshowabledata()
  updateShowdata()
  sortshowdata()
  if (isArchivedpage) {
    qs('#hactive').classList.add('hidden')
    qs('#aactive').classList.remove('hidden')
  } else {
    qs('#hactive').classList.remove('hidden')
    qs('#aactive').classList.add('hidden')
  }
  Object.values(needrerender).forEach((sfn) => sfn())
}

const handlesearch = (e) => {
  const searchValue = e.target.value.toLowerCase()
  if (searchValue) {
    qs('#resulttitle').textContent = 'Results for:'
    qs('#resultfor').textContent = '"' + e.target.value + '"'
    qs('#resultfor').classList.add('text-[#014745]')
  } else {
    qs('#resulttitle').textContent = isArchivedpage ? 'Archived bookmarks' : 'All bookmarks'
    qs('#resultfor').textContent = ''
    qs('#resultfor').classList.remove('text-[#014745]')
  }

  showdata = !isArchivedpage
    ? showabledata().filter((i) => i.title.toLowerCase().includes(searchValue))
    : archshowabledata().filter((i) => i.title.toLowerCase().includes(searchValue))
  needrerender['renderbookmark']()
}

qs('#search').addEventListener('input', handlesearch)

// hamberger interectivity

qs('#hammenu').onclick = (e) => {
  e.stopPropagation()
  if (qs('aside').classList.contains('absolute')) {
    if (qs('aside').classList.contains('left-0')) {
      qs('aside').classList.remove('left-0')
    } else {
      if (qs('#blur').classList.contains('fixed')) {
        qs('#blur').classList.remove('hidden')
      }
      qs('aside').classList.add('left-0')
    }
  }
}
// close button

qs('#close').onclick = () => {
  if (qs('aside').classList.contains('left-0')) {
    qs('aside').classList.remove('left-0')
  }
  if (qs('#blur').classList.contains('fixed')) {
    qs('#blur').classList.add('hidden')
  }
}

// AddBookmark interectivity
qs('#loginform').onsubmit = loginformevent
qs('#AddBookmark').onclick = addbookmarkevent
export const bdcf = (e) => {
  if (!qs('#blur').classList.contains('hidden')) {
    qs('#blur').classList.add('hidden')
  }
  if (!qs('#bigdiolog').classList.contains('hidden')) {
    qs('#bigdiolog').classList.add('hidden')
  }
  qs('#diolog-content').innerHTML = ''
}
qs('#bigdiologclose').onclick = bdcf
qs('#bigdiologcancel').onclick = bdcf

// problem in mobile devise blur bg just show and hide

//

const wcelf = (e) => {
  // aside functionality
  if (
    !qs('aside').contains(e.target) &&
    qs('aside').classList.contains('absolute') &&
    qs('aside').classList.contains('left-0')
  ) {
    if (qs('#blur').classList.contains('fixed') && !qs('#blur').classList.contains('hidden')) {
      qs('#blur').classList.add('hidden')
    }
    qs('aside').classList.remove('left-0')
  }
  // bigdiolog functionally

  if (
    !qs('#bigdiolog').contains(e.target) &&
    !qs('#AddBookmark').contains(e.target) &&
    !qs('#bigdiolog').classList.contains('hidden')
  ) {
    bdcf()
  }
}

// rerender

// at last always

window.addEventListener('click', wcelf)

document.addEventListener('DOMContentLoaded', () => {
  sortshowdata()
  rerender()
  archivecount()
  // active karbar
  if (isArchivedpage) {
    qs('#hactive').classList.add('hidden')
    qs('#aactive').classList.remove('hidden')
  } else {
    qs('#hactive').classList.remove('hidden')
    qs('#aactive').classList.add('hidden')
  }
  if (dialog.open) {
    dialog.close()
  }

  let islogin = localStorage.getItem('islogin') === 'true'
  console.log(islogin, typeof islogin)

  if (islogin) {
    qs('#logindiv').classList.add('hidden')
  }
})
