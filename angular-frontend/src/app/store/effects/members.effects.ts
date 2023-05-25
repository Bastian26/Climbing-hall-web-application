import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as MembersActions from '../actions/members.actions';
import { MemberService } from '../../services/member.service';

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions,
    private memberService: MemberService
  ) {}

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.loadMembers),
      switchMap(() =>
        this.memberService.getMembers().pipe(
          map((members) => MembersActions.loadMembersSuccess({ members })),
          catchError((error) => of(MembersActions.loadMembersFailure(error)))
        )
      )
    )
  );

  removeMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.removeMember),
      switchMap((member) =>
        this.memberService.deleteMember(member.id).pipe(map(() => member.id))
      ),
      map(
        (id) => MembersActions.removeMemberSuccess({ id }),
        catchError((error) => of(MembersActions.removeMemberFailure(error)))
      )
    )
  );

  addMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.addMember),
      switchMap((data) => this.memberService.addMember(data.member)),
      map(
        (member) => MembersActions.addMemberSuccess({ member }),
        catchError((error) => of(MembersActions.addMemberFailure(error)))
      )
    )
  );

  updateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersActions.updateMember),
      switchMap((data) =>
        this.memberService.updateMember(data.member, data.member.id)
      ),
      map(
        (member) => MembersActions.updateMemberSuccess({ member }),
        catchError((error) => of(MembersActions.updateMemberFail(error)))
      )
    )
  );
}
