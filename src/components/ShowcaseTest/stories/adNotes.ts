/** What is happening at each step of the ad, shown as the big caption. Order = caption number. */
export const AD_NOTES = {
  start: 'Start in Brands & Campaigns. Press Add to set up your brand.',
  web: 'Type your website address.',
  scan: 'Press Scan. AdRender reads your whole site.',
  fill: 'Your name, voice, colors and logo fill in on their own.',
  products: 'Your products come in too, ready for every ad.',
  open: 'Open the cockpit. Every ad starts here.',
  video: 'Choose Video to remix winning video ads.',
  browse: 'Browse winning ads from brands running them right now.',
  use: 'Press Use on the ones you like. They go into the cockpit.',
  brand: 'Choose your brand. Its logo, colors and products load in for you.',
  render: 'Press Render. Your video ads start making.',
  image: 'Switch to Image and add image ads the same way.',
  sizes: 'Pick your sizes. You get a version in each one.',
  renderImage: 'Render. Video and image ads make at the same time.',
  library: 'When they are ready, open your Library.',
  libVideo: 'Your video ads are here too.',
} as const

export type NoteKey = keyof typeof AD_NOTES
export const AD_NOTE_LIST: readonly string[] = Object.values(AD_NOTES)
export const noteIndex = (key: NoteKey) => (Object.keys(AD_NOTES) as NoteKey[]).indexOf(key) + 1
