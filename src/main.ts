import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./transform.interceptor";

async function bootstrap() {
  const logger = new Logger("Main", { timestamp: true });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 4000;
  await app.listen(4000);
  logger.log(`Application is running on ${port}`);
}
bootstrap();
