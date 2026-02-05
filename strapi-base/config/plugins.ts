export default ({ env }) => {
	// Cloudinary must be configured in production via CLOUDINARY_URL
	if (!env('CLOUDINARY_URL') && !(env('CLOUDINARY_NAME') && env('CLOUDINARY_KEY') && env('CLOUDINARY_SECRET'))) {
		throw new Error('CLOUDINARY_URL or CLOUDINARY_NAME/KEY/SECRET is required to use Cloudinary as upload provider')
	}

	return {
		i18n: {
			enabled: true,
			config: {
				defaultLocale: 'fr',
				locales: ['fr', 'en'],
			},
		},

		upload: {
			config: {
				provider: 'cloudinary',
				// If CLOUDINARY_URL is present Cloudinary SDK will use it; otherwise providerOptions can be read from individual vars
				providerOptions: env('CLOUDINARY_URL') ? {} : {
					cloud_name: env('CLOUDINARY_NAME'),
					api_key: env('CLOUDINARY_KEY'),
					api_secret: env('CLOUDINARY_SECRET'),
				},
				actionOptions: {
					upload: {},
					delete: {},
				},
			},
		},
	}
};
