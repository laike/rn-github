import * as repositories from './reponsitories';
import * as language from './language';
import * as theme from './theme';
import * as user from './user';
export default {
  ...repositories,
  ...user,
  ...theme,
  ...language,
};
