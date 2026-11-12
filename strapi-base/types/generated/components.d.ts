import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCarouselBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_carousel_blocks';
  info: {
    description: 'Carousel with work items';
    displayName: 'Carousel Block';
  };
  attributes: {
    scrollSpeed: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    workItems: Schema.Attribute.Relation<
      'oneToMany',
      'api::work-item.work-item'
    >;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Call-to-action button with customizable style and link';
    displayName: 'Button';
  };
  attributes: {
    file: Schema.Attribute.Media<'files' | 'images'>;
    icon: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCarouselCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_carousel_cards';
  info: {
    description: 'Card with front and back content for carousel';
    displayName: 'Carousel Card';
  };
  attributes: {
    backContent: Schema.Attribute.Blocks;
    frontContent: Schema.Attribute.Blocks;
    frontTitle: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedExternalLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_external_links';
  info: {
    description: 'A link to an external URL';
    displayName: 'External Link';
    icon: 'external-link-alt';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPageLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_links';
  info: {
    description: 'Link to a page with automatic slug resolution';
    displayName: 'page-link';
  };
  attributes: {
    customLabel: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    section: Schema.Attribute.Relation<'oneToOne', 'api::section.section'>;
  };
}

export interface SharedTimelineImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_images';
  info: {
    description: 'An image for the timeline with an optional external link';
    displayName: 'Timeline Image';
    icon: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'shared.external-link', false>;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_common_timeline_items';
  info: {
    description: 'A single item/step in the timeline.';
    displayName: 'Timeline Item';
    icon: 'dot-circle';
  };
  attributes: {
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Component<'shared.timeline-image', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.carousel-block': BlocksCarouselBlock;
      'shared.button': SharedButton;
      'shared.carousel-card': SharedCarouselCard;
      'shared.external-link': SharedExternalLink;
      'shared.page-link': SharedPageLink;
      'shared.timeline-image': SharedTimelineImage;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}
