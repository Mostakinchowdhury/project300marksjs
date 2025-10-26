// add bookmark component

export const comaddbookmark = (dt = {}) => {
  return `<form action="" method="post">
          <h3 class="manrope font-bold text-2xl text-font1">Add a bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Save a link with details to keep your collection organized. We extract the favicon
            automatically from the URL.
          </p>
          <!-- title -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="title" class="manrope font-semibold text-sm text-font1">Title*</label>
            <input
              type="text"
              id="title"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5"
            />
          </div>
          <!-- description -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="Description" class="manrope font-semibold text-sm text-font1"
              >Description*</label
            >
            <textarea
              name="Description"
              id="Description"
              class="w-[300px] h-[80px] sm:w-[450px] sm:h-[92px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 resize-none"
            ></textarea>
            <p class="manrope font-medium text-xs text-font2 w-fit ml-auto">
              <span id="countc">0</span>/280
            </p>
          </div>
          <!-- website url -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="WebsiteURL" class="manrope font-semibold text-sm text-font1"
              >Website URL*</label
            >
            <input
              type="text"
              id="WebsiteURL"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5"
            />
          </div>
          <!-- tags -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="Tags" class="manrope font-semibold text-sm text-font1">Tags*</label>
            <input
              type="text"
              id="Tags"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 placeholder:manrope placeholder:font-medium placeholder:text-sm placeholder:text-font2"
              placeholder="e.g. Design, Learning, Tools"
            />
          </div>
          <!-- live favicon url -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="favicon" class="manrope font-semibold text-sm text-font1">Live logo url*</label>
            <input
              type="text"
              id="favicon"
              required
              value=""
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 placeholder:manrope placeholder:font-medium placeholder:text-sm placeholder:text-font2"
              placeholder="Enter a live logo url"
            />
          </div>
       </form>`
}

// edit bookmark component

export const comeditbookmark = (
  dt = {
    id: 'bm-018',
    title: 'Flexbox Zombies',
    url: 'https://www.mastery.games/flexboxzombies',
    favicon: './assets/images/favicon-flexbox-zombies.png',
    description:
      'Master flexbox layout in CSS by playing a survival game. Use flexbox to position your crossbow and survive the zombie apocalypse.',
    tags: ['CSS', 'Practice', 'Layout'],
    pinned: false,
    isArchived: true,
    visitCount: 6,
    createdAt: '2024-02-22T08:50:00Z',
    lastVisited: '2025-04-18T15:30:00Z'
  }
) => {
  return `
  <form action="" method="post">
  <h3 class="manrope font-bold text-2xl text-font1">Add a bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Save a link with details to keep your collection organized. We extract the favicon
            automatically from the URL.
          </p>
          <!-- title -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="title" class="manrope font-semibold text-sm text-font1">Title*</label>
            <input
              type="text"
              value="${dt.title}"
              required
              id="title"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5"
            />
          </div>
          <!-- description -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="Description" class="manrope font-semibold text-sm text-font1"
              >Description*</label
            >
            <textarea
              name="Description"
              id="Description"
              class="w-[300px] h-[80px] sm:w-[450px] sm:h-[92px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 resize-none"
              required
            >${dt.description}</textarea>
            <p class="manrope font-medium text-xs text-font2 w-fit ml-auto">
              <span id="countc">${dt.description.length}</span>/280
            </p>
          </div>
          <!-- website url -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="WebsiteURL" class="manrope font-semibold text-sm text-font1"
              >Website URL*</label
            >
            <input
              type="text"
              id="WebsiteURL"
              value="${dt.url}"
              required
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5"
            />
          </div>
          <!-- tags -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="Tags" class="manrope font-semibold text-sm text-font1">Tags*</label>
            <input
              type="text"
              id="Tags"
              required
              value="${dt.tags.join(',')}"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 placeholder:manrope placeholder:font-medium placeholder:text-sm placeholder:text-font2"
              placeholder="e.g. Design, Learning, Tools"
            />
          </div>
          <!-- live favicon url -->
          <div class="flex flex-col gap-1.5 my-2">
            <label for="favicon" class="manrope font-semibold text-sm text-font1">Live logo url*</label>
            <input
              type="text"
              id="favicon"
              required
              value="${dt.favicon}"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 placeholder:manrope placeholder:font-medium placeholder:text-sm placeholder:text-font2"
              placeholder="Enter a live logo url"
            />
          </div>

            <input
              type="hidden"
              id="hidden"
              required
              value="${dt.id}"
              class="w-[300px] h-[40px] sm:w-[450px] sm:h-[45px] lg:w-[506px] border-2 border-strk rounded-md px-4 py-1.5 placeholder:manrope placeholder:font-medium placeholder:text-sm placeholder:text-font2"

            />
        </div>
        </form>
        `
}

// Archive bookmark component

export const comarchivebookmark = () => {
  return `<h3 class="manrope font-bold text-2xl text-font1">Archive bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Are you sure you want to archive this bookmark?
          </p>`
}

// unarchive bookmarkcomponent section
export const comunarchivebookmark = () => {
  return `<h3 class="manrope font-bold text-2xl text-font1">Unarchive bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Move this bookmark back to your active list?
          </p>`
}

// delete bookmark

export const deletebookmark = () => {
  return `<h3 class="manrope font-bold text-2xl text-font1">Delete bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Are you sure you want to delete this bookmark?
          </p>`
}

// pined component  bookmark
export const compined = () => {
  return `<h3 class="manrope font-bold text-2xl text-font1">Pin bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Are you sure you want to pin this bookmark?
          </p>`
}
// unpined component  bookmark
export const comunpined = () => {
  return `<h3 class="manrope font-bold text-2xl text-font1">Unpin bookmark</h3>
          <p
            class="manrope font-medium text-sm text-font2 max-w-[300px] sm:max-w-[450px] lg:max-w-[506px]"
          >
            Are you sure you want to unpin this bookmark?
          </p>`
}
