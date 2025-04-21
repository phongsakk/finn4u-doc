import z from "zod";

export type PostRequest = z.infer<typeof PostRequest>
export const PostRequest = z.object({
    topic: z.string(),
    data: z.any()
})