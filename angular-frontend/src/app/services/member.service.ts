import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../models/member";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getMembers(): Observable<Member[]> {
  return this.http.get<Member[]>(`${this.apiServerUrl}/members`);
  }

  public getMemberById(memberId: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiServerUrl}/member/${memberId}`);
  }

  public addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiServerUrl}/member`, member);
  }

  public updateMember(member: Member, memberId: number | undefined): Observable<Member> {
    console.log(member, memberId)
    return this.http.put<Member>(`${this.apiServerUrl}/member/${memberId}`, member);
  }

  public deleteMember(memberId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/member/${memberId}`);
  }

}
