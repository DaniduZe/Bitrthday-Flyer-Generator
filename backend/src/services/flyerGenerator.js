import Jimp from "jimp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { calcAge } from "./age.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateFlyer({ name, dob, pictureUrl }) {
  const width = 1080;
  const height = 1080;

  try {
    // Background template path
    const bgPath = path.join(__dirname, "..", "templates", "WhatsApp Image 2026-01-06 at 12.20.33 PM.jpeg");
    const background = await Jimp.read(bgPath);
    background.cover(width, height);

    // Try loading user photo
    let avatar;
    const avatarSize = 300;
    try {
      if (pictureUrl) {
        let localPath = pictureUrl;
        if (pictureUrl.startsWith("/uploads")) {
          localPath = path.join(__dirname, "..", "..", pictureUrl);
        } else if (!path.isAbsolute(pictureUrl)) {
          localPath = path.join(__dirname, "..", "..", pictureUrl);
        }

        avatar = await Jimp.read(localPath);
        avatar.cover(avatarSize, avatarSize).circle();
      }
    } catch (e) {
      console.warn("⚠️ Failed to load user picture:", e.message);
    }

    // Fonts

    const fontName = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);


    // Place avatar (centered)
    if (avatar) {
      const scale = 1.3; // increase size (1.0 = avatarSize)
      const finalSize = Math.round(avatarSize * scale);
      const avatarScaled = avatar.clone().cover(finalSize, finalSize);
      const x = Math.round(width / 2 - finalSize / 2);
      const y = Math.round(height / 2 - finalSize / 2);
      background.composite(avatarScaled, x, y);
    }

    // Add name
    background.print(
      fontName,
      0,
      height / 2 + 210,
      {
        text: name,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      },
      width
    );


    // Save flyer
    const outDir = "flyers";
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filename = `${Date.now()}-${name.replace(/\s+/g, "_")}.png`;
    const outPath = path.join(outDir, filename);

    await background.writeAsync(outPath);
    console.log("✅ Flyer generated:", outPath);
    return outPath;
  } catch (err) {
    console.error("❌ Error generating flyer:", err);
    throw err;
  }
}
