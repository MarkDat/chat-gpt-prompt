import { ContentType } from '../enums/contentType.enum'

export const movePosition = payload => {
    return {
        type: ContentType.MOVE_POSITION,
        payload
    }
}

export const updateItems = payload => {
    return {
        type: ContentType.UPDATE_ITEM,
        payload
    }
}

export const deleteItem = payload => {
    return {
        type: ContentType.DELETE_ITEM,
        payload
    }
}
