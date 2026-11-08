import * as migration_20261107_172529_initial from './20261107_172529_initial';
import * as migration_20261107_180057_tools_slug_status from './20261107_180057_tools_slug_status';

export const migrations = [
  {
    up: migration_20261107_172529_initial.up,
    down: migration_20261107_172529_initial.down,
    name: '20261107_172529_initial',
  },
  {
    up: migration_20261107_180057_tools_slug_status.up,
    down: migration_20261107_180057_tools_slug_status.down,
    name: '20261107_180057_tools_slug_status'
  },
];
