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
