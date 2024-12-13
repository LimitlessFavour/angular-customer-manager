import { enableProdMode } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';

enableProdMode();

export default function bootstrap() {
  return platformServer().bootstrapModule(AppModule);
}
