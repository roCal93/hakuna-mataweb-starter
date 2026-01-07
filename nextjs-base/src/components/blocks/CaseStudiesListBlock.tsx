'use client'

import React, { useState, useMemo } from 'react'
import { CaseStudy, Domain, ContentTypeTaxonomy, Tag, StrapiEntity } from '@/types/strapi'
import { CaseStudyCard } from './CaseStudyCard'

type CaseStudiesListBlockProps = {
  mode: 'manual' | 'auto'
  caseStudies: (CaseStudy & StrapiEntity)[]
  showFilters?: boolean
  layout?: 'grid' | 'list' | 'masonry'
  columns?: '2' | '3' | '4'
  availableDomains?: (Domain & StrapiEntity)[]
  availableContentTypes?: (ContentTypeTaxonomy & StrapiEntity)[]
  availableTags?: (Tag & StrapiEntity)[]
  locale?: string
}

export const CaseStudiesListBlock = ({
  mode,
  caseStudies,
  showFilters = true,
  layout = 'grid',
  columns = '3',
  availableDomains = [],
  availableContentTypes = [],
  availableTags = [],
  locale = 'fr',
}: CaseStudiesListBlockProps) => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Filtrage des case studies
  const filteredCaseStudies = useMemo(() => {
    if (!showFilters || mode === 'manual') {
      return caseStudies
    }

    return caseStudies.filter((cs) => {
      // Filtre par domaines
      if (selectedDomains.length > 0) {
        const hasDomain = cs.domains?.some((d) => selectedDomains.includes(d.slug))
        if (!hasDomain) return false
      }

      // Filtre par types de contenu
      if (selectedContentTypes.length > 0) {
        const hasContentType = cs.content_types?.some((ct) =>
          selectedContentTypes.includes(ct.slug)
        )
        if (!hasContentType) return false
      }

      // Filtre par tags
      if (selectedTags.length > 0) {
        const hasTag = cs.tags?.some((t) => selectedTags.includes(t.slug))
        if (!hasTag) return false
      }

      return true
    })
  }, [caseStudies, selectedDomains, selectedContentTypes, selectedTags, showFilters, mode])

  // Classes pour le layout
  const layoutClasses = {
    grid: `grid gap-6 ${
      columns === '2'
        ? 'grid-cols-1 md:grid-cols-2'
        : columns === '3'
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }`,
    list: 'flex flex-col gap-4',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6',
  }

  const toggleFilter = (
    filterArray: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter((v) => v !== value))
    } else {
      setFilter([...filterArray, value])
    }
  }

  return (
    <div className="w-full">
      {/* Filtres */}
      {showFilters && mode === 'auto' && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Filtrer les projets</h3>

          {/* Domaines */}
          {availableDomains.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-gray-700">Domaines</p>
              <div className="flex flex-wrap gap-2">
                {availableDomains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() =>
                      toggleFilter(selectedDomains, setSelectedDomains, domain.slug)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedDomains.includes(domain.slug)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-100'
                    }`}
                  >
                    {domain.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Types de contenu */}
          {availableContentTypes.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-gray-700">Types de contenu</p>
              <div className="flex flex-wrap gap-2">
                {availableContentTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() =>
                      toggleFilter(selectedContentTypes, setSelectedContentTypes, ct.slug)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedContentTypes.includes(ct.slug)
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    {ct.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {availableTags.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Tags</p>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleFilter(selectedTags, setSelectedTags, tag.slug)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag.slug)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Réinitialiser */}
          {(selectedDomains.length > 0 ||
            selectedContentTypes.length > 0 ||
            selectedTags.length > 0) && (
            <button
              onClick={() => {
                setSelectedDomains([])
                setSelectedContentTypes([])
                setSelectedTags([])
              }}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Liste des case studies */}
      {filteredCaseStudies.length > 0 ? (
        <div className={layoutClasses[layout]}>
          {filteredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun projet ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  )
}
