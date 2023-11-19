import { arrayMove } from '@dnd-kit/sortable'
import { ContentType } from '../enums/contentType.enum'

export const contentReducer = (state, action) => {
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
            return state.filter(_ => _.id !== payload.id)
        case ContentType.MOVE_POSITION:
            const { activeId, overId } = payload
            const oldIndex = state.findIndex(_ => _.id === activeId)
            const newIndex = state.findIndex(_ => _.id === overId)

            return arrayMove(state, oldIndex, newIndex)
        default:
            return state
    }
}
