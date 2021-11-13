import { addPost, showAllPosts, likePost, dislikePost, donatePost } from "..";
import { Context } from "near-sdk-as";

describe("NEARForum", () => {
  it("test for addPost", () => {
    addPost("hello world");
    const res = showAllPosts();
    assert(res[0].content == "hello world");
  });

  it("test for likePost", () => {
    addPost("hello world");
    const res = showAllPosts();
    const post = likePost(res[0].id);
    assert(post.likes.includes(Context.sender));
  });

  it("test for dislikePost", () => {
    addPost("hello world");
    const res = showAllPosts();
    const post = dislikePost(res[0].id);
    assert(!post.likes.includes(Context.sender));
  });

  it("test for donatePost", () => {
    addPost("hello world");
    const res = showAllPosts();
    const post = donatePost(res[0].id);
    assert(post.donateCount === 1);
  });
});
