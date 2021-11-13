import { math, base64, logging } from "near-sdk-as";
import { Post, postsForStore, idPostsForShow } from "./model";

const POST_LIMIT = 10;

const POST_SIZE: u32 = 16;

export function generatePostNumber(): string {
  let buf = math.randomBuffer(POST_SIZE);
  let b64 = base64.encode(buf);
  return b64;
}

export function addPost(content: string): void {
  let id = generatePostNumber();
  const message = new Post(content, id);
  postsForStore.set(id, message);
  idPostsForShow.push(id);
}

export function addComment(content: string, idPost: string): Post {
  let post = checkPost(idPost);
  post.addComment(content);
  postsForStore.set(idPost, post);
  logging.log("Comment success!");
  return post;
}

export function showAllPosts(): Post[] {
  const numMessages = min(POST_LIMIT, idPostsForShow.length);
  const startIndex = idPostsForShow.length - numMessages;
  const result = new Array<Post>(numMessages);
  for (let i = 0; i < numMessages; i++) {
    let post = postsForStore.get(idPostsForShow[i + startIndex]);
    if (!post) {
      break;
    }
    result[i] = post;
  }
  return result;
}

export function likePost(idPost: string): Post {
  let post = checkPost(idPost);
  post.like();
  postsForStore.set(idPost, post);
  logging.log("Like success!");
  return post;
}

export function dislikePost(idPost: string): Post {
  let post = checkPost(idPost);
  post.disLike();
  postsForStore.set(idPost, post);
  logging.log("Like success!");
  return post;
}

export function clearAllPosts(): void {
  for (let i = 0; i < idPostsForShow.length; i++) {
    let post = postsForStore.get(idPostsForShow[i]);
    if (!post) {
      break;
    }
    postsForStore.delete(idPostsForShow[i]);
  }

  while (idPostsForShow.length > 0) {
    idPostsForShow.pop();
  }
}

export function donatePost(idPost: string): Post {
  let post = checkPost(idPost);
  post.donate();
  postsForStore.set(idPost, post);
  logging.log("Donate success!");
  return post;
}

export function checkPost(idPost: string): Post {
  let post = postsForStore.get(idPost);
  if (!post) {
    logging.log("Post not found!");
    throw null;
  }
  return post;
}
