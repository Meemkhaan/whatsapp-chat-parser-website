/**
 * Centralized UI strings for easier editing and future i18n.
 */
export const t = {
  // App & header
  downloadExample: 'Download example chat',
  or: 'OR',
  skipToMessages: 'Skip to messages',

  // Dropzone
  dropzoneLabel:
    'Click here to upload a file or drag and drop it onto the dashed region',
  dropzoneFormats: 'supported formats:',
  txt: 'txt',
  zip: 'zip',

  // Sidebar
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  closeMenuAria: 'Close menu (press Escape)',

  // Who are you
  whoAreYou: 'Who are you?',
  whoAreYouTitle: 'Select your name so your messages appear on the right',
  chooseYourName: 'Choose your name…',
  loadChatFirst: 'Load a chat first',
  yourMessagesHint: 'Your messages will show on the right; others on the left.',

  // Filter
  filterBy: 'Filter by',
  index: 'Index',
  date: 'Date',
  messagesLimit: 'Messages limit',
  start: 'Start',
  end: 'End',
  apply: 'Apply',
  messagesLimitCaution:
    'A high delta may freeze the page for a while, change this with caution',
  messagesDateWindow: 'Messages date window',
  dateRangeCaution: 'A high delta may freeze the page for a while, change this with caution',

  // Search Messages (WhatsApp-style)
  searchMessagesTitle: 'Search Messages',
  searchPlaceholder: 'Search by author or text…',
  searchLabel: 'Search',
  jumpToDate: 'Jump to date',
  pickDatePlaceholder: 'Pick a date',

  // Actions
  clearFilters: 'Clear filters',
  exportVisible: 'Export visible messages',

  // Anonymize
  anonymizeUsers: 'Anonymize users',

  // Message viewer
  showingAll: (n: number) => `Showing all ${n} messages`,
  showingRange: (low: number, high: number, total: number) =>
    `Showing messages ${low} to ${high} (${high - low + 1} out of ${total})`,
  showingDateRange: (start: string, end: string) =>
    `Showing messages from ${start} to ${end}`,
  showingSearch: (n: number, query: string) =>
    `${n} messages matching "${query}"`,

  // Credits
  madeBy: 'Made by',
  sourceCode: 'Source code',

  // Scroll
  scrollToTop: 'Scroll to top',

  // Attachment
  loadingAttachment: (name: string) => `Loading ${name}...`,
  chatImage: 'Chat image',
  chatVideo: 'Chat video',
  chatAudio: 'Chat audio',
  closeMediaViewer: 'Close (Escape)',
} as const;
