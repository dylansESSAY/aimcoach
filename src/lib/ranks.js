import bronze1 from '../assets/ranks/bronze-1.png'
import bronze2 from '../assets/ranks/bronze-2.png'
import bronze3 from '../assets/ranks/bronze-3.png'
import silver1 from '../assets/ranks/silver-1.png'
import silver2 from '../assets/ranks/silver-2.png'
import silver3 from '../assets/ranks/silver-3.png'
import gold1 from '../assets/ranks/gold-1.png'
import gold2 from '../assets/ranks/gold-2.png'
import gold3 from '../assets/ranks/gold-3.png'
import platinum1 from '../assets/ranks/platinum-1.png'
import platinum2 from '../assets/ranks/platinum-2.png'
import platinum3 from '../assets/ranks/platinum-3.png'
import diamond1 from '../assets/ranks/diamond-1.png'
import diamond2 from '../assets/ranks/diamond-2.png'
import diamond3 from '../assets/ranks/diamond-3.png'
import elite1 from '../assets/ranks/elite-1.png'
import elite2 from '../assets/ranks/elite-2.png'
import elite3 from '../assets/ranks/elite-3.png'
import mythic from '../assets/ranks/mythic.png'

export const rankBadges = {
  'Bronze I': bronze1,
  'Bronze II': bronze2,
  'Bronze III': bronze3,
  'Silver I': silver1,
  'Silver II': silver2,
  'Silver III': silver3,
  'Gold I': gold1,
  'Gold II': gold2,
  'Gold III': gold3,
  'Platinum I': platinum1,
  'Platinum II': platinum2,
  'Platinum III': platinum3,
  'Diamond I': diamond1,
  'Diamond II': diamond2,
  'Diamond III': diamond3,
  'Elite I': elite1,
  'Elite II': elite2,
  'Elite III': elite3,
  'Mythic': mythic,
}

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

export function getRankFromScore(score) {
  for (let i = rankThresholds.length - 1; i >= 0; i--) {
    if (score >= rankThresholds[i].min) return rankThresholds[i].name
  }
  return 'Bronze I'
}

export function getRankColor(rankName) {
  const tier = rankName.split(' ')[0]
  return rankColors[tier] || '#888780'
}

export function getRankBadge(rankName) {
  return rankBadges[rankName] || null
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