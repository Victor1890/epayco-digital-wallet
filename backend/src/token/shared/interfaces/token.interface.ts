import { IBaseEntity } from '@/shared/interfaces/base-entity.interface';
import { TokenType } from '../enums/types.interface';
import { IClient } from '@/client/shared/interfaces/client.interface';

/**
 * Represents a bank in the system.
 */
export interface IToken extends IBaseEntity {
  /**
   * The token type.
   */
  type: TokenType;

  /**
   * The token string.
   */
  token: string;

  /**
   * Whether the token was already used or not.
   */
  used: boolean;

  /**
   * The token payload.
   */
  payload: ObjectI;

  /**
   * The ID of the user that generated the token.
   */
  clientId: number;

  /**
   * The token expiration date.
   */
  expiredAt: Date;

  /**
   * The token use date.
   */
  completedAt: Date | null;

  client?: IClient;
}
