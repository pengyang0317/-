console.log(window.location.pathname)
const defaultState = {
    defaultActiveKeyHome :  window.location.pathname === '/login'? '1' : '2',
}  //默认数据
export default (state = defaultState,action: any)=>{  //就是一个方法函数
    console.log(action)
    const {type,data} = action
    switch(type) {
        case "CHANGEACTIVEKEY":
            state.defaultActiveKeyHome = data
            break;
    }
    return state
}