import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../models/member';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberFormComponent } from './add-member-form/add-member-form.component';
import { AppState } from '../../../store/model/app-state-model';
import { Store } from '@ngrx/store';
import { getAllMembers } from '../../../store/selectors/members.selectors';
import {
  loadMembers,
  removeMember,
} from '../../../store/actions/members.actions';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as MemberActions from '../../../store/actions/members.actions';

@Component({
  selector: 'app-members',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'],
})
export class MemberTableComponent implements OnInit, OnDestroy {
  title = 'Member-Table';
  dataSource!: MatTableDataSource<Member>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  onDestroy$ = new Subject<void>();

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'details',
    'delete',
  ];

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    updates$: Actions
  ) {
    updates$
      .pipe(ofType(MemberActions.addMemberSuccess), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.store.dispatch(loadMembers());
        this.store
          .select(getAllMembers)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((data) => {
            this.dataSource = new MatTableDataSource<Member>(data);
          });
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadMembers());
    this.store
      .select(getAllMembers)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<Member>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteMember(id: number) {
    this.store.dispatch(removeMember({ id }));
  }

  openAddFormDialog(enterAnimation: any) {
    this.dialog.open(AddMemberFormComponent, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: enterAnimation,
      width: '50%',
    });
  }
}
