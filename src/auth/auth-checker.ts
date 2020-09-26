import { AuthChecker } from 'type-graphql';

import { IContext } from '../main';
import { Roles } from '../roles/roles';

export const customAuthChecker: AuthChecker<IContext, Roles> = (resolverData, roles: Roles[]) => {
  const user = resolverData.context.currentUser;

  if (!user || user.id === 0) {
    return false;
  }

  if (roles.includes(user.role)) {
    return true;
  }

  return false;
};
