import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITopico, NewTopico } from '../topico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITopico for edit and NewTopicoFormGroupInput for create.
 */
type TopicoFormGroupInput = ITopico | PartialWithRequiredKeyOf<NewTopico>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITopico | NewTopico> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

type TopicoFormRawValue = FormValueOf<ITopico>;

type NewTopicoFormRawValue = FormValueOf<NewTopico>;

type TopicoFormDefaults = Pick<NewTopico, 'id' | 'ativo' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'ajudas' | 'assuntos'>;

type TopicoFormGroupContent = {
  id: FormControl<TopicoFormRawValue['id'] | NewTopico['id']>;
  titulo: FormControl<TopicoFormRawValue['titulo']>;
  conteudo: FormControl<TopicoFormRawValue['conteudo']>;
  ativo: FormControl<TopicoFormRawValue['ativo']>;
  createdAt: FormControl<TopicoFormRawValue['createdAt']>;
  updatedAt: FormControl<TopicoFormRawValue['updatedAt']>;
  deletedAt: FormControl<TopicoFormRawValue['deletedAt']>;
  ajudas: FormControl<TopicoFormRawValue['ajudas']>;
  assuntos: FormControl<TopicoFormRawValue['assuntos']>;
};

export type TopicoFormGroup = FormGroup<TopicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TopicoFormService {
  createTopicoFormGroup(topico: TopicoFormGroupInput = { id: null }): TopicoFormGroup {
    const topicoRawValue = this.convertTopicoToTopicoRawValue({
      ...this.getFormDefaults(),
      ...topico,
    });
    return new FormGroup<TopicoFormGroupContent>({
      id: new FormControl(
        { value: topicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      titulo: new FormControl(topicoRawValue.titulo, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      conteudo: new FormControl(topicoRawValue.conteudo),
      ativo: new FormControl(topicoRawValue.ativo),
      createdAt: new FormControl(topicoRawValue.createdAt),
      updatedAt: new FormControl(topicoRawValue.updatedAt),
      deletedAt: new FormControl(topicoRawValue.deletedAt),
      ajudas: new FormControl(topicoRawValue.ajudas ?? []),
      assuntos: new FormControl(topicoRawValue.assuntos ?? []),
    });
  }

  getTopico(form: TopicoFormGroup): ITopico | NewTopico {
    return this.convertTopicoRawValueToTopico(form.getRawValue() as TopicoFormRawValue | NewTopicoFormRawValue);
  }

  resetForm(form: TopicoFormGroup, topico: TopicoFormGroupInput): void {
    const topicoRawValue = this.convertTopicoToTopicoRawValue({ ...this.getFormDefaults(), ...topico });
    form.reset(
      {
        ...topicoRawValue,
        id: { value: topicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TopicoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      ativo: false,
      createdAt: currentTime,
      updatedAt: currentTime,
      deletedAt: currentTime,
      ajudas: [],
      assuntos: [],
    };
  }

  private convertTopicoRawValueToTopico(rawTopico: TopicoFormRawValue | NewTopicoFormRawValue): ITopico | NewTopico {
    return {
      ...rawTopico,
      createdAt: dayjs(rawTopico.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTopico.updatedAt, DATE_TIME_FORMAT),
      deletedAt: dayjs(rawTopico.deletedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTopicoToTopicoRawValue(
    topico: ITopico | (Partial<NewTopico> & TopicoFormDefaults),
  ): TopicoFormRawValue | PartialWithRequiredKeyOf<NewTopicoFormRawValue> {
    return {
      ...topico,
      createdAt: topico.createdAt ? topico.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: topico.updatedAt ? topico.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      deletedAt: topico.deletedAt ? topico.deletedAt.format(DATE_TIME_FORMAT) : undefined,
      ajudas: topico.ajudas ?? [],
      assuntos: topico.assuntos ?? [],
    };
  }
}
