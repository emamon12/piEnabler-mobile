const initState = {};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "ROLE_CHANGE_SUCC":
      return {
        ...state,
        roleErr: null
      };
    case "ROLE_CHANGE_ERR":
      return {
        ...state,
        roleErr: "Role Change Unsuccessful"
      };
    case "EMAIL_ERR":
      return {
        ...state,
        roleErr: "Email Provided Is Not Used"
      };
    default:
      return state;
  }
};

export default adminReducer;
