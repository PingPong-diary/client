import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryList from "./pages/DiaryList";
import Main from "./pages/Main";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/diary-list" element={<DiaryList />} />
          <Route path="/diary" element={<DiaryWrite />} />
          <Route path="/" element={<Main />} />
          <Route path="/diary/list" element={<DiaryList />} />
          <Route path="/daily" element={<dailyWrite />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
