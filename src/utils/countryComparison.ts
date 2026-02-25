/**
 * Country Comparison Tool
 * Compare multiple countries side by side
 */

export interface CountryComparison {
  country: string
  code: string
  population: number
  gdp: number
  area: number
  density: number
  growthRate: number
}

export interface ComparisonMetric {
  id: string
  name: string
  unit: string
  calculate: (data: CountryComparison) => number
  format: (value: number) => string
  higherIsBetter: boolean
}

export class CountryComparisonTool {
  private metrics: ComparisonMetric[] = [
    {
      id: 'population',
      name: 'Population',
      unit: 'people',
      calculate: (data) => data.population,
      format: (value) => this.formatNumber(value),
      higherIsBetter: false // Depends on perspective
    },
    {
      id: 'gdp',
      name: 'GDP',
      unit: 'USD',
      calculate: (data) => data.gdp,
      format: (value) => '$' + this.formatNumber(value),
      higherIsBetter: true
    },
    {
      id: 'gdp_per_capita',
      name: 'GDP per Capita',
      unit: 'USD',
      calculate: (data) => data.gdp / data.population,
      format: (value) => '$' + this.formatNumber(Math.round(value)),
      higherIsBetter: true
    },
    {
      id: 'area',
      name: 'Land Area',
      unit: 'km²',
      calculate: (data) => data.area,
      format: (value) => this.formatNumber(value) + ' km²',
      higherIsBetter: false
    },
    {
      id: 'density',
      name: 'Population Density',
      unit: 'people/km²',
      calculate: (data) => data.density,
      format: (value) => this.formatNumber(Math.round(value)) + '/km²',
      higherIsBetter: false
    },
    {
      id: 'growth_rate',
      name: 'Growth Rate',
      unit: '%',
      calculate: (data) => data.growthRate,
      format: (value) => value.toFixed(2) + '%',
      higherIsBetter: true
    }
  ]

  /**
   * Compare countries and generate rankings
   */
  compareCountries(countries: CountryComparison[]): Map<string, Map<string, { value: number; rank: number; formatted: string }>> {
    const results = new Map<string, Map<string, any>>()

    // Initialize results map
    countries.forEach(country => {
      results.set(country.code, new Map())
    })

    // Calculate values and ranks for each metric
    this.metrics.forEach(metric => {
      const values = countries.map(country => ({
        code: country.code,
        value: metric.calculate(country)
      }))

      // Sort by value (descending if higher is better)
      values.sort((a, b) => metric.higherIsBetter ? b.value - a.value : a.value - b.value)

      // Assign ranks
      values.forEach((item, index) => {
        const countryResults = results.get(item.code)!
        countryResults.set(metric.id, {
          value: item.value,
          rank: index + 1,
          formatted: metric.format(item.value)
        })
      })
    })

    return results
  }

  /**
   * Get the winner for a specific metric
   */
  getWinner(countries: CountryComparison[], metricId: string): CountryComparison | null {
    const metric = this.metrics.find(m => m.id === metricId)
    if (!metric) return null

    return countries.reduce((winner, country) => {
      const winnerValue = winner ? metric.calculate(winner) : -Infinity
      const countryValue = metric.calculate(country)

      if (metric.higherIsBetter) {
        return countryValue > winnerValue ? country : winner
      } else {
        return countryValue < winnerValue ? country : winner
      }
    }, null as CountryComparison | null)
  }

  /**
   * Get percentage difference between two countries
   */
  getPercentageDifference(
    country1: CountryComparison,
    country2: CountryComparison,
    metricId: string
  ): number {
    const metric = this.metrics.find(m => m.id === metricId)
    if (!metric) return 0

    const value1 = metric.calculate(country1)
    const value2 = metric.calculate(country2)

    if (value2 === 0) return 0
    return ((value1 - value2) / value2) * 100
  }

  /**
   * Generate comparison summary
   */
  generateSummary(countries: CountryComparison[]): string {
    if (countries.length < 2) {
      return 'Add at least 2 countries to compare'
    }

    const summaries: string[] = []

    this.metrics.forEach(metric => {
      const winner = this.getWinner(countries, metric.id)
      if (winner) {
        const winnerValue = metric.calculate(winner)
        summaries.push(
          `${winner.country} has the ${metric.higherIsBetter ? 'highest' : 'lowest'} ${metric.name} (${metric.format(winnerValue)})`
        )
      }
    })

    return summaries.join('\n')
  }

  /**
   * Get comparison chart data
   */
  getChartData(countries: CountryComparison[], metricId: string) {
    const metric = this.metrics.find(m => m.id === metricId)
    if (!metric) return []

    return countries.map(country => ({
      country: country.country,
      value: metric.calculate(country),
      formatted: metric.format(metric.calculate(country))
    }))
  }

  /**
   * Get all available metrics
   */
  getMetrics(): ComparisonMetric[] {
    return [...this.metrics]
  }

  /**
   * Add custom metric
   */
  addCustomMetric(metric: ComparisonMetric): void {
    this.metrics.push(metric)
  }

  /**
   * Calculate similarity score between countries
   */
  calculateSimilarity(country1: CountryComparison, country2: CountryComparison): number {
    let totalDifference = 0
    let validMetrics = 0

    this.metrics.forEach(metric => {
      const value1 = metric.calculate(country1)
      const value2 = metric.calculate(country2)

      if (value1 > 0 && value2 > 0) {
        const diff = Math.abs(value1 - value2) / Math.max(value1, value2)
        totalDifference += diff
        validMetrics++
      }
    })

    if (validMetrics === 0) return 0

    // Return similarity percentage (100 - average difference)
    return Math.max(0, 100 - (totalDifference / validMetrics) * 100)
  }

  /**
   * Find most similar country
   */
  findMostSimilar(target: CountryComparison, candidates: CountryComparison[]): CountryComparison | null {
    if (candidates.length === 0) return null

    return candidates.reduce((mostSimilar, candidate) => {
      const currentSimilarity = this.calculateSimilarity(target, candidate)
      const bestSimilarity = mostSimilar ? this.calculateSimilarity(target, mostSimilar) : -1

      return currentSimilarity > bestSimilarity ? candidate : mostSimilar
    }, null as CountryComparison | null)
  }

  /**
   * Format large numbers with K, M, B suffixes
   */
  private formatNumber(num: number): string {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B'
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M'
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K'
    }
    return Math.round(num).toString()
  }
}

// Singleton instance
let comparisonInstance: CountryComparisonTool | null = null

export function getCountryComparisonTool(): CountryComparisonTool {
  if (!comparisonInstance) {
    comparisonInstance = new CountryComparisonTool()
  }
  return comparisonInstance
}

/**
 * Hook for using comparison tool in React components
 */
export function useCountryComparison() {
  const tool = getCountryComparisonTool()

  return {
    compareCountries: tool.compareCountries.bind(tool),
    getWinner: tool.getWinner.bind(tool),
    getPercentageDifference: tool.getPercentageDifference.bind(tool),
    generateSummary: tool.generateSummary.bind(tool),
    getChartData: tool.getChartData.bind(tool),
    getMetrics: tool.getMetrics.bind(tool),
    addCustomMetric: tool.addCustomMetric.bind(tool),
    calculateSimilarity: tool.calculateSimilarity.bind(tool),
    findMostSimilar: tool.findMostSimilar.bind(tool)
  }
}
