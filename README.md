# Endangered Wildlife Data Gateway

**RMIT Hackathon 2026 | Tide UNLOCKED**

> **Status:** Concept defined. Implementation and Tide integration are not yet complete.

## Project overview

### The problem
Conservation researchers collect sensitive information about endangered animals, including nesting sites, breeding areas and precise locations. Rangers may need this data to prevent poaching or respond to threats, but exposing it too widely can put the very animals they are trying to protect at risk.

Sharing an entire wildlife database with every authorised user — or allowing one administrator to unlock it — creates an unnecessary point of failure.

### Our solution
Endangered Wildlife Data Gateway is a proposed secure sharing layer for existing conservation databases. A ranger requests access to **one specific geographical section** and explains the conservation need, such as investigating a threat near a vulnerable nesting site.

An administrator reviews and routes the request but **cannot independently view or release sensitive animal-location data**.

Access requires **both**:
1. Approval from the researcher responsible for that section.
2. Approval from an independent trustee.

Only after both authorise the *same request* can the verified ranger access the approved section. Locations and records in other sections remain protected.

### Why Tide?
A normal application can show approval buttons while still allowing its administrator to change permissions behind the scenes. We aim to use **TideCloak's identity, encryption and governance capabilities** so that access to endangered-animal data is not controlled by a single administrator. Enforcing a specific researcher-plus-trustee rule for each section may require additional Tide policy integration beyond the default quorum features.

### Intended impact
Help conservation teams act on threats to endangered species without unnecessarily exposing sensitive habitats or animal locations. Researchers retain control over their data, while rangers can request the limited access needed to protect wildlife.

## Proposed access flow

1. **Ranger:** Authenticates, selects one geographical section and gives a clear conservation reason for requesting access.
2. **Administrator:** Reviews the request details and routes it; cannot reveal protected locations or bypass approvals.
3. **Area researcher:** Approves or rejects access to the endangered-wildlife records in their assigned section.
4. **Independent trustee:** Separately approves or rejects the same request.
5. **Protected release:** Only the authorised ranger receives access to the approved section; all other sensitive locations remain inaccessible.

**Key demonstration:** Even an administrator cannot reveal an endangered animal's location alone. One approval is insufficient; two valid approvals permit access to only the requested section.

## Implementation and setup

This repository currently documents the concept only. The application, technology stack, setup instructions and demo will be added during development. Any simulated approvals will be clearly identified; the README will not claim cryptographic enforcement until it is implemented and tested.

Use fictional endangered-wildlife records and synthetic locations for development. Never upload sensitive real-world animal location data.
