import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../../models/member';
import { loadMember } from '../../../../store/actions/members.actions';
import { AppState } from '../../../../store/model/app-state-model';
import { Store } from '@ngrx/store';
import { getMember } from '../../../../store/selectors/members.selectors';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as MemberActions from '../../../../store/actions/members.actions';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
  member?: Member;
  members?: Member[] = [];
  subscription?: Subscription;
  onDestroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private updates$: Actions
  ) {
    updates$
      .pipe(
        ofType(MemberActions.loadMembersSuccess),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.store
          .select(getMember)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((member) => {
            this.member = member;
          });
        this.subscription = this.activatedRoute.params.subscribe((params) =>
          this.getMemberById(parseInt(params['id']))
        );
      });
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) =>
      this.getMemberById(parseInt(params['id']))
    );

    this.store
      .select(getMember)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((member) => {
        this.member = member;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getMemberById(id: number) {
    this.store.dispatch(loadMember({ id }));
  }
}
