import fs from 'fs'
import path from 'path'
import { MemoryItem, UserProfile, Category } from '../models/interfaces'
import logger from '../utils/logger'

class MockDataService {
  private categories: Category[] = []
  private videoGames: MemoryItem[] = []
  private toys: MemoryItem[] = []
  private users: UserProfile[] = []
  private allItems: MemoryItem[] = []

  constructor() {
    this.loadMockData()
  }

  private loadMockData(): void {
    try {
      // Load categories
      const categoriesPath = path.join(__dirname, '../data/mock/categories.json')
      this.categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
      
      // Load video games
      const videoGamesPath = path.join(__dirname, '../data/mock/video-games.json')
      this.videoGames = JSON.parse(fs.readFileSync(videoGamesPath, 'utf-8'))
      
      // Load toys
      const toysPath = path.join(__dirname, '../data/mock/toys.json')
      this.toys = JSON.parse(fs.readFileSync(toysPath, 'utf-8'))
      
      // Load users
      const usersPath = path.join(__dirname, '../data/mock/users.json')
      this.users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
      
      // Combine all items
      this.allItems = [...this.videoGames, ...this.toys]
      
      logger.info('Mock data loaded successfully')
    } catch (error) {
      logger.error('Error loading mock data:', error)
      throw new Error('Failed to load mock data')
    }
  }

  // Get all categories
  getCategories(): Category[] {
    return this.categories
  }

  // Get a category by ID
  getCategoryById(id: string): Category | undefined {
    return this.categories.find(category => category.id === id)
  }

  // Get all memory items
  getAllItems(): MemoryItem[] {
    return this.allItems
  }

  // Get all memory items with pagination and sorting
  getAllItemsPaginated(page: number, limit: number, sort: string): { items: MemoryItem[], total: number } {
    // Sort items
    const sortedItems = this.sortItems(this.allItems, sort)
    
    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedItems = sortedItems.slice(startIndex, endIndex)
    
    return {
      items: paginatedItems,
      total: this.allItems.length,
    }
  }

  // Get items by category ID
  getItemsByCategory(categoryId: string): MemoryItem[] {
    return this.allItems.filter(item => item.category === categoryId)
  }

  // Get items by category ID with pagination and sorting
  getItemsByCategoryPaginated(categoryId: string, page: number, limit: number, sort: string): { items: MemoryItem[], total: number } {
    // Filter items by category
    const categoryItems = this.allItems.filter(item => item.category === categoryId)
    
    // Sort items
    const sortedItems = this.sortItems(categoryItems, sort)
    
    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedItems = sortedItems.slice(startIndex, endIndex)
    
    return {
      items: paginatedItems,
      total: categoryItems.length,
    }
  }

  // Get an item by ID
  getItemById(id: string): MemoryItem | undefined {
    return this.allItems.find(item => item.id === id)
  }

  // Search items by query string (name or description)
  searchItems(query: string): MemoryItem[] {
    const lowerCaseQuery = query.toLowerCase()
    return this.allItems.filter(
      item => 
        item.name.toLowerCase().includes(lowerCaseQuery) || 
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    )
  }

  // Get all users
  getUsers(): UserProfile[] {
    return this.users
  }

  // Get a user by ID
  getUserById(id: string): UserProfile | undefined {
    return this.users.find(user => user.id === id)
  }

  // Get a user by username
  getUserByUsername(username: string): UserProfile | undefined {
    return this.users.find(user => user.username === username)
  }

  // Mock authentication (just returns a user for demo purposes)
  authenticate(email: string, password: string): UserProfile | null {
    // In a real app, we would verify the password
    const user = this.users.find(user => user.email === email)
    return user || null
  }

  // Helper method to sort items
  private sortItems(items: MemoryItem[], sort: string): MemoryItem[] {
    const isDesc = sort.startsWith('-')
    const sortField = isDesc ? sort.substring(1) : sort
    
    return [...items].sort((a, b) => {
      let comparison = 0
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'popularity':
          comparison = a.popularity - b.popularity
          break
        case 'year':
          comparison = (a.year || 0) - (b.year || 0)
          break
        default:
          comparison = a.name.localeCompare(b.name)
      }
      
      return isDesc ? -comparison : comparison
    })
  }
}

// Create a singleton instance
const mockDataService = new MockDataService()

export default mockDataService 