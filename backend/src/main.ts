import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { CommonEnvKey } from '@/shared/enums/common-environments.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [configService.getOrThrow<string>(CommonEnvKey.FRONTEND_URL)],
    credentials: true,
  });

  const PORT = configService.getOrThrow<number>(CommonEnvKey.PORT);

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
