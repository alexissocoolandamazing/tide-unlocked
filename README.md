# Wildlife Data Gateway

**RMIT Hackathon 2026 | Tide UNLOCKED**

> **Status:** Concept defined. Implementation and Tide integration are not yet complete.

## Project overview

### The problem
Wildlife researchers collect sensitive information, including locations of endangered animals. Rangers need appropriate access to protect wildlife, but unrestricted database access creates a serious risk if an account or administrator is compromised, or information is improperly disclosed.

### Our solution
Wildlife Data Gateway is a proposed secure sharing layer for existing conservation databases. A ranger requests access to **one specific geographical section** and identifies why the information is needed. An administrator coordinates the request but **cannot independently view or release the protected information**.

Access requires **both**:
1. Approval from the researcher responsible for that section.
2. Approval from an independent trustee.

Only after both authorise the *same request* can the verified ranger access the approved section. Other sections remain protected.

### Why Tide?
A normal application can display approval buttons while leaving its administrator able to change permissions. We aim to use **TideCloak's identity, encryption and governance capabilities** so that sensitive access and permission changes are not controlled by a single administrator. Enforcing a particular researcher-plus-trustee rule for each section may require additional Tide policy integration beyond the default quorum features.

### Intended impact
Allow researchers and rangers to collaborate without making an entire reserve's sensitive information available to every authorised user. The same model could later support controlled sharing between independent organisations.

## Proposed access flow

1. **Ranger:** Authenticates and requests one section and a defined access scope.
2. **Administrator:** Reviews and routes the request; cannot bypass the approvals.
3. **Area researcher:** Approves or rejects access to their assigned section.
4. **Independent trustee:** Separately approves or rejects the same request.
5. **Protected release:** Only an authorised ranger receives access to the approved section; other sections remain inaccessible.

**Key demonstration:** An administrator acting alone is denied; one approval is insufficient; two valid approvals permit section-specific access.

## Implementation and setup

This repository currently documents the concept only. The application, technology stack, setup instructions and demo will be added during development. Any simulated approvals will be clearly identified; the README will not claim cryptographic enforcement until it is implemented and tested.

Use fictional wildlife records and synthetic locations for development. Never upload sensitive real-world animal location data.
