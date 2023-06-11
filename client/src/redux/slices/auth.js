import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"

export const signup = createAsyncThunk("signupuser", async (body) => {
  const res = await fetch(
    "https://tasty-gold-turtleneck.cyclic.app/user/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
});

export const login = createAsyncThunk("loginuser", async (body) => {
  const res = await fetch(
    "https://tasty-gold-turtleneck.cyclic.app/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
});

export const updateLevel = createAsyncThunk(
  "updateLevel",
  async ({ level }, thunkAPI) => {
    try {
      console.log(thunkAPI.getState().auth.username);
      const response = await fetch(
        "https://tasty-gold-turtleneck.cyclic.app/user/updatelevel",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: thunkAPI.getState().auth.username,
            level: level,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      return level;
    } catch (err) {
      console.log(err);
    }
  }
);

export const startRound = createAsyncThunk(
  "startRound",
  async ({ level }, thunkAPI) => {
    try {
      console.log("start round");
      const response = await fetch(
        "https://tasty-gold-turtleneck.cyclic.app/progress/startround",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: thunkAPI.getState().auth.username,
            level: level,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const endRound = createAsyncThunk(
  "endRound",
  async ({ level }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://tasty-gold-turtleneck.cyclic.app/progress/endround",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: thunkAPI.getState().auth.username,
            level: level,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateCompletion = createAsyncThunk(
  "updateCompletion",
  async ({ complete }, thunkAPI) => {
    try {
      console.log(thunkAPI.getState().auth.username);
      const response = await fetch(
        "https://tasty-gold-turtleneck.cyclic.app/user/complete",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: thunkAPI.getState().auth.username,
            complete,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      return complete;
    } catch (err) {
      console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    name: "",
    username: "",
    level: 0,
    initialLevel: 0,
    isAdmin: 0,
    isAuth: false,
    loading: false,
    error: "",
    msg: "",
    isTimer: false,
    initialTime: null,
    completed: 0,
    gameon: true,
    err: "",
    success: "",
  },
  reducers: {
    updateAuthData: (state, action) => {
      state.level = action.payload.level;
      state.isAdmin = action.payload.isAdmin;
      state.isAuth = action.payload.isAuth;
      state.initialLevel = action.payload.level;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.isTimer = action.payload.isTimer;
      state.initialTime = action.payload.initialTime;
      state.completed = action.payload.completed;
      state.gameon = action.payload.gameon;
    },
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
    resumeGame: (state) => {
      state.initialLevel = 0;
    },
    resetGame: (state) => {
      state.initialLevel = 0;
      state.level = 0;
    },
    completeGame: (state) => {
      state.completed = true;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setgame: (state) => {
      state.gameon = true;
    },
    unsetgame: (state) => {
      state.gameon = false;
    },
    seterr: (state, action) => {
      state.err = action.payload.err;
    },
    setsuccess: (state, action) => {
      state.success = action.payload.success;
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, { payload: { success, message } }) => {
      state.loading = false;
      if (!success) {
        state.err = message;
      } else {
        state.success = message;
      }
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
    },

    [login.pending]: (state, action) => {
      state.loading = true;
      state.isAuth = false;
    },
    [login.fulfilled]: (
      state,
      {
        payload: {
          success,
          message,
          token,
          username,
          name,
          level,
          isAdmin,
          isAuth,
          r1s,
          completed,
        },
      }
    ) => {
      state.loading = false;
      if (!success) {
        state.err = message;
      } else {
        state.token = token;
        state.username = username;
        state.name = name;
        state.level = level;
        state.initialLevel = level;
        state.isAdmin = isAdmin;
        state.isAuth = isAuth;
        state.isTimer = true;
        state.initialTime = r1s;
        state.completed = completed;
        state.gameon = level == 0 ? false : true;

        localStorage.setItem("msg", message);
        localStorage.setItem("token", token);
      }
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isAuth = false;
    },
    [updateLevel.pending]: (state) => {
      state.loading = true;
    },
    [updateLevel.fulfilled]: (state, action) => {
      state.level = action.payload;
      if (action.payload == 1 || action.payload == 3) {
        state.gameon = true;
      } else {
        state.gameon = false;
      }
      state.loading = false;
    },
    [updateLevel.rejected]: (state) => {
      state.loading = false;
    },
    [updateCompletion.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCompletion.fulfilled]: (state, action) => {
      state.loading = false;
      state.completed = action.payload;
    },
    [updateCompletion.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  updateAuthData,
  resumeGame,
  resetGame,
  addToken,
  addUser,
  logout,
  completeGame,
  startLoading,
  stopLoading,
  setgame,
  unsetgame,
  seterr,setsuccess
} = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser=(state)=>state.auth.user
// export const selectCurrentToken=(state)=>state.auth.token
