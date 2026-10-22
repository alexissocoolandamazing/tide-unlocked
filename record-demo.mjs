// record-demo.mjs — records demo.mp4: the three-phone demo (demo.html) driven step by step,
// with a caption per step and a visible cursor.
//
// Runs inside the recorder image (Playwright + ffmpeg). From the repo root:
//
//   docker run --rm -v "$PWD:/repo" veilwild-recorder \
//     sh -c 'cp /repo/record-demo.mjs . && node record-demo.mjs'
//
// (Copied next to the image's node_modules so `import "playwright"` resolves.)
// Writes /repo/demo.mp4 (1440x1060, H.264, 25 fps) and /repo/demo.gif (720 px, for the README).
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { tmpdir } from "node:os";

const ROOT = process.env.ROOT || "/repo";
const OUT = process.env.OUT || join(ROOT, "demo.mp4");
const GIF = process.env.GIF || join(ROOT, "demo.gif");
const size = { width: 1440, height: 1060 };
const dir = mkdtempSync(join(tmpdir(), "veilwild-"));

// Serve the repo on localhost inside the container: the demo uses WebCrypto, which only works in
// a secure context, and localhost is one.
const TYPES = { ".html": "text/html", ".png": "image/png", ".js": "text/javascript", ".css": "text/css" };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  try { res.writeHead(200, { "content-type": TYPES[extname(path)] || "application/octet-stream" }).end(readFileSync(join(ROOT, path))); }
  catch { res.writeHead(404).end(); }
}).listen(8765);
const BASE = "http://localhost:8765";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: size, colorScheme: "light", recordVideo: { dir, size } });
const page = await context.newPage();
const wait = ms => page.waitForTimeout(ms);
const phone = who => page.frameLocator(`#f-${who}`);

async function caption(k, t, d){
  await page.evaluate(([k, t, d]) => {
    const cap = document.querySelector(".cap");
    cap.style.transition = "opacity .25s"; cap.style.opacity = 0;
    setTimeout(() => {
      document.getElementById("k").textContent = k;
      document.getElementById("t").textContent = t;
      document.getElementById("d").textContent = d;
      cap.style.opacity = 1;
    }, 250);
  }, [k, t, d]);
  await wait(300);
}

// A soft green dot standing in for the presenter's pointer.
async function addCursor(){
  await page.evaluate(() => {
    const c = document.createElement("div");
    c.id = "cursor";
    c.style.cssText = "position:fixed;left:720px;top:620px;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;" +
      "background:rgba(46,90,58,.35);border:2px solid rgba(46,90,58,.9);z-index:99;pointer-events:none;" +
      "transition:left .7s cubic-bezier(.4,0,.2,1),top .7s cubic-bezier(.4,0,.2,1),transform .15s";
    document.body.appendChild(c);
  });
}
async function pointAt(who, locator){
  const frame = await page.locator(`#f-${who}`).boundingBox();
  const el = await locator.boundingBox();
  // An element inside an iframe reports its box in page coordinates already.
  const x = el ? el.x + el.width / 2 : frame.x + frame.width / 2;
  const y = el ? el.y + el.height / 2 : frame.y + frame.height / 2;
  await page.evaluate(([x, y]) => { const c = document.getElementById("cursor"); c.style.left = x + "px"; c.style.top = y + "px"; }, [x, y]);
  await wait(800);
}
async function tap(who, locator){
  await locator.scrollIntoViewIfNeeded();
  await pointAt(who, locator);
  await page.evaluate(() => { document.getElementById("cursor").style.transform = "scale(.7)"; });
  await wait(150);
  await locator.click();
  await page.evaluate(() => { document.getElementById("cursor").style.transform = ""; });
}

await page.goto(`${BASE}/demo.html`);
await phone("mika").locator("text=Rhino 1").waitFor();
await addCursor();
await caption("Live demo", "Three people, three phones.", "A rhino's location is only shared when both the trustee and the researcher approve.");
await wait(3000);

await caption("Step 1 · Ranger", "Mika requests the location of Rhino 1.", "She picks a reason and adds a detail for the approvers.");
const mika = phone("mika");
await tap("mika", mika.locator('[data-act="ask"][data-animal="rhino1"]'));
await wait(500);
await pointAt("mika", mika.locator('select[name="reason"]'));
await mika.locator('select[name="reason"]').selectOption("Anti-poaching patrol");
await wait(400);
await tap("mika", mika.locator('textarea[name="note"]'));
await mika.locator('textarea[name="note"]').pressSequentially("Fresh tracks near the north fence", { delay: 40 });
await wait(400);
await tap("mika", mika.locator('button[type="submit"]'));

await caption("Step 2 · Notification", "The trustee and the researcher are notified instantly.", "Each sees who is asking, for which animal, and why.");
await wait(3600);

await caption("Step 3 · Trustee", "Hana approves.", "The researcher's phone shows that the trustee has approved. The location is still locked.");
await tap("hana", phone("hana").locator('[data-act="approve"]').first());
await wait(3400);

await caption("Step 4 · Researcher", "Dr Ivy Chen approves.", "Two valid approvals for the same request. Only now can the location be decrypted.");
await tap("ivy", phone("ivy").locator('[data-act="approve"]').first());
await wait(2000);

await caption("Step 5 · Ranger", "The location is sent to Mika, and only Mika.", "Rhino 1's position unlocks on her phone for 24 hours. Other animals stay hidden.");
await pointAt("mika", mika.locator(".loc"));
await wait(4200);

await caption("In short", "No single person can release a protected location.", "Ranger asks. Trustee and researcher both approve. Only then is the location shared.");
await page.evaluate(() => { document.getElementById("cursor").style.opacity = 0; });
await wait(3800);

await context.close();
await browser.close();
server.close();

const webm = join(dir, readdirSync(dir).find(f => f.endsWith(".webm")));
const ff = args => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
ff(["-i", webm, "-r", "25", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", OUT]);
ff(["-i", OUT, "-vf", "fps=8,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4", GIF]);
rmSync(dir, { recursive: true, force: true });
console.log(`wrote ${OUT} and ${GIF}`);
