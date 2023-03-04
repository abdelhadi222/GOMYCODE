import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://zoo-api-nhvk.onrender.com/" }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data
      }),
    }),
    checktoken: builder.mutation({
      query: (data) => ({
        url: "auth/checktoken",
        method: "POST",
        headers: { "token": `${data}` },
      }),
    }),
    getTodo: builder.query({
      query: () => "todo",
    }),
    postTodo: builder.mutation({
      query: (data) => ({
        url: "todo/add",
        method: "POST",
        body: data
      }),
    }),
    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `todo/delete/${data}`,
        method: "DELETE",
      }),
    })

  })
})

export const { useGetTodoQuery, usePostTodoMutation, useDeleteTodoMutation, useLoginMutation, useSignupMutation, useChecktokenMutation } = apiSlice