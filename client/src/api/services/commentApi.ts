import { api } from "..";

import { IComment } from "../../models/comment";
import { IFormComment } from "../../models/forms/comment";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IComment[], { id?: string;  }>({
      query: ({ id = ""}) => {
        return {
          url: `/comments/${id}`
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Comment" as const,
                id: _id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    createComment: builder.mutation<
      IComment,
      { id?: string; body: IFormComment }
    >({
      query({ body, id = ""}) {
        return {
          url: `/comments/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});
export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
