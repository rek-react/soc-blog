import { api } from "..";

import { IPost } from "../../models/post";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], null>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Post" as const, id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getMyPosts: builder.query<IPost[], null>({
      query: () => "/posts/user/me",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Post" as const, id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPost: builder.query<IPost, { id?: string; isEdit: boolean }>({
      query: ({id = '',isEdit})=> {
        return {
          url: `posts/${id}`,
          params: {
            isEdit
          }
        }
      }
    }),
    getTags: builder.query<{ id: string; tags: string[] }[], null>({
      query: () => `/posts/tags`,
    }),
    createPost: builder.mutation<IPost, FormData>({
      query(body) {
        return {
          url: "/posts",
          method: "POST",
          body,
        };
      },
    }),
    updatePost: builder.mutation<IPost, { id?: string; body: FormData }>({
      query({ id = '', body }) {
        return {
          url: `/posts/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deletePost: builder.mutation<IPost, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useGetTagsQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useGetPostQuery,
} = postApi;
