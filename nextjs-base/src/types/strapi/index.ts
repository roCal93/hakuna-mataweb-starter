/**
 * Types TypeScript Strapi pour Next.js
 * 
 * ⚠️  FICHIER AUTO-GÉNÉRÉ - NE PAS MODIFIER
 * 
 * Ce fichier est synchronisé depuis strapi-base/types/strapi-types.d.ts
 * Pour mettre à jour:
 *   1. Depuis strapi-base: npm run generate:types
 *   2. Depuis strapi-base: npm run sync:types
 *   
 * Ou depuis nextjs-base: npm run sync:types
 */

// ============================================================================
// TYPES DE BASE STRAPI
// ============================================================================

export type StrapiID = number;
export type StrapiDateTime = string;
export type StrapiFileUrl = string;
export type StrapiJSON = Record<string, unknown>;

export interface StrapiMedia {
  id: StrapiID;
  url: StrapiFileUrl;
  mime?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  [key: string]: unknown;
}

export interface StrapiMediaFormat {
  url: StrapiFileUrl;
  width: number;
  height: number;
  mime: string;
  [key: string]: unknown;
}

export interface StrapiBlock {
  type: string;
  children?: Array<{
    type: string;
    text?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

// ============================================================================
// TYPES D'ENVELOPPE STRAPI V5
// ============================================================================

// Strapi v5 : les données sont retournées directement (plus d'attributes)
export interface StrapiEntity {
  id: StrapiID;
  documentId: string;
}

export interface StrapiResponse<T> {
  data: (T & StrapiEntity) | null;
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: Array<T & StrapiEntity>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Component: blocks.button-block
 */
export interface ButtonBlock {
  buttons: Button[];
  alignment: string;
}

/**
 * Component: blocks.cards-block
 */
export interface CardsBlock {
  cards: (Card & StrapiEntity)[];
  columns: string;
  alignment: string;
}

/**
 * Component: blocks.carousel-block
 */
export interface CarouselBlock {
  cards: CarouselCard[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

/**
 * Component: blocks.case-studies-list-block
 */
export interface CaseStudiesListBlock {
  mode: string;
  selected_case_studies?: (CaseStudy & StrapiEntity)[];
  filter_domains?: (Domain & StrapiEntity)[];
  filter_content_types?: (ContentTypeTaxonomy & StrapiEntity)[];
  filter_tags?: (Tag & StrapiEntity)[];
  show_featured_only?: boolean;
  max_items?: number;
  sort_by?: string;
  show_filters?: boolean;
  layout?: string;
  columns?: string;
}

/**
 * Component: blocks.contact-form-block
 */
export interface ContactFormBlock {
  title?: string;
  description?: string;
  submitButtonText?: string;
  blockAlignment: string;
  maxWidth: string;
}

/**
 * Component: blocks.hero-block-simple-text
 */
export interface HeroBlockSimpleText {
  title?: string;
  content: string;
  height: string;
  textAlignment: string;
}

/**
 * Component: blocks.image-block
 */
export interface ImageBlock {
  image: StrapiMedia;
  caption?: string;
  alignment: string;
  size: string;
}

/**
 * Component: blocks.text-block
 */
export interface TextBlock {
  content: StrapiBlock[];
  textAlignment: string;
  blockAlignment: string;
  maxWidth: string;
}

/**
 * Component: blocks.text-image-block
 */
export interface TextImageBlock {
  content: StrapiBlock[];
  image: StrapiMedia;
  imagePosition: string;
  imageSize: string;
  verticalAlignment: string;
  textAlignment: string;
  roundedImage?: boolean;
}

/**
 * Component: shared.button
 */
export interface Button {
  label: string;
  url?: string;
  file?: StrapiMedia;
  variant: string;
  isExternal?: boolean;
  icon?: string;
}

/**
 * Component: shared.carousel-card
 */
export interface CarouselCard {
  frontTitle: string;
  frontContent?: StrapiBlock[];
  backContent?: StrapiBlock[];
  image?: StrapiMedia;
}

/**
 * Component: shared.page-link
 */
export interface PageLink {
  page?: (Page & StrapiEntity);
  customLabel?: string;
}

/**
 * Component: shared.project-constraints
 */
export interface ProjectConstraints {
  tone?: string;
  terminology?: string;
  style_guide?: string;
  cat_tool?: string;
  other_constraints?: string;
}

/**
 * Component: shared.project-results
 */
export interface ProjectResults {
  summary?: string;
  client_feedback?: string;
  kpis?: string;
  testimonial?: string;
}

// ============================================================================
// CONTENT TYPES
// ============================================================================

/**
 * card
 */
export interface Card {
  title: string;
  description?: StrapiBlock[];
  image?: StrapiMedia;
  locale?: string;
  localizations?: (Card & StrapiEntity)[];
}
export type CardResponse = StrapiResponse<Card>;
export type CardCollectionResponse = StrapiCollectionResponse<Card>;

/**
 * Case Study
 */
export interface CaseStudy {
  title: string;
  identifier: string;
  client_display?: string;
  client_is_anonymous?: boolean;
  summary?: string;
  context?: string;
  objective?: string;
  source_language?: string;
  target_language?: string;
  volume?: number;
  volume_unit?: string;
  deadline?: string;
  turnaround_days?: number;
  constraints?: ProjectConstraints;
  results?: ProjectResults;
  domains?: (Domain & StrapiEntity)[];
  content_types?: (ContentTypeTaxonomy & StrapiEntity)[];
  tags?: (Tag & StrapiEntity)[];
  featured?: boolean;
  order?: number;
  cover_image?: StrapiMedia;
  deliverables?: StrapiMedia[];
  locale?: string;
  localizations?: (CaseStudy & StrapiEntity)[];
}
export type CaseStudyResponse = StrapiResponse<CaseStudy>;
export type CaseStudyCollectionResponse = StrapiCollectionResponse<CaseStudy>;

/**
 * Content Type
 */
export interface ContentTypeTaxonomy {
  name: string;
  slug: string;
  description?: string;
  case_studies?: (CaseStudy & StrapiEntity)[];
  locale?: string;
  localizations?: (ContentTypeTaxonomy & StrapiEntity)[];
}
export type ContentTypeTaxonomyResponse = StrapiResponse<ContentTypeTaxonomy>;
export type ContentTypeTaxonomyCollectionResponse = StrapiCollectionResponse<ContentTypeTaxonomy>;

/**
 * Domain
 */
export interface Domain {
  name: string;
  slug: string;
  description?: string;
  case_studies?: (CaseStudy & StrapiEntity)[];
  locale?: string;
  localizations?: (Domain & StrapiEntity)[];
}
export type DomainResponse = StrapiResponse<Domain>;
export type DomainCollectionResponse = StrapiCollectionResponse<Domain>;

/**
 * Header
 */
export interface Header {
  logo?: StrapiMedia;
  title?: string;
  navigation?: PageLink[];
  locale?: string;
  localizations?: (Header & StrapiEntity)[];
}
export type HeaderResponse = StrapiResponse<Header>;
export type HeaderCollectionResponse = StrapiCollectionResponse<Header>;

/**
 * page
 */
export interface Page {
  title?: string;
  hideTitle?: boolean;
  slug: string;
  sections?: (Section & StrapiEntity)[];
  seoTitle?: string;
  seoDescription?: StrapiBlock[];
  seoImage?: StrapiMedia;
  noIndex?: boolean;
  locale?: string;
  localizations?: (Page & StrapiEntity)[];
}
export type PageResponse = StrapiResponse<Page>;
export type PageCollectionResponse = StrapiCollectionResponse<Page>;

/**
 * section
 */
export interface Section {
  title?: string;
  identifier: string;
  hideTitle?: boolean;
  blocks: unknown[];
  order: number;
  spacingTop?: string;
  spacingBottom?: string;
  locale?: string;
  localizations?: (Section & StrapiEntity)[];
}
export type SectionResponse = StrapiResponse<Section>;
export type SectionCollectionResponse = StrapiCollectionResponse<Section>;

/**
 * Tag
 */
export interface Tag {
  name: string;
  slug: string;
  case_studies?: (CaseStudy & StrapiEntity)[];
  locale?: string;
  localizations?: (Tag & StrapiEntity)[];
}
export type TagResponse = StrapiResponse<Tag>;
export type TagCollectionResponse = StrapiCollectionResponse<Tag>;
