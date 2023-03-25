import { InitializerService } from '@shared/services/initializer/initializer.service';

export function initApp(initializer: InitializerService) {
  return () => initializer.initializer().then();
}
