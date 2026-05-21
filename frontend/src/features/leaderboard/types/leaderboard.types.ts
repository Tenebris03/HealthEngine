export interface LeaderboardUser {
  rank: number
  username: string
  avatar: string
  points: number
  streakDays: number
  isCurrentUser: boolean
}

export type LeaderboardFilter = 'weekly' | 'all-time'

export interface LeaderboardData {
  weekly: LeaderboardUser[]
  allTime: LeaderboardUser[]
}
