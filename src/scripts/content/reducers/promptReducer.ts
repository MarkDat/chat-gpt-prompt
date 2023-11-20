import { arrayMove } from '@dnd-kit/sortable'
import { ContentType } from '../enums/contentType.enum'
import { v4 as uuidv4 } from 'uuid';

export const promptReducer = (state, action) => {
    const { payload } = action

    switch (action.type) {
        case ContentType.UPDATE_ITEM:
            if (!state) return []

            return state.map(preVal => {
                if (preVal.id === payload.id) {
                    preVal.content = payload.newContent
                    return preVal
                }

                return preVal
            })
        case ContentType.DELETE_ITEM:
            const item = state.find(_ => _.id === payload.id);
            const filter = state.filter(_ => _.id !== payload.id) ?? [];
            if(item.current && !!filter[0]) filter[0].current = true;

            return filter;
        case ContentType.MOVE_POSITION:
            const { activeId, overId } = payload
            const oldIndex = state.findIndex(_ => _.id === activeId)
            const newIndex = state.findIndex(_ => _.id === overId)

            return arrayMove(state, oldIndex, newIndex)
        case ContentType.ADD_ITEM:
            state.unshift({id: uuidv4(), ...payload});

            return arrayMove(state, 0, 0);

        case ContentType.CHOOSE_GROUP:
            const currentGroup = state.find(_ => _.current);
            if(currentGroup && currentGroup.id === payload.id) return state;

            return state.map(e => {
                if(currentGroup && currentGroup.id === e.id) e.current = false;
                if(e.id === payload.id) e.current = true;

                return e;
            });
        
        default:
            return state
    }
}
