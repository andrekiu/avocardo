import { withAdminSession } from "../../chrome_extension/auth/Session.js";

export default withAdminSession(async (req, res) => {
  const { password } = await req.body;
  if (password !== process.env.ADMIN_PWD) {
    res.json({ auth_status: "FAILED" });
    return;
  }
  req.session.set("admin_auth_token", password);
  await req.session.save();
  res.json({ auth_status: "PASSED" });
});
