import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"

export const signup = createAsyncThunk("signupuser", async (body) => {
  const res = await fetch("https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
});

export const login = createAsyncThunk("loginuser", async (body) => {
  const res = await fetch("https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
});

export const updateLevel = createAsyncThunk(
  "updateLevel",
  async ({ level }, thunkAPI) => {
    try {
      console.log(thunkAPI.getState().auth.username);
      const response = await fetch("https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus/user/updatelevel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: thunkAPI.getState().auth.username,
          level: level,
        }),
      });

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
        "https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus/progress/startround",
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
      const response = await fetch("https://us-central1-lofty-seer-386909.cloudfunctions.net/gcp-func-novus/progress/endround", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: thunkAPI.getState().auth.username,
          level: level,
        }),
      });
      const data = await response.json();
      console.log(data);

      return data;
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
    completed:false
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
      state.completed=action.payload.completed;
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
    completeGame:(state)=>{
      state.completed=true;
    }
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, { payload: { error, msg } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
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
          error,
          message,
          token,
          username,
          name,
          level,
          isAdmin,
          isAuth,
          r1s,
          completed
        },
      }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = message;
        state.token = token;
        state.username = username;
        state.name = name;
        state.level = level;
        state.initialLevel = level;
        state.isAdmin = isAdmin;
        state.isAuth = isAuth;
        state.isTimer = true;
        state.initialTime = r1s;
        state.completed=completed

        localStorage.setItem("msg", message);
        localStorage.setItem("token", token);
      }
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isAuth = false;
    },
    [updateLevel.fulfilled]: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const {
  updateAuthData,
  resumeGame,
  resetGame,
  addToken,
  addUser,
  logout,completeGame
} = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser=(state)=>state.auth.user
// export const selectCurrentToken=(state)=>state.auth.token
