import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { provideRouter } from '@angular/router';
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser';
import { of } from 'rxjs';

describe('App', () => {
  beforeEach(async () => {
    const msalServiceSpy = {
      loginRedirect: vi.fn(),
      logoutRedirect: vi.fn(),
      instance: {
        getAllAccounts: vi.fn().mockReturnValue([]),
        setActiveAccount: vi.fn()
      }
    };

    const msalBroadcastServiceSpy = {
      inProgress$: of(InteractionStatus.None),
      msalSubject$: of()
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: MSAL_GUARD_CONFIG, useValue: {} },
        { provide: MsalService, useValue: msalServiceSpy },
        { provide: MsalBroadcastService, useValue: msalBroadcastServiceSpy },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'jules-productivi' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jules-productivi');
  });
});
