import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAjuda, NewAjuda } from '../ajuda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAjuda for edit and NewAjudaFormGroupInput for create.
 */
type AjudaFormGroupInput = IAjuda | PartialWithRequiredKeyOf<NewAjuda>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAjuda | NewAjuda> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

type AjudaFormRawValue = FormValueOf<IAjuda>;

type NewAjudaFormRawValue = FormValueOf<NewAjuda>;

type AjudaFormDefaults = Pick<NewAjuda, 'id' | 'ativo' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'topicos'>;

type AjudaFormGroupContent = {
  id: FormControl<AjudaFormRawValue['id'] | NewAjuda['id']>;
  titulo: FormControl<AjudaFormRawValue['titulo']>;
  conteudo: FormControl<AjudaFormRawValue['conteudo']>;
  ativo: FormControl<AjudaFormRawValue['ativo']>;
  createdAt: FormControl<AjudaFormRawValue['createdAt']>;
  updatedAt: FormControl<AjudaFormRawValue['updatedAt']>;
  deletedAt: FormControl<AjudaFormRawValue['deletedAt']>;
  topicos: FormControl<AjudaFormRawValue['topicos']>;
};

export type AjudaFormGroup = FormGroup<AjudaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AjudaFormService {
  createAjudaFormGroup(ajuda: AjudaFormGroupInput = { id: null }): AjudaFormGroup {
    const ajudaRawValue = this.convertAjudaToAjudaRawValue({
      ...this.getFormDefaults(),
      ...ajuda,
    });
    return new FormGroup<AjudaFormGroupContent>({
      id: new FormControl(
        { value: ajudaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      titulo: new FormControl(ajudaRawValue.titulo, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      conteudo: new FormControl(ajudaRawValue.conteudo),
      ativo: new FormControl(ajudaRawValue.ativo),
      createdAt: new FormControl(ajudaRawValue.createdAt),
      updatedAt: new FormControl(ajudaRawValue.updatedAt),
      deletedAt: new FormControl(ajudaRawValue.deletedAt),
      topicos: new FormControl(ajudaRawValue.topicos ?? []),
    });
  }

  getAjuda(form: AjudaFormGroup): IAjuda | NewAjuda {
    return this.convertAjudaRawValueToAjuda(form.getRawValue() as AjudaFormRawValue | NewAjudaFormRawValue);
  }

  resetForm(form: AjudaFormGroup, ajuda: AjudaFormGroupInput): void {
    const ajudaRawValue = this.convertAjudaToAjudaRawValue({ ...this.getFormDefaults(), ...ajuda });
    form.reset(
      {
        ...ajudaRawValue,
        id: { value: ajudaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AjudaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      ativo: false,
      createdAt: currentTime,
      updatedAt: currentTime,
      deletedAt: currentTime,
      topicos: [],
    };
  }

  private convertAjudaRawValueToAjuda(rawAjuda: AjudaFormRawValue | NewAjudaFormRawValue): IAjuda | NewAjuda {
    return {
      ...rawAjuda,
      createdAt: dayjs(rawAjuda.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawAjuda.updatedAt, DATE_TIME_FORMAT),
      deletedAt: dayjs(rawAjuda.deletedAt, DATE_TIME_FORMAT),
    };
  }

  private convertAjudaToAjudaRawValue(
    ajuda: IAjuda | (Partial<NewAjuda> & AjudaFormDefaults),
  ): AjudaFormRawValue | PartialWithRequiredKeyOf<NewAjudaFormRawValue> {
    return {
      ...ajuda,
      createdAt: ajuda.createdAt ? ajuda.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: ajuda.updatedAt ? ajuda.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      deletedAt: ajuda.deletedAt ? ajuda.deletedAt.format(DATE_TIME_FORMAT) : undefined,
      topicos: ajuda.topicos ?? [],
    };
  }
}
