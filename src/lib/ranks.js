export const rankColors = {
  Bronze: '#D85A30',
  Silver: '#888780',
  Gold: '#EF9F27',
  Platinum: '#378ADD',
  Diamond: '#1D9E75',
  Elite: '#7F77DD',
  Mythic: '#FF4ECD',
}

export const rankThresholds = [
  { name: 'Bronze I',     min: 0,  max: 9  },
  { name: 'Bronze II',    min: 10, max: 19 },
  { name: 'Bronze III',   min: 20, max: 29 },
  { name: 'Silver I',     min: 30, max: 39 },
  { name: 'Silver II',    min: 40, max: 49 },
  { name: 'Silver III',   min: 50, max: 59 },
  { name: 'Gold I',       min: 60, max: 64 },
  { name: 'Gold II',      min: 65, max: 69 },
  { name: 'Gold III',     min: 70, max: 73 },
  { name: 'Platinum I',   min: 74, max: 77 },
  { name: 'Platinum II',  min: 78, max: 81 },
  { name: 'Platinum III', min: 82, max: 84 },
  { name: 'Diamond I',    min: 85, max: 87 },
  { name: 'Diamond II',   min: 88, max: 90 },
  { name: 'Diamond III',  min: 91, max: 93 },
  { name: 'Elite I',      min: 94, max: 95 },
  { name: 'Elite II',     min: 96, max: 97 },
  { name: 'Elite III',    min: 98, max: 98 },
  { name: 'Mythic',       min: 99, max: 100 },
]

const badgeModules = import.meta.glob('../assets/ranks/*.png', { eager: true })

export function getRankBadge(rankName) {
  const key = rankName.toLowerCase().replace(' ', '-')
  const path = `../assets/ranks/${key}.png`
  const mod = badgeModules[path]
  return mod ? mod.default : null
}

export function getRankColor(rankName) {
  const tier = rankName.split(' ')[0]
  return rankColors[tier] || '#888780'
}

export function getRankFromScore(score) {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (score >= rankThresholds[i].min) return rankThresholds[i].name
  }
  return 'Bronze I'
}

export function getNextRank(rankName) {
  const index = rankThresholds.findIndex(r => r.name === rankName)
  if (index === -1 || index === rankThresholds.length - 1) return null
  return rankThresholds[index + 1].name
}

export function getProgressToNextRank(score, rankName) {
  const index = rankThresholds.findIndex(r => r.name === rankName)
  const current = rankThresholds[index]
  const next = rankThresholds[index + 1]
  if (!current || !next) return 100
  return Math.round(((score - current.min) / (next.min - current.min)) * 100)
}