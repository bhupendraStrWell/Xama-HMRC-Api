import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      name: 'session',
      keys: ['oauth2Token', 'caller'],
      maxAge: 10 * 60 * 60 * 1000, // 10 hours
    }),
  );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
