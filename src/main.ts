import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig);
