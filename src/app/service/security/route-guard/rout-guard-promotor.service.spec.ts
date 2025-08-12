import { TestBed } from '@angular/core/testing';
import { RouteGuardPromotorService } from './rout-guard-promotor.service';


describe('RoutGuardPromotorService', () => {
  let service: RouteGuardPromotorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardPromotorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
