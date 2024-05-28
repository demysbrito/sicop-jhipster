import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { AjudaDetailComponent } from './ajuda-detail.component';

describe('Ajuda Management Detail Component', () => {
  let comp: AjudaDetailComponent;
  let fixture: ComponentFixture<AjudaDetailComponent>;
  let dataUtils: DataUtils;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjudaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AjudaDetailComponent,
              resolve: { ajuda: () => of({ id: '9fec3727-3421-4967-b213-ba36557ca194' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AjudaDetailComponent, '')
      .compileComponents();
    dataUtils = TestBed.inject(DataUtils);
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ajuda on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AjudaDetailComponent);

      // THEN
      expect(instance.ajuda()).toEqual(expect.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });

  describe('byteSize', () => {
    it('Should call byteSize from DataUtils', () => {
      // GIVEN
      jest.spyOn(dataUtils, 'byteSize');
      const fakeBase64 = 'fake base64';

      // WHEN
      comp.byteSize(fakeBase64);

      // THEN
      expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
    });
  });

  describe('openFile', () => {
    it('Should call openFile from DataUtils', () => {
      const newWindow = { ...window };
      newWindow.document.write = jest.fn();
      window.open = jest.fn(() => newWindow);
      window.onload = jest.fn(() => newWindow) as any;
      window.URL.createObjectURL = jest.fn() as any;
      // GIVEN
      jest.spyOn(dataUtils, 'openFile');
      const fakeContentType = 'fake content type';
      const fakeBase64 = 'fake base64';

      // WHEN
      comp.openFile(fakeBase64, fakeContentType);

      // THEN
      expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
    });
  });
});
