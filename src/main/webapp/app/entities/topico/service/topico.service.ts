import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITopico, NewTopico } from '../topico.model';

export type PartialUpdateTopico = Partial<ITopico> & Pick<ITopico, 'id'>;

type RestOf<T extends ITopico | NewTopico> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export type RestTopico = RestOf<ITopico>;

export type NewRestTopico = RestOf<NewTopico>;

export type PartialUpdateRestTopico = RestOf<PartialUpdateTopico>;

export type EntityResponseType = HttpResponse<ITopico>;
export type EntityArrayResponseType = HttpResponse<ITopico[]>;

@Injectable({ providedIn: 'root' })
export class TopicoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/topicos');

  create(topico: NewTopico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(topico);
    return this.http
      .post<RestTopico>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(topico: ITopico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(topico);
    return this.http
      .put<RestTopico>(`${this.resourceUrl}/${this.getTopicoIdentifier(topico)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(topico: PartialUpdateTopico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(topico);
    return this.http
      .patch<RestTopico>(`${this.resourceUrl}/${this.getTopicoIdentifier(topico)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestTopico>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTopico[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTopicoIdentifier(topico: Pick<ITopico, 'id'>): string {
    return topico.id;
  }

  compareTopico(o1: Pick<ITopico, 'id'> | null, o2: Pick<ITopico, 'id'> | null): boolean {
    return o1 && o2 ? this.getTopicoIdentifier(o1) === this.getTopicoIdentifier(o2) : o1 === o2;
  }

  addTopicoToCollectionIfMissing<Type extends Pick<ITopico, 'id'>>(
    topicoCollection: Type[],
    ...topicosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const topicos: Type[] = topicosToCheck.filter(isPresent);
    if (topicos.length > 0) {
      const topicoCollectionIdentifiers = topicoCollection.map(topicoItem => this.getTopicoIdentifier(topicoItem));
      const topicosToAdd = topicos.filter(topicoItem => {
        const topicoIdentifier = this.getTopicoIdentifier(topicoItem);
        if (topicoCollectionIdentifiers.includes(topicoIdentifier)) {
          return false;
        }
        topicoCollectionIdentifiers.push(topicoIdentifier);
        return true;
      });
      return [...topicosToAdd, ...topicoCollection];
    }
    return topicoCollection;
  }

  protected convertDateFromClient<T extends ITopico | NewTopico | PartialUpdateTopico>(topico: T): RestOf<T> {
    return {
      ...topico,
      createdAt: topico.createdAt?.toJSON() ?? null,
      updatedAt: topico.updatedAt?.toJSON() ?? null,
      deletedAt: topico.deletedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTopico: RestTopico): ITopico {
    return {
      ...restTopico,
      createdAt: restTopico.createdAt ? dayjs(restTopico.createdAt) : undefined,
      updatedAt: restTopico.updatedAt ? dayjs(restTopico.updatedAt) : undefined,
      deletedAt: restTopico.deletedAt ? dayjs(restTopico.deletedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTopico>): HttpResponse<ITopico> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTopico[]>): HttpResponse<ITopico[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
