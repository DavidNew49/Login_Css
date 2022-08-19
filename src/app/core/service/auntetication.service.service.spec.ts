import { TestBed } from '@angular/core/testing';

import { AunteticationServiceService } from './auntetication.service.service';

describe('AunteticationServiceService', () => {
  let service: AunteticationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AunteticationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
