import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { SetorService } from '../service/setor.service';
import { ISetor } from '../setor.model';
import { SetorFormService, SetorFormGroup } from './setor-form.service';

@Component({
  standalone: true,
  selector: 'jhi-setor-update',
  templateUrl: './setor-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SetorUpdateComponent implements OnInit {
  isSaving = false;
  setor: ISetor | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected setorService = inject(SetorService);
  protected setorFormService = inject(SetorFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SetorFormGroup = this.setorFormService.createSetorFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ setor }) => {
      this.setor = setor;
      if (setor) {
        this.updateForm(setor);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('sicopJHipsterApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const setor = this.setorFormService.getSetor(this.editForm);
    if (setor.id !== null) {
      this.subscribeToSaveResponse(this.setorService.update(setor));
    } else {
      this.subscribeToSaveResponse(this.setorService.create(setor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISetor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(setor: ISetor): void {
    this.setor = setor;
    this.setorFormService.resetForm(this.editForm, setor);
  }
}
