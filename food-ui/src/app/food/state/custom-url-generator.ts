import { Injectable } from '@angular/core';
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer,
} from '@ngrx/data';
@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {
  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    root: string,
    trailingSlashEndpoints?: boolean
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];
    if (entityName == 'Food') {
      resourceURLs = {
        collectionResourceUrl: 'http://localhost:5001/food/',
        entityResourceUrl: 'http://localhost:5001/food/',
      };
      this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    }
    return resourceURLs;
  }
}
