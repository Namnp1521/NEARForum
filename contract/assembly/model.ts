import { context, PersistentMap, PersistentVector } from "near-sdk-as";

@nearBindgen
export class Post {
  sender: string;
  comments: Array<Comment>;
  time: string;
  likes: Array<string>;
  donateCount: number;
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

@nearBindgen
export class Comment {
  sender: string;
  constructor(public content: string) {
    this.sender = context.sender;
  }
}

export const postsForStore = new PersistentMap<string, Post>("postsForStore");
export const idPostsForShow = new PersistentVector<string>("idPostsForShow");
