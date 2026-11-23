import * as migration_20261107_172529_initial from './20261107_172529_initial';
import * as migration_20261107_180057_tools_slug_status from './20261107_180057_tools_slug_status';
import * as migration_20261120_041320_testimonial_title from './20261120_041320_testimonial_title';
import * as migration_20261123_181834_video_prompts from './20261123_181834_video_prompts';

export const migrations = [
  {
    up: migration_20261107_172529_initial.up,
    down: migration_20261107_172529_initial.down,
    name: '20261107_172529_initial',
  },
  {
    up: migration_20261107_180057_tools_slug_status.up,
    down: migration_20261107_180057_tools_slug_status.down,
    name: '20261107_180057_tools_slug_status',
  },
  {
    up: migration_20261120_041320_testimonial_title.up,
    down: migration_20261120_041320_testimonial_title.down,
    name: '20261120_041320_testimonial_title',
  },
  {
    up: migration_20261123_181834_video_prompts.up,
    down: migration_20261123_181834_video_prompts.down,
    name: '20261123_181834_video_prompts'
  },
];
