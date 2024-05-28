import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAssunto } from 'app/entities/assunto/assunto.model';
import { AssuntoService } from 'app/entities/assunto/service/assunto.service';
import { ISetor } from 'app/entities/setor/setor.model';
import { SetorService } from 'app/entities/setor/service/setor.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IPortaria } from '../portaria.model';
import { PortariaService } from '../service/portaria.service';
import { PortariaFormService } from './portaria-form.service';

import { PortariaUpdateComponent } from './portaria-update.component';

describe('Portaria Management Update Component', () => {
  let comp: PortariaUpdateComponent;
  let fixture: ComponentFixture<PortariaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let portariaFormService: PortariaFormService;
  let portariaService: PortariaService;
  let assuntoService: AssuntoService;
  let setorService: SetorService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PortariaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PortariaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PortariaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    portariaFormService = TestBed.inject(PortariaFormService);
    portariaService = TestBed.inject(PortariaService);
    assuntoService = TestBed.inject(AssuntoService);
    setorService = TestBed.inject(SetorService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Assunto query and add missing value', () => {
      const portaria: IPortaria = { id: 456 };
      const assunto: IAssunto = { id: 13748 };
      portaria.assunto = assunto;

      const assuntoCollection: IAssunto[] = [{ id: 29894 }];
      jest.spyOn(assuntoService, 'query').mockReturnValue(of(new HttpResponse({ body: assuntoCollection })));
      const additionalAssuntos = [assunto];
      const expectedCollection: IAssunto[] = [...additionalAssuntos, ...assuntoCollection];
      jest.spyOn(assuntoService, 'addAssuntoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      expect(assuntoService.query).toHaveBeenCalled();
      expect(assuntoService.addAssuntoToCollectionIfMissing).toHaveBeenCalledWith(
        assuntoCollection,
        ...additionalAssuntos.map(expect.objectContaining),
      );
      expect(comp.assuntosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Setor query and add missing value', () => {
      const portaria: IPortaria = { id: 456 };
      const setor: ISetor = { id: 16415 };
      portaria.setor = setor;

      const setorCollection: ISetor[] = [{ id: 27560 }];
      jest.spyOn(setorService, 'query').mockReturnValue(of(new HttpResponse({ body: setorCollection })));
      const additionalSetors = [setor];
      const expectedCollection: ISetor[] = [...additionalSetors, ...setorCollection];
      jest.spyOn(setorService, 'addSetorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      expect(setorService.query).toHaveBeenCalled();
      expect(setorService.addSetorToCollectionIfMissing).toHaveBeenCalledWith(
        setorCollection,
        ...additionalSetors.map(expect.objectContaining),
      );
      expect(comp.setorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const portaria: IPortaria = { id: 456 };
      const usuario: IUsuario = { id: 32104 };
      portaria.usuario = usuario;
      const updatedBy: IUsuario = { id: 28220 };
      portaria.updatedBy = updatedBy;
      const deletedBy: IUsuario = { id: 31753 };
      portaria.deletedBy = deletedBy;

      const usuarioCollection: IUsuario[] = [{ id: 19872 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario, updatedBy, deletedBy];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining),
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const portaria: IPortaria = { id: 456 };
      const assunto: IAssunto = { id: 15469 };
      portaria.assunto = assunto;
      const setor: ISetor = { id: 27512 };
      portaria.setor = setor;
      const usuario: IUsuario = { id: 698 };
      portaria.usuario = usuario;
      const updatedBy: IUsuario = { id: 12524 };
      portaria.updatedBy = updatedBy;
      const deletedBy: IUsuario = { id: 28833 };
      portaria.deletedBy = deletedBy;

      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      expect(comp.assuntosSharedCollection).toContain(assunto);
      expect(comp.setorsSharedCollection).toContain(setor);
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.usuariosSharedCollection).toContain(updatedBy);
      expect(comp.usuariosSharedCollection).toContain(deletedBy);
      expect(comp.portaria).toEqual(portaria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPortaria>>();
      const portaria = { id: 123 };
      jest.spyOn(portariaFormService, 'getPortaria').mockReturnValue(portaria);
      jest.spyOn(portariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: portaria }));
      saveSubject.complete();

      // THEN
      expect(portariaFormService.getPortaria).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(portariaService.update).toHaveBeenCalledWith(expect.objectContaining(portaria));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPortaria>>();
      const portaria = { id: 123 };
      jest.spyOn(portariaFormService, 'getPortaria').mockReturnValue({ id: null });
      jest.spyOn(portariaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ portaria: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: portaria }));
      saveSubject.complete();

      // THEN
      expect(portariaFormService.getPortaria).toHaveBeenCalled();
      expect(portariaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPortaria>>();
      const portaria = { id: 123 };
      jest.spyOn(portariaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ portaria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(portariaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAssunto', () => {
      it('Should forward to assuntoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assuntoService, 'compareAssunto');
        comp.compareAssunto(entity, entity2);
        expect(assuntoService.compareAssunto).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSetor', () => {
      it('Should forward to setorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(setorService, 'compareSetor');
        comp.compareSetor(entity, entity2);
        expect(setorService.compareSetor).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
