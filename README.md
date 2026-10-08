# ProofDock — proofdock-app

> Credential registry and verifiable status proofs.

![ProofDock Web app](banner.png)

## About the project

ProofDock is a credential registry built on Stellar/Soroban. Issuers (universities, training bodies, employers, licensing authorities) register credentials, and anyone — an employer, a regulator, the holder — can later check whether a credential is still valid and obtain a verifiable status proof, without having to phone or trust the issuer's own website. The chain is the neutral source of truth for credential status; everything else is built around it.

**Who it is for:** Issuers, credential holders and verifiers (employers, schools, regulators).

**How the pieces fit together:**

| Repository | Responsibility |
|---|---|
| `proofdock-contracts` | On-chain Soroban state and authorization — the source of truth |
| `proofdock-backend` | Off-chain indexing, read models and operational APIs |
| `proofdock-app` | User-facing web application |

Typical flow:

1. An issuer registers or updates a credential's status on-chain (authorized by the issuer's Stellar account).
2. The backend indexes the resulting contract state into a fast read model.
3. A verifier opens the web app, looks a credential up and gets a status proof backed by public chain state.

## This repository: Web app

The **app** repository is the user-facing web application for ProofDock. It reads public chain state directly through Stellar RPC and sends writes through the wallet/signing layer, so users never hand their keys to the service. Indexing and persistence stay in the backend.

### What is included today

- A Next.js 15 (App Router) + React 19 + TypeScript application.
- A home page showing the ProofDock name, its tagline and a **Network** card.
- `lib/stellar.ts` with a `networkSummary()` helper that reports the configured Stellar network (currently Testnet) using `@stellar/stellar-sdk` 17.2.1.
- A dark theme (deep navy background with violet and cyan accents) shared across the ProofDock repositories.
- Configuration for the network, RPC endpoint, contract ID and backend URL via environment variables.

### Tech stack

Next.js 15.5 · React 19.1 · TypeScript 5.8 · `@stellar/stellar-sdk` 17.2.1

### Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                 # http://localhost:3000
npm run build               # production build
npm run lint
npm test
```

### Configuration

| Variable | Purpose | Default |
|---|---|---|
| `STELLAR_NETWORK` | Which Stellar network to target | `testnet` |
| `STELLAR_RPC_URL` | Soroban RPC endpoint used for reads | `https://soroban-testnet.stellar.org` |
| `CONTRACT_ID` | Deployed ProofDock contract to talk to | *(empty — set after deployment)* |
| `BACKEND_URL` | Base URL of the ProofDock backend API | `http://localhost:8787` |

## Roadmap

- Connect a wallet and sign transactions against the ProofDock contract.
- Replace the placeholder home page with the real ProofDock screens.
- Read live data from the backend API and the chain, with loading and error states.

## Maintainer

`@ollypee22`

## Status

**v0.1.0 development baseline — not audited and not production-ready.**

## Stellar alignment

The project uses Stellar/Soroban where on-chain state is the source of truth or where deterministic settlement is valuable. Off-chain services are kept out of consensus-critical logic.

## License

Apache-2.0
