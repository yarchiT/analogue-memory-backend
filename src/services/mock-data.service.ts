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

  // Get items by category ID
  getItemsByCategory(categoryId: string): MemoryItem[] {
    return this.allItems.filter(item => item.category === categoryId)
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
}

// Create a singleton instance
const mockDataService = new MockDataService()

export default mockDataService 