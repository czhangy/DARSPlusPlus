let state = {
  major: "",
  hash: "",
};

let getters = {
  major: (state) => state.major,
  hash: (state) => state.hash,
};

let mutations = {
  setMajor: (state, major) => {
    state.major = major;
  },
  clearUser: (state) => {
    state.major = "";
  },
  setHash: (state, hash) => {
    state.hash = hash;
  },
  clearHash: (state, hash) => {
    state.hash = "";
  }
};

export default {
  state,
  getters,
  mutations,
};
