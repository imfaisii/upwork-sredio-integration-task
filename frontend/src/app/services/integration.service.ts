import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  private readonly apiUrl = `${environment.domain}/api/integrations`;

  constructor(private http: HttpClient) {}

  index = (): Observable<any> => this.http.get<any>(this.apiUrl);

  destroy = (): Observable<any> => this.http.delete(this.apiUrl);
}
