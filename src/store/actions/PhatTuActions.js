export const addNewPhatTu = (phatTu) => {
    return {
        type: 'ADD',
        payload: phatTu
    }
}

export const setPhatTu = (phatTu) => {
    return {
        type: 'SET',
        payload: phatTu
    }
}