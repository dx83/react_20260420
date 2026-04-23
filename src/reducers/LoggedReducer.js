const initialState = {
    counter: 1, // 그냥 넣어본 변수
    logged: 0,
    token: "",
};

const LoggedReducer = (state = initialState, action) => {
    switch (action.type) {
        // dispatch({type : "LOGIN", payload : 토큰})
        case "LOGIN":
            sessionStorage.setItem("token", action.payload);
            return {
                ...state,
                counter: state.counter + 1,
                logged: 1,
                token: action.payload
            };
        // dispatch({type : "LOGOUT"})
        case "LOGOUT":
            sessionStorage.removeItem("token");
            return {
                ...state,
                counter: state.counter + 1,
                logged: 0,
                token: ""
            };
        default:
            // 새로고침 시에도 로그인 상태 유지
            if (sessionStorage.getItem("token")) {
                return {
                    ...state,
                    logged: 1,
                    token: sessionStorage.getItem("token")
                };
            }
            return state;
    }
}

export default LoggedReducer;