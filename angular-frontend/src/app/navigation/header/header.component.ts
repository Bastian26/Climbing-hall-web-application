import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Member } from '../../models/member';
import {
  loadMembers,
  updateCurrentMember,
} from '../../store/actions/members.actions';
import { Store } from '@ngrx/store';
import { getAllMembers } from '../../store/selectors/members.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  onDestroy$ = new Subject<void>();
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMembers());
    this.store
      .select(getAllMembers)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: Member[]) => {
        this.members = data;
      });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onSelectEvent(id: number) {
    this.store.dispatch(updateCurrentMember({ id }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
