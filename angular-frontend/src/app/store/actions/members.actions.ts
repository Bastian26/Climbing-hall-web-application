import { createAction, props } from '@ngrx/store';
import { Member } from '../../models/member';

// Get all Members
export const loadMembers = createAction('[Members] Load Members');

export const loadMembersSuccess = createAction(
  '[Members] Load Members Success',
  props<{ members: Member[] }>()
);
export const loadMembersFailure = createAction(
  '[Members] Load Members Failure',
  props<{ error: string }>()
);

//Get one Member
export const loadMember = createAction(
  '[Member] Load Member',
  props<{ id: number }>()
);

export const loadMemberSuccess = createAction(
  '[Member] Load Member Success',
  props<{ payload: Member }>()
);

export const loadMemberFail = createAction(
  '[Member] Load Member Fail',
  props<{ error: string }>()
);

//Add one Member
export const addMember = createAction(
  '[Member] Add Member',
  props<{ member: Member }>()
);

export const addMemberSuccess = createAction(
  '[Member] Add Member Success',
  props<{ member: Member }>()
);

export const addMemberFailure = createAction(
  '[Member] Add Member Failure',
  props<{ error: string }>()
);

// Remove one Member
export const removeMember = createAction(
  '[Member] Remove Member',
  props<{ id: number }>()
);

export const removeMemberSuccess = createAction(
  '[Member] Remove Member Success',
  props<{ id: number }>()
);
export const removeMemberFailure = createAction(
  '[Member] Remove Member Failure',
  props<{ error: string }>()
);

// add route
export const updateMember = createAction(
  '[Member] Update Route',
  props<{ member: Member }>()
);

export const updateMemberSuccess = createAction(
  '[Member] Update Member Success',
  props<{ member: Member }>()
);

export const updateMemberFail = createAction(
  '[Member] Update Member Fail',
  props<{ error: string }>()
);

// load specific route
export const getCurrentMember = createAction('[Member] Load Current Member');

export const updateCurrentMember = createAction(
  '[Member] Update Current Member',
  props<{ id: number }>()
);
