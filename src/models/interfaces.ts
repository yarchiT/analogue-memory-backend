// Memory Item structure
export interface MemoryItem {
  id: string
  name: string
  description: string
  category: string
  decade: string // e.g., "1990s"
  year?: number
  imageUrl: string
  popularity: number // 1-100 scale
  tags: string[]
}

// User Profile structure
export interface UserProfile {
  id: string
  username: string
  email: string
  birthYear: number
  location: {
    country: string
    region?: string
  }
  joinDate: string
  collection: {
    itemId: string
    dateAdded: string
    personalNote?: string
  }[]
  following: string[] // user IDs
  followers: string[] // user IDs
}

// Authentication response structure
export interface AuthResponse {
  token: string
  user: UserProfile
}

// Category structure
export interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
} 