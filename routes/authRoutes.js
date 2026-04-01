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

router.get("/github/callback", (req, res) => {
  const { code, state } = req.query;
  
  if (!code || !state) {
    return res.status(400).send("Missing code or state");
  }

  try {
    const stateObj = JSON.parse(decodeURIComponent(state));
    const { redirectUri, csrf } = stateObj;
    
    // Bounce the request back to the Expo app's deep link
    res.redirect(`${redirectUri}?code=${code}&state=${csrf}`);
  } catch (error) {
    console.error("Callback parsing error:", error);
    // Fallback if state was not JSON
    if (state.startsWith("exp://") || state.startsWith("smart-skill-hub://") || state.startsWith("10.")) {
      return res.redirect(`${state}?code=${code}`);
    }
    res.status(400).send("Invalid state parameter");
  }
});

export default router;
