import { afterEach, describe, expect, it } from 'vitest'
import { getActiveAnchorId, isSameBasePath } from './anchor'

describe('isSameBasePath', () => {
  it('retourne true pour des chemins identiques', () => {
    expect(isSameBasePath('/fr/a-propos', '/fr/a-propos')).toBe(true)
  })

  it('retourne true quand seul le hash diffère', () => {
    expect(isSameBasePath('/fr/contact#form', '/fr/contact#map')).toBe(true)
  })

  it('retourne true quand le chemin courant a un hash mais pas la cible', () => {
    expect(isSameBasePath('/fr/contact#form', '/fr/contact')).toBe(true)
  })

  it('retourne true quand la cible a un hash mais pas le chemin courant', () => {
    expect(isSameBasePath('/fr/contact', '/fr/contact#section')).toBe(true)
  })

  it('retourne false pour des chemins différents', () => {
    expect(isSameBasePath('/fr/a-propos', '/fr/contact')).toBe(false)
  })

  it('retourne false pour des chemins différents même avec le même hash', () => {
    expect(isSameBasePath('/fr/a-propos#section', '/fr/contact#section')).toBe(
      false
    )
  })
})

describe('getActiveAnchorId', () => {
  const mockRect = (top: number, bottom: number) => ({
    top,
    bottom,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  })

  const setupDocument = (
    elements: Array<{ id: string; rect: { top: number; bottom: number } }>
  ) => {
    const elementsById = new Map(
      elements.map((element) => [
        element.id,
        {
          getBoundingClientRect: () =>
            mockRect(element.rect.top, element.rect.bottom),
        },
      ])
    )

    Object.assign(globalThis, {
      window: {},
      document: {
        getElementById: (id: string) => elementsById.get(id) ?? null,
      },
    })
  }

  afterEach(() => {
    delete (globalThis as typeof globalThis & { document?: unknown }).document
    delete (globalThis as typeof globalThis & { window?: unknown }).window
  })

  it('ne met pas en avant la section contact avant qu’elle ne soit atteinte', () => {
    setupDocument([
      { id: 'hero', rect: { top: 0, bottom: 800 } },
      { id: 'contact', rect: { top: 1200, bottom: 1600 } },
    ])

    expect(getActiveAnchorId(['hero', 'contact'])).toBe('hero')
  })

  it('active la section contact une fois qu’elle est atteinte', () => {
    setupDocument([
      { id: 'hero', rect: { top: -800, bottom: -200 } },
      { id: 'contact', rect: { top: 120, bottom: 600 } },
    ])

    expect(getActiveAnchorId(['hero', 'contact'])).toBe('contact')
  })
})
