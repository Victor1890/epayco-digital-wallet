import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { Token } from './models/token.entity';
import { EnumTokenType, TokenType } from './shared/enums/types.interface';
import { IToken } from './shared/interfaces/token.interface';
import { Service } from '@/shared/classes/base.service';

@Injectable()
export class TokenService extends Service<Token> {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {
    super(Token.name, tokenRepository);
  }

  /**
   * Creates a new hashed token for a user.
   * @param {IUser} user - The user requesting the token.
   * @param {TokenType} type - The type of token (default: RESET_PASSWORD).
   * @returns A promise that resolves to the unhashed token string.
   */
  async create(
    user: IUser | LoggedUserData,
    type: TokenType = EnumTokenType.RESET_PASSWORD,
  ): Promise<string> {
    await this.invalidateExistingTokens(user.id);

    const plainToken = this.generateToken();
    const hashedToken = this.hashToken(plainToken);
    const expirationTime = this.getTokenExpiration();

    const tokenEntity = this.tokenRepository.create({
      type,
      token: hashedToken,
      expiredAt: expirationTime,
      userId: user.id,
      used: false,
    });

    await this.tokenRepository.save(tokenEntity);
    return plainToken;
  }

  /**
   * Invalidates any existing tokens for a user.
   * @param {number} userId - The user's ID.
   */
  private async invalidateExistingTokens(userId: number): Promise<void> {
    await this.tokenRepository.softDelete({ userId });
  }

  /**
   * Generates a random 32-byte token.
   * @returns {string} A random token in hex format.
   */
  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Hashes a token using SHA-256.
   * @param {string} token - The token to hash.
   * @returns {string} The hashed token.
   */
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Gets the expiration time for the token (default: 10 minutes from now).
   * @returns {Date} The expiration date.
   */
  private getTokenExpiration(): Date {
    return new Date(Date.now() + 10 * 60 * 1000);
  }

  validateToken(token: IToken | null | undefined, type: EnumTokenType) {
    if (!token) {
      throw new NotFoundException(
        'Verification token not found or is invalid.',
      );
    }
    if (token.used) {
      throw new GoneException('This token has already been used.');
    }
    if (new Date() > token.expiredAt) {
      throw new GoneException('Token has expired.');
    }
    if (token.type !== (type as TokenType)) {
      throw new BadRequestException('Invalid token');
    }
  }
}
