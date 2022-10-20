import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../../app-insights/logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrHandlerService extends ErrorHandler {
  constructor(private ai: LoggerService) {
    super();
  }
  override handleError(error: Error) {
    // this.ai.logException(error);
  }
}
