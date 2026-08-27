import { HttpClient } from '@angular/common/http';
import { computed, inject, InjectionToken, Provider, Service, signal } from '@angular/core';
import { load } from 'js-yaml';
import { map, Observable, take, tap } from 'rxjs';
import { Exhibit, ExhibitsSchema } from './exhibit.model';

/** Configuration used by {@link ExhibitStore} to locate exhibit data. */
export interface ExhibitStoreConfig {
  /** URL of the YAML document containing the exhibit collection. */
  dataUrl?: string;
}

/** Internal dependency-injection token for consumer-provided store configuration. */
const EXHIBIT_STORE_CONFIG = new InjectionToken<ExhibitStoreConfig>('EXHIBIT_STORE_CONFIG');

/**
 * Resolves the injected store configuration and fills in defaults.
 *
 * @returns The complete configuration for the current injector.
 */
function injectExhibitStoreConfig(): Required<ExhibitStoreConfig> {
  return {
    dataUrl: 'data/exhibits.yaml',
    ...inject(EXHIBIT_STORE_CONFIG, { optional: true }),
  };
}

/**
 * Configures the {@link ExhibitStore} with the given options.
 *
 * @param config The configuration options for the exhibit store.
 * @returns A provider that can be added to an application.
 */
export function provideExhibitStoreConfig(config: ExhibitStoreConfig): Provider {
  return { provide: EXHIBIT_STORE_CONFIG, useValue: config };
}

/** Loads and indexes the validated exhibit collection used by exhibit routes. */
@Service()
export class ExhibitStore {
  /** Resolved configuration, including defaults for omitted options. */
  readonly config = injectExhibitStoreConfig();

  /** Writable backing state updated after exhibit data is validated. */
  readonly #exhibits = signal<Exhibit[]>([]);

  /** Most recently loaded exhibit collection, or an empty collection before loading. */
  readonly exhibits = this.#exhibits.asReadonly();

  /** Exhibits indexed by ID, recomputed whenever the loaded collection changes. */
  readonly exhibitById = computed(() => {
    const exhibits = this.exhibits();
    return new Map(exhibits.map((exhibit) => [exhibit.id, exhibit]));
  });

  /** HTTP client used to retrieve the configured YAML document. */
  readonly #httpClient = inject(HttpClient);

  /**
   * Loads, parses, and stores the exhibit collection.
   *
   * The returned observable performs one request per subscription and completes
   * after emitting the validated collection.
   *
   * @returns An observable of the newly loaded exhibits.
   */
  loadExhibits(): Observable<Exhibit[]> {
    return this.#httpClient.get(this.config.dataUrl, { responseType: 'text' }).pipe(
      take(1),
      map((text) => ExhibitsSchema.parse(load(text))),
      tap((exhibits) => this.#exhibits.set(exhibits)),
    );
  }
}
