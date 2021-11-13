beforeAll(async function () {
  // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
  const near = await nearlib.connect(nearConfig);
  window.accountId = nearConfig.contractName;
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["showAllPosts"],
    changeMethods: [
      "addPost",
      "addComment",
      "likePost",
      "dislikePost",
      "donatePost",
    ],
    sender: window.accountId,
  });

  window.walletConnection = {
    requestSignIn() {},
    signOut() {},
    isSignedIn() {
      return true;
    },
    getAccountId() {
      return window.accountId;
    },
  };
});

test("showAllPosts", async () => {
  const res = await window.contract.showAllPosts();
  expect(res.length).toEqual(0);
});

test("addPost", async () => {
  await window.contract.addPost({ content: "hello world" });
  const res = await window.contract.showAllPosts();
  expect(res[0].content).toEqual("hello world");
});

test("likePost", async () => {
  await window.contract.addPost({ content: "hello world" });
  const res = await window.contract.showAllPosts();
  const post = await window.contract.likePost({ idPost: res[0].id });
  expect(post.likes.length).toEqual(1);
});

test("dislikePost", async () => {
  await window.contract.addPost({ content: "hello world" });
  const res = await window.contract.showAllPosts();
  const post = await window.contract.dislikePost({ idPost: res[0].id });
  expect(post.likes.length).toEqual(0);
});

test("donatePost", async () => {
  await window.contract.addPost({ content: "hello world" });
  const res = await window.contract.showAllPosts();
  const post = await window.contract.donatePost({ idPost: res[0].id });
  expect(post.donateCount).toEqual(1);
});
