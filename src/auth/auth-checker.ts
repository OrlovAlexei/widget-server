import { AuthChecker } from 'type-graphql';
import { IContext } from '../main';

export const customAuthChecker: AuthChecker<IContext> = async (resolverData, roles: string[]) => {
  const user = resolverData.context.currentUser;

  if (!user || user.id === 0) {
    return false;
  }

  for (const role of user.roles) {
    if (roles.indexOf(role.name) !== -1) {
      return true;
    }
  }

  return false;
};
