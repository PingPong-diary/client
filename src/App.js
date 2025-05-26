import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryList from "./pages/DiaryList";
import Main from "./pages/Main";
import CalendarPage from "./pages/CalendarPage";
import DailyWrite from "./pages/DailyWrite";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diary" element={<DiaryWrite />} />
          <Route path="/diary/list" element={<DiaryList />} />
          <Route path="/daily/write" element={<DailyWrite />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
