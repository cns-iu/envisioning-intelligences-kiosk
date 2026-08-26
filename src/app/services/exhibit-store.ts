import { httpResource } from '@angular/common/http';
import { inject, InjectionToken, Provider, Service } from '@angular/core';
import { load } from 'js-yaml';
import { Exhibit, ExhibitSchema } from '../models/exhibit';

/** Configuration used by {@link ExhibitStore} to locate exhibit data. */
export interface ExhibitStoreConfig {
  /** URL of the YAML document containing the exhibit collection. */
  dataUrl?: string;
}

/** Internal dependency-injection token for consumer-provided store configuration. */
const EXHIBIT_STORE_CONFIG = new InjectionToken<ExhibitStoreConfig>('EXHIBIT_STORE_CONFIG');

/** Resolves the injected store configuration and fills in omitted defaults. */
function injectExhibitStoreConfig(): Required<ExhibitStoreConfig> {
  return {
    dataUrl: 'data/exhibits.yaml',
    ...inject(EXHIBIT_STORE_CONFIG, { optional: true }),
  };
}

/**
 * Configures the URL from which {@link ExhibitStore} loads exhibits.
 *
 * Add the returned provider to an application or test injector. Any omitted
 * option retains the store's default value.
 */
export function provideExhibitStore(config: ExhibitStoreConfig): Provider {
  return { provide: EXHIBIT_STORE_CONFIG, useValue: config };
}

/**
 * Loads the exhibit collection from YAML and validates every entry at runtime.
 *
 * Consumers can read loading, error, and value state from {@link exhibits}.
 * The value is an empty array until the request completes successfully.
 */
@Service()
export class ExhibitStore {
  /** Resolved configuration, including defaults for omitted options. */
  readonly config = injectExhibitStoreConfig();

  /** Read-only HTTP resource containing the validated exhibit collection. */
  readonly exhibits = httpResource
    .text<Exhibit[]>(() => this.config.dataUrl, {
      parse: (text) => {
        const data = load(text);
        return ExhibitSchema.array().parse(data);
      },
    })
    .asReadonly();

  /**
   * Gets the exhibit with the given ID.
   *
   * @param id Exhibit ID to look up.
   * @returns The exhibit with the given ID, or `undefined` if no such exhibit exists or the collection has not yet loaded.
   */
  getExhibitById(id: string): Exhibit | undefined {
    return this.exhibits.value()?.find((exhibit) => exhibit.id === id);
  }
}
