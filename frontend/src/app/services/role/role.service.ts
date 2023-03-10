import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role } from 'src/app/common/role/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = 'http://localhost:8080/api/roles';

  rolesData: Role[];

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<any> {
    return this.httpClient.get<Role[]>(this.baseUrl).pipe(
      map(response => this.rolesData = response)
    )
  }

  getRoleById(id: any): Observable<any> {
    const roleUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Role>(roleUrl)
  }


}

