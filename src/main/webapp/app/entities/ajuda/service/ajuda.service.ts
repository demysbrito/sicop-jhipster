import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAjuda, NewAjuda } from '../ajuda.model';

export type PartialUpdateAjuda = Partial<IAjuda> & Pick<IAjuda, 'id'>;

type RestOf<T extends IAjuda | NewAjuda> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export type RestAjuda = RestOf<IAjuda>;

export type NewRestAjuda = RestOf<NewAjuda>;

export type PartialUpdateRestAjuda = RestOf<PartialUpdateAjuda>;

export type EntityResponseType = HttpResponse<IAjuda>;
export type EntityArrayResponseType = HttpResponse<IAjuda[]>;

@Injectable({ providedIn: 'root' })
export class AjudaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ajudas');

  create(ajuda: NewAjuda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ajuda);
    return this.http.post<RestAjuda>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ajuda: IAjuda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ajuda);
    return this.http
      .put<RestAjuda>(`${this.resourceUrl}/${this.getAjudaIdentifier(ajuda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ajuda: PartialUpdateAjuda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ajuda);
    return this.http
      .patch<RestAjuda>(`${this.resourceUrl}/${this.getAjudaIdentifier(ajuda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestAjuda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAjuda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAjudaIdentifier(ajuda: Pick<IAjuda, 'id'>): string {
    return ajuda.id;
  }

  compareAjuda(o1: Pick<IAjuda, 'id'> | null, o2: Pick<IAjuda, 'id'> | null): boolean {
    return o1 && o2 ? this.getAjudaIdentifier(o1) === this.getAjudaIdentifier(o2) : o1 === o2;
  }

  addAjudaToCollectionIfMissing<Type extends Pick<IAjuda, 'id'>>(
    ajudaCollection: Type[],
    ...ajudasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ajudas: Type[] = ajudasToCheck.filter(isPresent);
    if (ajudas.length > 0) {
      const ajudaCollectionIdentifiers = ajudaCollection.map(ajudaItem => this.getAjudaIdentifier(ajudaItem));
      const ajudasToAdd = ajudas.filter(ajudaItem => {
        const ajudaIdentifier = this.getAjudaIdentifier(ajudaItem);
        if (ajudaCollectionIdentifiers.includes(ajudaIdentifier)) {
          return false;
        }
        ajudaCollectionIdentifiers.push(ajudaIdentifier);
        return true;
      });
      return [...ajudasToAdd, ...ajudaCollection];
    }
    return ajudaCollection;
  }

  protected convertDateFromClient<T extends IAjuda | NewAjuda | PartialUpdateAjuda>(ajuda: T): RestOf<T> {
    return {
      ...ajuda,
      createdAt: ajuda.createdAt?.toJSON() ?? null,
      updatedAt: ajuda.updatedAt?.toJSON() ?? null,
      deletedAt: ajuda.deletedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAjuda: RestAjuda): IAjuda {
    return {
      ...restAjuda,
      createdAt: restAjuda.createdAt ? dayjs(restAjuda.createdAt) : undefined,
      updatedAt: restAjuda.updatedAt ? dayjs(restAjuda.updatedAt) : undefined,
      deletedAt: restAjuda.deletedAt ? dayjs(restAjuda.deletedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAjuda>): HttpResponse<IAjuda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAjuda[]>): HttpResponse<IAjuda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
