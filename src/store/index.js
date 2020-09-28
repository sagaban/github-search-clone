import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const currentCursorByType = (type, state) => {
  if (state.pagination[type + "CurrentPage"] === 1) {
    return null;
  } else {
    return state.pagination[type + "Cursors"][
      state.pagination[type + "CurrentPage"] - 2
    ];
  }
};

const originalState = {
  pagination: {
    resultsPerPage: 10,
    reposCursors: [],
    issuesCursors: [],
    usersCursors: [],
    reposCurrentPage: 1,
    issuesCurrentPage: 1,
    usersCurrentPage: 1
  }
};

export default new Vuex.Store({
  state: { ...originalState },
  mutations: {
    CLEAN_PAGINATION(state) {
      state.pagination = { ...originalState.pagination };
    },
    UPDATE_CURSORS(state, { type, cursor, page }) {
      const oldCursor = state.pagination[type + "Cursors"];

      if (oldCursor.length === page - 2) {
        Vue.set(oldCursor, page - 2, cursor);
      }
      state.pagination[type + "CurrentPage"] = page;
    }
  },
  actions: {
    cleanPagination({ commit }) {
      commit("CLEAN_PAGINATION");
    },
    updateCursor({ commit }, { type, cursor, page }) {
      commit("UPDATE_CURSORS", { type, cursor, page });
    }
  },
  getters: {
    reposCurrentCursor: state => currentCursorByType("repos", state),
    issuesCurrentCursor: state => currentCursorByType("issues", state),
    usersCurrentCursor: state => currentCursorByType("users", state)
  }
});
