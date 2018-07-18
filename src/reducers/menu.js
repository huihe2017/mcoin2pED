let initialState = {}

export default function menu(state = initialState, action = {}) {

    switch (action.type) {
        case 'SET_MENU':
            state.level1 = []
            state.level2 = []

            action.data.list.map((obj) => {

                    state.level1.push(obj)
                    if (obj.childPermission) {
                        obj.childPermission.map((a) => {
                            if (a.parent === (action.data.id - 0)) {
                                state.level2.push(a)
                            }
                        })
                    }

            })
            // action.data.list.map((obj)=>{
            //     if(obj.parent === (action.data.id-0)){
            //         state.level2.push(obj)
            //     }
            // })
            return Object.assign({}, state, {})
        default:
            return state
    }

}
