import { Client } from '@/client/models/client.entity';
import { Service } from '@/shared/classes/base.service';
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
   * @param {Client} client - The client requesting the token.
   * @param {TokenType} type - The type of token.
   * @returns A promise that resolves to the unhashed token string.
   */
  async create(
    client: Client,
    type: TokenType,
    payload?: ObjectI,
  ): Promise<string> {
    await this.invalidateExistingTokens(client.id);

    const plainToken = this.generateToken();
    const hashedToken = this.hashToken(plainToken);
    const expirationTime = this.getTokenExpiration();

    const tokenEntity = this.tokenRepository.create({
      type,
      token: hashedToken,
      expiredAt: expirationTime,
      clientId: client.id,
      used: false,
      payload
    });

    await this.tokenRepository.save(tokenEntity);
    return plainToken;
  }

  async updateTokenAsUsed(tokenId: number): Promise<void> {
    await this.tokenRepository.update({ id: tokenId }, { used: true });
  }

  /**
   * Invalidates any existing tokens for a user.
   * @param {number} clientId - The client's ID.
   */
  private async invalidateExistingTokens(clientId: number): Promise<void> {
    await this.tokenRepository.softDelete({ clientId });
  }

  private generateToken(): string {
    const buffer = randomBytes(3); // 3 bytes = 24 bits
    const token = buffer.readUIntBE(0, 3) % 1000000; // Limit to 6 digits
    return token.toString().padStart(6, '0'); // Pad with leading zeros if necessary
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  verifyToken(plainToken: string, hashedToken: string): boolean {
    const hashedInputToken = this.hashToken(plainToken);
    return hashedInputToken === hashedToken;
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
