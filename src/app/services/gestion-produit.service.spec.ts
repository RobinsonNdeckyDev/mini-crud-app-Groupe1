import { TestBed } from '@angular/core/testing';

import { GestionProduitService } from './gestion-produit.service';

describe('GestionProduitService', () => {
  let service: GestionProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
