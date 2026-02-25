/**
 * Quiz/Challenge Mode
 * Test your knowledge about countries
 */

export type QuestionType = 'capital' | 'population' | 'flag' | 'location' | 'currency' | 'landmark'

export interface Question {
  id: string
  type: QuestionType
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timeLimit?: number // seconds
}

export interface QuizSession {
  questions: Question[]
  currentIndex: number
  answers: Map<string, string> // questionId -> answer
  score: number
  startTime: number
  endTime?: number
  completed: boolean
}

export interface QuizResult {
  score: number
  total: number
  percentage: number
  correct: number
  wrong: number
  timeTaken: number
  rank?: string
}

export interface Country {
  name: string
  code: string
  capital: string
  population: number
  region: string
  currency?: string
  flag?: string
}

export class QuizSystem {
  private difficulties = {
    easy: { points: 10, timeLimit: 30 },
    medium: { points: 20, timeLimit: 20 },
    hard: { points: 30, timeLimit: 15 }
  }

  /**
   * Generate quiz questions from countries
   */
  generateQuestions(countries: Country[], count: number = 10): Question[] {
    const questions: Question[] = []
    const types: QuestionType[] = ['capital', 'population', 'flag', 'location', 'currency', 'landmark']

    for (let i = 0; i < count; i++) {
      const type = types[i % types.length]
      const difficulty = this.getRandomDifficulty()
      const country = this.getRandomCountry(countries)

      questions.push(this.createQuestion(type, country, countries, difficulty))
    }

    return questions
  }

  /**
   * Create a specific type of question
   */
  private createQuestion(
    type: QuestionType,
    country: Country,
    allCountries: Country[],
    difficulty: 'easy' | 'medium' | 'hard'
  ): Question {
    const { points, timeLimit } = this.difficulties[difficulty]

    switch (type) {
      case 'capital':
        return {
          id: this.generateId(),
          type,
          question: `What is the capital of ${country.name}?`,
          options: this.generateOptions(country.capital, allCountries.map(c => c.capital)),
          correctAnswer: country.capital,
          explanation: `${country.capital} is the capital of ${country.name}.`,
          difficulty,
          points,
          timeLimit
        }

      case 'population':
        return {
          id: this.generateId(),
          type,
          question: `Which country has a population of approximately ${this.formatNumber(country.population)}?`,
          options: this.generateCountryOptions(country, allCountries, 4),
          correctAnswer: country.name,
          explanation: `${country.name} has a population of ${this.formatNumber(country.population)}.`,
          difficulty,
          points,
          timeLimit
        }

      case 'flag':
        return {
          id: this.generateId(),
          type,
          question: country.flag ? `Which country does this flag belong to? ${country.flag}` : `What is the flag of ${country.name}?`,
          options: this.generateCountryOptions(country, allCountries, 4),
          correctAnswer: country.name,
          explanation: `This is the flag of ${country.name}.`,
          difficulty,
          points,
          timeLimit
        }

      case 'location':
        return {
          id: this.generateId(),
          type,
          question: `In which region is ${country.name} located?`,
          options: this.generateRegionOptions(country.region),
          correctAnswer: country.region,
          explanation: `${country.name} is located in ${country.region}.`,
          difficulty,
          points,
          timeLimit
        }

      case 'currency':
        return {
          id: this.generateId(),
          type,
          question: `What is the currency of ${country.name}?`,
          options: this.generateCurrencyOptions(country.currency || 'USD', allCountries),
          correctAnswer: country.currency || 'USD',
          explanation: `${country.name} uses the ${country.currency || 'USD'}.`,
          difficulty,
          points,
          timeLimit
        }

      case 'landmark':
        return {
          id: this.generateId(),
          type,
          question: `Which famous landmark is located in ${country.name}?`,
          options: this.generateLandmarkOptions(country),
          correctAnswer: this.getLandmark(country) || 'Famous Monument',
          explanation: `${this.getLandmark(country)} is located in ${country.name}.`,
          difficulty,
          points,
          timeLimit
        }

      default:
        throw new Error(`Unknown question type: ${type}`)
    }
  }

  /**
   * Start a new quiz session
   */
  startQuiz(questions: Question[]): QuizSession {
    return {
      questions,
      currentIndex: 0,
      answers: new Map(),
      score: 0,
      startTime: Date.now(),
      completed: false
    }
  }

  /**
   * Submit an answer
   */
  submitAnswer(session: QuizSession, questionId: string, answer: string): QuizSession {
    const question = session.questions.find(q => q.id === questionId)
    if (!question) return session

    session.answers.set(questionId, answer)

    if (answer === question.correctAnswer) {
      session.score += question.points
    }

    // Move to next question
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex++
    } else {
      session.completed = true
      session.endTime = Date.now()
    }

    return session
  }

  /**
   * Calculate quiz results
   */
  calculateResults(session: QuizSession): QuizResult {
    const total = session.questions.reduce((sum, q) => sum + q.points, 0)
    const correct = Array.from(session.answers.values()).filter((answer, index) => {
      const question = session.questions[index]
      return answer === question.correctAnswer
    }).length

    return {
      score: session.score,
      total,
      percentage: Math.round((session.score / total) * 100),
      correct,
      wrong: session.questions.length - correct,
      timeTaken: Math.round((session.endTime || Date.now() - session.startTime) / 1000),
      rank: this.getRank(session.score, total)
    }
  }

  /**
   * Get rank based on score
   */
  private getRank(score: number, total: number): string {
    const percentage = (score / total) * 100

    if (percentage >= 90) return 'Geography Genius 🏆'
    if (percentage >= 75) return 'World Explorer 🌍'
    if (percentage >= 60) return 'Globe Trotter ✈️'
    if (percentage >= 40) return 'Traveler 🗺️'
    return 'Tourist 🧳'
  }

  /**
   * Generate options for multiple choice
   */
  private generateOptions(correct: string, allOptions: string[]): string[] {
    const options = [correct]
    const available = allOptions.filter(o => o !== correct)

    while (options.length < 4 && available.length > 0) {
      const index = Math.floor(Math.random() * available.length)
      options.push(available.splice(index, 1)[0])
    }

    return this.shuffle(options)
  }

  private generateCountryOptions(country: Country, allCountries: Country[], count: number): string[] {
    const options = [country.name]
    const available = allCountries.filter(c => c.code !== country.code)

    while (options.length < count && available.length > 0) {
      const index = Math.floor(Math.random() * available.length)
      options.push(available.splice(index, 1)[0].name)
    }

    return this.shuffle(options)
  }

  private generateRegionOptions(correct: string): string[] {
    const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania']
    return this.shuffle([...regions])
  }

  private generateCurrencyOptions(correct: string, allCountries: Country[]): string[] {
    const currencies = [...new Set(allCountries.map(c => c.currency || 'USD'))].filter(c => c)
    return this.generateOptions(correct, currencies.slice(0, 10))
  }

  private generateLandmarkOptions(country: Country): string[] {
    const landmarks = ['Eiffel Tower', 'Statue of Liberty', 'Great Wall', 'Taj Mahal', 'Colosseum', 'Machu Picchu']
    const correct = this.getLandmark(country)
    return this.shuffle([...landmarks, correct || 'Famous Monument'].slice(0, 4))
  }

  private getLandmark(country: Country): string | null {
    const landmarks: Record<string, string> = {
      'France': 'Eiffel Tower',
      'USA': 'Statue of Liberty',
      'China': 'Great Wall',
      'India': 'Taj Mahal',
      'Italy': 'Colosseum',
      'Peru': 'Machu Picchu',
      'Egypt': 'Pyramids',
      'Brazil': 'Christ the Redeemer',
      'UK': 'Big Ben',
      'Japan': 'Mount Fuji'
    }
    return landmarks[country.name] || null
  }

  private getRandomCountry(countries: Country[]): Country {
    return countries[Math.floor(Math.random() * countries.length)]
  }

  private getRandomDifficulty(): 'easy' | 'medium' | 'hard' {
    const rand = Math.random()
    if (rand < 0.4) return 'easy'
    if (rand < 0.75) return 'medium'
    return 'hard'
  }

  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  private formatNumber(num: number): string {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' billion'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' million'
    return num.toString()
  }

  private generateId(): string {
    return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get leaderboard (mock implementation)
   */
  getLeaderboard(): Array<{ name: string; score: number }> {
    return [
      { name: 'Geography Master', score: 280 },
      { name: 'World Traveler', score: 250 },
      { name: 'Map Enthusiast', score: 220 },
      { name: 'Globe Surfer', score: 190 },
      { name: 'Country Explorer', score: 160 }
    ]
  }
}

// Singleton instance
let quizInstance: QuizSystem | null = null

export function getQuizSystem(): QuizSystem {
  if (!quizInstance) {
    quizInstance = new QuizSystem()
  }
  return quizInstance
}

/**
 * Hook for using quiz system in React components
 */
export function useQuiz() {
  const system = getQuizSystem()

  return {
    generateQuestions: system.generateQuestions.bind(system),
    startQuiz: system.startQuiz.bind(system),
    submitAnswer: system.submitAnswer.bind(system),
    calculateResults: system.calculateResults.bind(system),
    getLeaderboard: system.getLeaderboard.bind(system)
  }
}
