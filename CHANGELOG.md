# Changelog - Hakuna Mataweb Starter

Toutes les modifications notables du starter seront documentées ici.

## [2.0.0] - 2026-02-03

### Ajouté
- Fichier VERSION pour tracker la version du starter
- Système de versioning centralisé
- Support pour le nouveau système de versioning de la block-library

### Modifié
- Architecture : séparation totale blocks/starter
- Les blocks ne sont plus inclus dans le starter
- Les blocks sont copiés depuis la block-library lors de la création de projet

### Notes de migration
Si vous avez des projets existants, utilisez le script de synchronisation :
```bash
./tools/scripts/sync-from-starter.sh
```

---

## [1.0.0] - 2026-01-01

### Ajouté
- Version initiale du starter
- Structure Next.js + Strapi
- Composants layout (Header, Footer)
- Configuration Tailwind CSS
- Scripts de déploiement
