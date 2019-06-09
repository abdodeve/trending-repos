
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Repo } from '../../repo';
import { UtilsService } from '../../../utils/utils.service';

import { Injectable } from '@angular/core';

@Injectable()
export class RepoListService {

  constructor( private http: HttpClient,
               private utilsService: UtilsService ) { }


  /**
   * Fetch Repos
   * Consume Github's API: Search
   * GET /search/repositories
   * @returns Observable
   */
  fetch( page: number = null ): Observable <any> {
    const pageNumber = page ? `&page=${page}` : '' ; 
    const url             = `${environment.api}/search/repositories?q=created:>${this.utilsService.getDateOfLastMonth()}&sort=stars&order=desc${pageNumber}` ;
    const httpOptions = {
                          headers: new HttpHeaders({
                            'Accept'        : 'application/json',
                            'Content-Type'  : 'application/json',
                          })
                        };
    return this.http.get<any>(url, httpOptions) ;
  }

}