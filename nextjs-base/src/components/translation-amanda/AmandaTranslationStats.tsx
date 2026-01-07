'use client'

import React from 'react'
import { CaseStudy, StrapiEntity } from '@/types/strapi'

type LanguagePair = {
  source: string
  target: string
  count: number
}

type AmandaTranslationStatsProps = {
  caseStudies: (CaseStudy & StrapiEntity)[]
}

/**
 * Composant affichant des statistiques sur les projets de traduction (Amanda)
 * Spécifique au domaine de la traduction : paires de langues, volumes, etc.
 */
export const AmandaTranslationStats = ({ caseStudies }: AmandaTranslationStatsProps) => {
  // Calcul des statistiques
  const stats = React.useMemo(() => {
    let totalWords = 0
    let totalProjects = caseStudies.length
    const languagePairs: Map<string, LanguagePair> = new Map()
    const domainCount: Map<string, number> = new Map()

    caseStudies.forEach((cs) => {
      // Comptage des mots
      if (cs.volume && cs.volume_unit === 'words') {
        totalWords += cs.volume
      }

      // Paires de langues
      if (cs.source_language && cs.target_language) {
        const key = `${cs.source_language}-${cs.target_language}`
        const existing = languagePairs.get(key)
        if (existing) {
          existing.count++
        } else {
          languagePairs.set(key, {
            source: cs.source_language,
            target: cs.target_language,
            count: 1,
          })
        }
      }

      // Domaines
      cs.domains?.forEach((domain) => {
        domainCount.set(domain.name, (domainCount.get(domain.name) || 0) + 1)
      })
    })

    return {
      totalWords,
      totalProjects,
      topLanguagePairs: Array.from(languagePairs.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      topDomains: Array.from(domainCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    }
  }, [caseStudies])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total projets */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
        <div className="text-blue-100">Projets réalisés</div>
      </div>

      {/* Total mots */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <div className="text-4xl font-bold mb-2">
          {(stats.totalWords / 1000).toFixed(0)}K+
        </div>
        <div className="text-purple-100">Mots traduits</div>
      </div>

      {/* Paires de langues */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
        <div className="text-4xl font-bold mb-2">{stats.topLanguagePairs.length}</div>
        <div className="text-green-100">Paires de langues</div>
      </div>

      {/* Domaines */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6 shadow-lg">
        <div className="text-4xl font-bold mb-2">{stats.topDomains.length}</div>
        <div className="text-amber-100">Domaines d'expertise</div>
      </div>

      {/* Détails des paires de langues (sur toute la largeur) */}
      {stats.topLanguagePairs.length > 0 && (
        <div className="col-span-full bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Paires de langues principales
          </h4>
          <div className="flex flex-wrap gap-3">
            {stats.topLanguagePairs.map((pair, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
              >
                <span className="font-semibold text-blue-600">
                  {pair.source.toUpperCase()}
                </span>
                <span className="text-gray-400">→</span>
                <span className="font-semibold text-purple-600">
                  {pair.target.toUpperCase()}
                </span>
                <span className="text-gray-500 text-sm">({pair.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top domaines */}
      {stats.topDomains.length > 0 && (
        <div className="col-span-full bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Domaines d'expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats.topDomains.map(([domain, count]) => (
              <span
                key={domain}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
              >
                {domain} <span className="text-blue-500">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
