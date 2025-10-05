import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Media } from '../api/shared';
import { UpdloadDto, isUploadEntryFieldDto } from '../api/dtos/upload';

@Injectable({
  providedIn: 'root',
})
export class UploadApiService {
  private readonly http = inject(HttpClient);

  upload(data: UpdloadDto): Observable<Media[]> {
    const formData = new FormData();

    for (let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i]);
    }

    if (isUploadEntryFieldDto(data)) {
      formData.append('ref', data.ref);
      formData.append('refId', data.refId);
      formData.append('field', data.field);
      if (data.source) {
        formData.append('source', data.source);
      }
    }

    return this.http.post<Media[]>(`${environment.apiUrl}/upload`, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/upload/files/${id}`);
  }
}
