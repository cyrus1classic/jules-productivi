import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { MsalRedirectComponent } from '@azure/msal-angular';

bootstrapApplication(App, appConfig)
  .then((appRef) => appRef.bootstrap(MsalRedirectComponent))
  .catch((err) => console.error(err));
