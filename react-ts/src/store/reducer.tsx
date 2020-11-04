console.log(window.location.pathname)
const defaultState = {
    defaultActiveKeyHome :  window.location.pathname === '/login'? '1' : '2',
}  



export default (state = defaultState,action: any)=>{  
    console.log(action)
    const {type,data} = action
    switch(type) {
        case "CHANGEACTIVEKEY":
            state.defaultActiveKeyHome = data
            break;
    }
    return state
}