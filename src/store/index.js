import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { queryTypes } from "@/helpers/constants";

const currentCursorByType = (type, state) => {
  if (state.pagination[type].currentPage === 1) {
    return null;
  } else {
    const cursorIndex = state.pagination[type].currentPage - 2;
    return state.pagination[type].cursors[cursorIndex];
  }
};

const originalState = {
  pagination: {
    resultsPerPage: 10,
    [queryTypes.REPOS]: {
      cursors: [],
      currentPage: 1
    },
    [queryTypes.ISSUES]: {
      cursors: [],
      currentPage: 1
    },
    [queryTypes.USERS]: {
      cursors: [],
      currentPage: 1
    }
  }
};

export default new Vuex.Store({
  state: { ...originalState },
  mutations: {
    CLEAN_PAGINATION(state) {
      state.pagination = { ...originalState.pagination };
    },
    UPDATE_CURSORS(state, { type, cursor, page }) {
      const oldCursor = state.pagination[type].cursors;

      if (oldCursor.length === page - 2) {
        Vue.set(oldCursor, page - 2, cursor);
      }
      state.pagination[type].currentPage = page;
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
    reposCurrentCursor: state => currentCursorByType(queryTypes.REPOS, state),
    issuesCurrentCursor: state => currentCursorByType(queryTypes.ISSUES, state),
    usersCurrentCursor: state => currentCursorByType(queryTypes.USERS, state)
  }
});
