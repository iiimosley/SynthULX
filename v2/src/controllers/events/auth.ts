let currentUser = null;
let editBool = false;

module.exports.checkUser = (uid) => {
  currentUser = uid;
  return currentUser;
};

$(document).on("click", "#login", () => {
  AuthFactory.authUser().then((account) => (currentUser = account.user.uid));
});

$(document).on("click", "#logout", () => AuthFactory.logout());
