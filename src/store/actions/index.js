import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getLanguages = createAsyncThunk("translate/language", async () => {
  const res = await api.get("getLanguages");

  return res.data.data.languages;
});

export const translateText = createAsyncThunk("translate", async (params) => {
  const data = new FormData();
  data.set("source_language", params.sourceLang.value);
  data.set("target_language", params.targetLang.value);
  data.set("text", params.text);

  const res = await api.post("/translate", data);
  //*Payload belirledik.
  return res.data.data;
});
