import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Преобразует строки в числа, если указано @Type(() => Number)
        whitelist: true, // Убирает поля, которых нет в DTO
        forbidNonWhitelisted: true, // Ошибка, если пришло "лишнее" поле,
          exceptionFactory: (errors) => {
              const formattedErrors: Record<string, string[]> = {};

              for (const error of errors) {
                  const field = error.property;
                  const constraints = error.constraints;

                  if (constraints) {
                      formattedErrors[field] = Object.values(constraints);
                  }
              }

              return new BadRequestException({ errors: formattedErrors });
          }
      })
  );
    app.enableCors({
        origin: ['http://localhost:5173', 'https://language-reader.com', 'chrome-extension://bcaikkkknembhpfjlpjjpllgimbenlch'], // разреши свой фронт
        credentials: true,
    });
    app.setGlobalPrefix('api');

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
