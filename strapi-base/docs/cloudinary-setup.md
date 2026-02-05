# Cloudinary setup & vérifications manuelles

Ce document explique comment configurer Cloudinary pour les nouveaux projets créés à partir du starter, et comment valider manuellement que tout fonctionne.

## 1) Configuration (Railway / production)
- Définir la variable d'environnement `CLOUDINARY_URL` (format: `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`) dans le dashboard Railway (Project → Variables / Secrets).
- Définir `STRAPI_URL` sur l'URL publique du déploiement (ex: `https://votre-app.up.railway.app`).
- Ne pas committer de clés dans le repo.

## 2) Déploiement
- Pousser les modifications (starter a la config Cloudinary et dépendance) → déployer Strapi sur Railway.
- Sur Vercel (Next.js), vérifier `NEXT_PUBLIC_STRAPI_URL` et redeployer le site après que Strapi soit configuré.

## 3) Vérifications manuelles (checklist)
1. Dans Strapi Admin > Media Library : uploader une image test. Vérifier que l'entrée `provider` vaut `cloudinary` et que `url` commence par `https://res.cloudinary.com/...`.
2. Ouvrir le site (production) et vérifier que les images publiques sont servies depuis `res.cloudinary.com` (DevTools → Network → Img).
3. Vérifier que l'en‑tête CSP inclut `https://res.cloudinary.com` (`curl -I https://votre-site/admin | grep -i Content-Security-Policy`).

## 4) Remarques
- Le starter **force** la présence de `CLOUDINARY_URL` pour éviter des déploiements avec uploads locaux (échec explicite si absent).
- Nous n'incluons pas de script de migration automatique ici — la migration d'anciens fichiers `/uploads` est manuelle ou via un script externe si souhaité.
