'use client'

import React, { useState } from 'react'
import { CaseStudy, StrapiEntity } from '@/types/strapi'
import { AmandaTranslationCaseStudyCard } from './AmandaTranslationCaseStudyCard'
import { AmandaTranslationStats } from './AmandaTranslationStats'

type AmandaTranslationPortfolioProps = {
  caseStudies: (CaseStudy & StrapiEntity)[]
  showStats?: boolean
  locale?: string
}

/**
 * Composant portfolio complet spécialisé pour les traducteurs (Amanda)
 * Combine filtres de langues + stats + grille de projets
 */
export const AmandaTranslationPortfolio = ({ 
  caseStudies, 
  showStats = true,
  locale = 'fr' 
}: AmandaTranslationPortfolioProps) => {
  const [selectedSourceLang, setSelectedSourceLang] = useState<string>('')
  const [selectedTargetLang, setSelectedTargetLang] = useState<string>('')

  // Extraction des langues uniques
  const languages = React.useMemo(() => {
    const sources = new Set<string>()
    const targets = new Set<string>()

    caseStudies.forEach((cs) => {
      if (cs.source_language) sources.add(cs.source_language)
      if (cs.target_language) targets.add(cs.target_language)
    })

    return {
      sources: Array.from(sources).sort(),
      targets: Array.from(targets).sort(),
    }
  }, [caseStudies])

  // Filtrage
  const filteredCaseStudies = React.useMemo(() => {
    return caseStudies.filter((cs) => {
      if (selectedSourceLang && cs.source_language !== selectedSourceLang) {
        return false
      }
      if (selectedTargetLang && cs.target_language !== selectedTargetLang) {
        return false
      }
      return true
    })
  }, [caseStudies, selectedSourceLang, selectedTargetLang])

  return (
    <div className="w-full">
      {/* Statistiques */}
      {showStats && <AmandaTranslationStats caseStudies={caseStudies} />}

      {/* Filtres de langues */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Filtrer par combinaison linguistique
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Langue source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langue source
            </label>
            <select
              value={selectedSourceLang}
              onChange={(e) => setSelectedSourceLang(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Toutes les langues</option>
              {languages.sources.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Langue cible */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langue cible
            </label>
            <select
              value={selectedTargetLang}
              onChange={(e) => setSelectedTargetLang(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            >
              <option value="">Toutes les langues</option>
              {languages.targets.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Réinitialiser */}
        {(selectedSourceLang || selectedTargetLang) && (
          <button
            onClick={() => {
              setSelectedSourceLang('')
              setSelectedTargetLang('')
            }}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Compteur de résultats */}
      <div className="mb-6 text-gray-600">
        <p>
          <span className="font-semibold text-gray-900">{filteredCaseStudies.length}</span>{' '}
          {filteredCaseStudies.length === 1 ? 'projet trouvé' : 'projets trouvés'}
        </p>
      </div>

      {/* Grille de projets */}
      {filteredCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaseStudies.map((caseStudy) => (
            <AmandaTranslationCaseStudyCard 
              key={caseStudy.id} 
              caseStudy={caseStudy} 
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">
            Aucun projet ne correspond à cette combinaison linguistique.
          </p>
          <button
            onClick={() => {
              setSelectedSourceLang('')
              setSelectedTargetLang('')
            }}
            className="mt-4 text-blue-600 hover:text-blue-800 underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}
