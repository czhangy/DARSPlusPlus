let state = {
  major: "",
};

let getters = {
  major: (state) => state.major,
};

let mutations = {
  setMajor: (state, major) => {
    state.major = major;
  },
  clearUser: (state) => {
    state.major = null;
  },
};

export default {
  state,
  getters,
  mutations,
};
