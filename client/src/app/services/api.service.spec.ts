import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let apiServiceMock: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService
      ]
    });
    apiServiceMock = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(apiServiceMock).toBeTruthy();
  });

  it('should perform GET request', () => {
    const dummyData = { name: 'Test' };
    apiServiceMock.get('/test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform POST request', () => {
    const dummyData = { name: 'Test' };
    apiServiceMock.post('/test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should perform DELETE request', () => {
    apiServiceMock.delete('/test').subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should perform PUT request', () => {
    const dummyData = { name: 'Test' };
    apiServiceMock.put('/test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });
});
