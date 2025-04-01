const parseEnv = () => {
  const rssVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  if (rssVars) {
    console.log(rssVars);
  } else {
    console.log("No RSS_ environment variables found");
  }
};

parseEnv();
