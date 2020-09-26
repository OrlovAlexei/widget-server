import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { JwtUser } from './user';

@Service()
export class JwtService {
  private readonly cache: Map<string, JwtUser> = new Map<string, JwtUser>();

  generate(data: string | object, secret: string): string {
    return jwt.sign(data, secret, {
      expiresIn: '24hr',
    });
  }

  verify(token: string, secret: string): JwtUser | false {
    const cached = this.cache.get(token);

    if (cached !== undefined) {
      return cached;
    }

    try {
      const decoded = jwt.verify(token, secret);

      if (!decoded || typeof decoded !== 'object') {
        throw new Error('Invalid jwt data');
      }

      const jwtUser = new JwtUser(decoded['id'], decoded['roles']);

      this.cache.set(token, jwtUser);

      return jwtUser;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
