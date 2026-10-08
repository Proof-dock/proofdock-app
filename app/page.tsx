import { networkSummary } from "../lib/stellar";
export default function Home(){return <main><p className="tag">STELLAR / SOROBAN</p><h1>ProofDock</h1><p>Credential registry and verifiable status proofs.</p><section className="card"><h2>Network</h2><p>{networkSummary()}</p></section></main>}
