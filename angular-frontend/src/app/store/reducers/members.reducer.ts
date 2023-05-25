import { Member } from '../../models/member';
import { Action, createReducer, on } from '@ngrx/store';
import * as MemberActions from '../actions/members.actions';

export interface MembersState {
  members: Member[];
  member: Member | undefined;
  error: string;
  loading: boolean;
  currentMember: Member | undefined;
}

const initialState: Readonly<MembersState> = {
  members: [],
  member: undefined,
  error: '',
  loading: false,
  currentMember: {},
};

export const membersReducer = createReducer<MembersState>(
  initialState,
  on(MemberActions.loadMembers, (state): MembersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(MemberActions.loadMembersSuccess, (state, action): MembersState => {
    return {
      ...state,
      members: action.members,
      loading: false,
    };
  }),
  on(MemberActions.loadMembersFailure, (state, action): MembersState => {
    return {
      ...state,
      members: [],
      loading: false,
      error: action.error,
    };
  }),

  //Load one Member TODO: Failure
  on(MemberActions.loadMember, (state, { id }): MembersState => {
    return {
      ...state,

      member: state.members.find((member) => member.id === id),
      loading: true,
    };
  }),
  on(MemberActions.loadMemberSuccess, (state, { payload }): MembersState => {
    return {
      ...state,
      members: [...state.members, payload],
      loading: false,
    };
  }),

  //Add Member TODO:Failure
  on(MemberActions.addMember, (state, { member }): MembersState => {
    return {
      ...state,
      members: [...state.members, member],
      loading: true,
    };
  }),

  on(MemberActions.addMemberSuccess, (state, { member }): MembersState => {
    return {
      ...state,
      members: [...state.members, member],
      loading: false,
    };
  }),

  //Remove Member TODO: Success and Failure
  on(MemberActions.removeMember, (state, { id }): MembersState => {
    return {
      ...state,
      members: state.members.filter(
        (members) => members.id !== parseInt(id.toString())
      ),
      loading: true,
    };
  }),

  on(MemberActions.updateMember, (state, { member }): MembersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(MemberActions.updateMemberSuccess, (state, action): MembersState => {
    return {
      ...state,
      currentMember: action.member,
      loading: false,
    };
  }),
  on(MemberActions.updateMemberFail, (state, action): MembersState => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  //Get Current member
  on(MemberActions.getCurrentMember, (state): MembersState => {
    return {
      ...state,
      // loading:true,
    };
  }),

  on(MemberActions.updateCurrentMember, (state, { id }): MembersState => {
    return {
      ...state,
      currentMember: state.members.find((member) => member.id === id),

      // loading: false,
    };
  })
);

export function reducer(state: MembersState, action: Action) {
  return membersReducer(state, action);
}
