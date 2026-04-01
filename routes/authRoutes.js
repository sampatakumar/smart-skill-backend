import express from "express";

const router = express.Router();

router.post("/github-token", async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: "No github code provided" });
    }

    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description || data.error });
    }

    res.json({ access_token: data.access_token });
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
