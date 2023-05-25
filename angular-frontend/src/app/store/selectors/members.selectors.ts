import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembersState } from '../reducers/members.reducer';

export const MemberState = createFeatureSelector<MembersState>('members');

export const getAllMembers = createSelector(
  MemberState,
  (state: MembersState) => state.members
);

export const getMember = createSelector(MemberState, (state) => state.member);

export const getCurrentMember = createSelector(
  MemberState,
  (state) => state.currentMember
);
