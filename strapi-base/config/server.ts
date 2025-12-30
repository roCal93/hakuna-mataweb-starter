export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  preview: {
    enabled: true,
    config: {
      secret: env('PREVIEW_SECRET', 'f3b1a9c4d6e2f07b8c1a2b3c4d5e6f7089a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5'),
    },
  },
});
