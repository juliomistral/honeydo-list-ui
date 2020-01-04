import * as fromRoot from 'src/app/root-store/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const getRootState = createFeatureSelector<fromRoot.State>(
    fromRoot.featureKey
);

export const selectCurrentListId = createSelector(
    getRootState,
    (state) => state.currentListId
);
