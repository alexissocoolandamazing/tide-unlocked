# Veilwild — Tide UNLOCKED hackathon prototype

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo-dark.png">
    <img src="logo-light.png" alt="veilwild" width="260">
  </picture>
</p>

<p align="center"><b>A ranger sees an endangered animal's location only when two independent people approve.</b><br>
RMIT Hackathon 2026 · Tide UNLOCKED</p>

> **Status:** Working Plan C prototype. TideCloak identity and independent authorisation are simulated; live integration was attempted but not completed.

<p align="center">
  <a href="demo.mp4"><img src="demo.gif" alt="Three phones: the ranger requests Rhino 1, the trustee and researcher approve, and the location unlocks on the ranger's phone" width="720"></a><br>
  <sub>Click for the full-quality video (<code>demo.mp4</code>, 34 s).</sub>
</p>

**Team project.** Developed for the RMIT Hackathon 2026 Tide UNLOCKED challenge.

## Project overview

**Veilwild** is a wildlife intelligence-sharing prototype where a ranger can unlock a specific endangered animal's location only after a researcher and an independent trustee approve.

### Vision & originality
Rather than replacing conservation databases, Veilwild proposes an access layer for sharing sensitive wildlife locations with field rangers. Requests are limited to a named animal and a specific conservation purpose, not unrestricted access to all tracking records.

### Trust constraint insight
Location data collected to protect endangered species could also expose them to poaching if improperly released. Ordinary administrator-controlled permissions leave one privileged operator able to override the intended rules. Veilwild's intended model separates the ability to operate the system from the authority to disclose sensitive data.

### Value & impact
A ranger responding to potential poaching activity can request an individual rhino's location for a patrol. The researcher responsible for that animal's area and an independent trustee must both authorise the same request. Other animals' locations remain unavailable.

### Why TideCloak matters
TideCloak's identity, encryption and governance approach could prevent a single administrator from granting themselves access. Our **Plan C prototype simulates** identity verification, roles and independent approval requirements. Live TideCloak integration was attempted but could not be completed reliably; independent key custody and administrator-resistant enforcement are **not yet implemented**.

### Prototype & storytelling
Three interactive phones show the ranger requesting a location, the trustee and researcher receiving notifications, and each independently approving. One approval leaves the location locked; the second unlocks only the requested fictional animal. Browser WebCrypto provides AES-GCM encryption and HMAC checks, but the keys remain together in the demo runtime.

## Implemented demo flow

1. **Ranger:** Uses a simulated identity, selects one fictional animal and supplies a conservation reason for access.
2. **Researcher:** Approves or declines that specific request.
3. **Trustee:** Independently approves or declines the same request in the interface.
4. **Release:** The demo reveals the requested animal's location only after both approvals pass the browser's checks. One approval is insufficient; other animals are not unlocked by this request.

The working demo has three roles: ranger, researcher and trustee. There is no implemented administrator review/routing role. Geographic areas label animals; approval is scoped to an individual animal rather than an entire section.

These are separate simulated identities within a shared browser runtime. The interface demonstrates the two-approval workflow, not independently enforced authority or administrator-resistant security.

## Try the prototype

The browser application has no build step or third-party JavaScript dependencies. With Python 3 installed, serve the folder and open it in a browser:

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

The prototype demonstrates the experience. Enforcement against a compromised administrator remains a proposed production requirement; no such protection is established by this browser simulation.

## Moving to TideCloak

This is a hackathon software prototype. Live TideCloak integration was attempted but could not be completed reliably. The working browser simulation demonstrates identity-specific requests, two separate approvals and narrowly scoped location disclosure.

A proposed production version would move identity verification, approval authority and decryption key custody into independently enforced Tide-backed controls, with implementation and security validation still required. **Do not treat this prototype as protection against a compromised administrator.**

## Repository layout

| Path | What it is |
|---|---|
| `index.html` | The prototype: one self-contained page |
| `demo.html` | Three-phone demo; each phone is `index.html?as=<person>` |
| `index-planc.html` | Fallback copy; byte-identical to `index.html` at this documentation review |
| `demo.mp4`, `demo.gif` | Recording of the demo flow |
| `emblem.png`, `wordmark-mask.png`, `logo-*.png`, `favicon-32.png`, `apple-touch-icon.png` | Logo, emblem, favicons and wordmark mask |
| `record-demo.mjs` | Recording helper requiring Playwright and ffmpeg in a separate recording environment |

### Additional retained artifacts

- `video.mp4` — approximately 74.85 MB; an additional recording whose relationship to the short demo is not documented.
- `sourcecodes.zip` — retained source archive; its contents and submission purpose have not been verified in this documentation review.

These files are retained in place. The short `demo.mp4` and `demo.gif` above remain the documented walkthrough. The recording helper's comments describe a `veilwild-recorder` image; instructions for building that image are not included in this repository.

## Data

All animals, people and locations in this repository are fictional. Use synthetic locations for development and never upload real-world locations of endangered animals.
