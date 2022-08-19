import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AunteticationServiceService {

  private helper: JwtHelperService = new JwtHelperService();
  private currentAlexiSubject?: BehaviorSubject<IUser>;
  
  public currentAlexi?: Observable<IUser>;
  
  constructor(private http: HttpClient) { }




  login(username: string, password: string) {
    return this.http
      .post(
        `${environment.apiAuth}`,
        { username, password },
        { responseType: 'text' }
      )
      .pipe(
        tap((token) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setToken(token);
          // console.log('user: ' + JSON.stringify(res, null, 2));
          // const user = this.getCurrentUser(res);
          // const session = this.getToken();
          // return session.user;
        })
      );
  }


  getToken() {
    const rawToken = localStorage.getItem(environment.localStorageTokenKey);
    return rawToken;
  }

  setToken(token: string) {
    localStorage.setItem(environment.localStorageTokenKey, token);
    this.currentAlexiSubject?.next(this.getUserToken());
  }



  getUserToken(): any {
    const token = this.getToken();
    if (token === null)
      return null;

    const decodedToken = this.helper.decodeToken(token);
    // console.log('decodedToken: ' + JSON.stringify(decodedToken, null, 2));
    // console.log('decodedToken1: ' + JSON.stringify(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'], null, 2));
    // console.log('decodedToken2: ' + JSON.stringify(decodedToken['sid'], null, 2));

    // const expirationDate = this.helper.getTokenExpirationDate(rawToken);
    // const isExpired =this.helper.isTokenExpired(rawToken);

    const user: IUser = {
      id: decodedToken['sid'],
      userName: decodedToken['name'],
      name: decodedToken['givenname'],
      lastName: decodedToken['surname'],
      email: decodedToken['emailaddress'],
      fullName: `${decodedToken['givenname']} ${decodedToken['surname']}`,
      active: true,
      roles: Array.isArray(decodedToken['role']) ? decodedToken['role'] : [decodedToken['role']],
    };

    return user;
  }
}
