<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo-dark.png">
    <img src="logo-light.png" alt="veilwild" width="260">
  </picture>
</p>

<p align="center"><b>A ranger sees an endangered animal's location only when two independent people approve.</b><br>
RMIT Hackathon 2026 · Tide UNLOCKED</p>

> **Status:** Working prototype with simulated sign-in. TideCloak integration is in progress (see [Moving to TideCloak](#moving-to-tidecloak)).

<p align="center">
  <a href="demo.mp4"><img src="demo.gif" alt="Three phones: the ranger requests Rhino 1, the trustee and researcher approve, and the location unlocks on the ranger's phone" width="720"></a><br>
  <sub>Click for the full-quality video (<code>demo.mp4</code>, 34 s).</sub>
</p>

## Project overview

### The problem
Conservation researchers collect sensitive information about endangered animals, including nesting sites, breeding areas and precise locations. Rangers may need this data to prevent poaching or respond to threats, but exposing it too widely can put the very animals they are trying to protect at risk.

Sharing an entire wildlife database with every authorised user — or allowing one administrator to unlock it — creates an unnecessary point of failure.

### Our solution
VeilWild is a proposed secure sharing layer for existing conservation databases. A ranger requests access to **one specific geographical section** and explains the conservation need, such as investigating a threat near a vulnerable nesting site.

An administrator reviews and routes the request but **cannot independently view or release sensitive animal-location data**.

Access requires **both**:
1. Approval from the researcher responsible for that section.
2. Approval from an independent trustee.

Only after both authorise the *same request* can the verified ranger access the approved section. Locations and records in other sections remain protected.

### Why Tide?
A normal application can show approval buttons while still allowing its administrator to change permissions behind the scenes. We aim to use **TideCloak's identity, encryption and governance capabilities** so that access to endangered-animal data is not controlled by a single administrator. Enforcing a specific researcher-plus-trustee rule for each section may require additional Tide policy integration beyond the default quorum features.

### Intended impact
Help conservation teams act on threats to endangered species without unnecessarily exposing sensitive habitats or animal locations. Researchers retain control over their data, while rangers can request the limited access needed to protect wildlife.

**Prototype scope:** Browser encryption and approval signatures are implemented; TideCloak sign-in and independent key custody are simulated, not production-grade protection.

## Access flow

1. **Ranger:** Authenticates, selects one geographical section and gives a clear conservation reason for requesting access.
2. **Administrator:** Reviews the request details and routes it; cannot reveal protected locations or bypass approvals.
3. **Area researcher:** Approves or rejects access to the endangered-wildlife records in their assigned section.
4. **Independent trustee:** Separately approves or rejects the same request.
5. **Protected release:** Only the authorised ranger receives access to the approved section; all other sensitive locations remain inaccessible.

**Key demonstration:** Even an administrator cannot reveal an endangered animal's location alone. One approval is insufficient; two valid approvals permit access to only the requested section.

## Try the prototype

No build step and no dependencies. Serve the folder and open it in a browser:

```bash
python3 -m http.server 8765
```

- **http://localhost:8765/demo.html** — three phones side by side (Ranger, Trustee, Researcher) sharing one live session. On the ranger's phone, request an animal's location (for example Rhino 1) and give a reason. The trustee and researcher are notified, can see whether the other has approved, and approve or decline. Once both approve, the location appears on the ranger's phone.
- **http://localhost:8765/** — the same app on one screen, with a switcher for the three people.

WebCrypto needs a secure context, so use `localhost` (or HTTPS, such as GitHub Pages) rather than opening the file directly.

### What is real and what is simulated

| | Prototype |
|---|---|
| Location encryption | Real: AES-GCM via the browser's WebCrypto |
| Approvals | Real HMAC signatures, checked before a location is decrypted |
| Sign-in and roles | **Simulated** |
| Key custody | **Simulated:** every key lives in the browser tab, so this does not stop a real administrator |

The prototype shows the experience. Enforcement that holds even against a compromised administrator is what the TideCloak integration adds.

## Moving to TideCloak

This is a hackathon software prototype. Live TideCloak integration was attempted but could not be completed reliably. The working browser simulation demonstrates identity-specific requests, two separate approvals and narrowly scoped location disclosure.

A production version would move identity verification, approval authority and decryption key custody into independently enforced Tide-backed controls. **Do not treat this prototype as protection against a compromised administrator.**

## Repository layout

| Path | What it is |
|---|---|
| `index.html` | The prototype: one self-contained page |
| `demo.html` | Three-phone demo; each phone is `index.html?as=<person>` |
| `index-planc.html` | Fallback copy of the simulated prototype |
| `demo.mp4`, `demo.gif` | Recording of the demo flow |
| `emblem.png`, `wordmark-mask.png`, `logo-*.png`, `favicon-32.png`, `apple-touch-icon.png` | Logo, emblem, favicons and wordmark mask |
| `record-demo.mjs` | Re-records `demo.mp4` with Playwright |

## Data

All animals, people and locations in this repository are fictional. Use synthetic locations for development and never upload real-world locations of endangered animals.
