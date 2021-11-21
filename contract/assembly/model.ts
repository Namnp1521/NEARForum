import { context, PersistentMap, PersistentVector } from "near-sdk-as";

@nearBindgen
/**
 * Class Post includes all information of a post
 */
export class Post {
  sender: string; // who create this post
  comments: Array<Comment>; // list comment of post
  time: string;
  likes: Array<string>; // list who like this post
  donateCount: number; // amount this post has been donated
  constructor(public content: string, public id: string) {
    this.sender = context.sender;
    this.comments = [];
    this.time = context.blockTimestamp.toString();
    this.likes = [];
    this.donateCount = 0;
  }

  donate(): void {
    this.donateCount++;
  }

  addComment(newComment: string): void {
    let comment = new Comment(newComment);
    this.comments.push(comment);
  }

  like(): void {
    if (!this.likes.includes(context.sender)) {
      this.likes.push(context.sender);
    }
  }

  disLike(): void {
    if (this.likes.includes(context.sender)) {
      let id = this.likes.findIndex((data) => data == context.sender);
      if (id != -1) {
        this.likes.splice(id, 1);
      }
    }
  }
}

/**
 * Class Comment include: sender and content of comment
 */
@nearBindgen
export class Comment {
  sender: string;
  constructor(public content: string) {
    this.sender = context.sender;
  }
}

// PersistentMap stote all post created
export const postsForStore = new PersistentMap<string, Post>("postsForStore");
// PersistentVector store all id post created
export const idPostsForShow = new PersistentVector<string>("idPostsForShow");
