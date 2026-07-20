import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  const appController = new AppController({} as AppService);

  it('reports that the API is healthy', () => {
    expect(appController.getHealth()).toEqual({ status: 'ok' });
  });
});
