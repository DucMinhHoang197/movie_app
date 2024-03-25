import { API_TOKEN } from "../constants/movieDB";
export const generateRequestAction = (method, url) => {
  const options = {
    method,
    url,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDc5ZGVhOGM2MGRhYTAxYzM1N2QyYmRlYmQ4ZGQ2ZiIsInN1YiI6IjY1ZjUwZDk2YTRhZjhmMDE2NDAyMGFkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9r0WNC0irGgNPRW_QgG46ke0wBDaLGYeXjFnLX6OunA",
    },
  };
};
