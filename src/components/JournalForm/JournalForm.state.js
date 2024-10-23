export const INITIAL_STATE = {
  isValid: {
    title: true,
    date: true,
    text: true,
  },

  values: {
    title: "",
    date: "",
    text: "",
    tag: "",
    userId: undefined,
  },

  isReadyFormToSubmit: false,
};

export function reduceForm(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isReadyFormToSubmit: false,
      };
    case "RESET_VALIDATE":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const validTitle = state.values.title?.trim().length;
      const validDate = state.values.date;
      const validText = state.values.text?.trim().length;

      return {
        ...state,
        values: {
          ...state.values,
          userId: action?.userId,
        },

        isValid: {
          title: validTitle,
          date: validDate,
          text: validText,
        },

        isReadyFormToSubmit: validTitle && validDate && validText,
      };
    }
  }
}
