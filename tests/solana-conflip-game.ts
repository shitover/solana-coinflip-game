import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaConflipGame } from "../target/types/solana_conflip_game";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { BN } from "bn.js";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

function ramdomstring(length=8) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe("solana-conflip-game", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaConflipGame as Program<SolanaConflipGame>;
  const payer = anchor.Wallet.local().payer
  const keypair = Keypair.generate();


  const room_id = randomString()
  const amount = LAMPORTS_PER_SOL * 0.1
  const [coinflip] = PublicKey.findProgramAddressSync(
    [Buffer.from("coinflip"), Buffer.from(room_id)],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.createCoinflip(room_id, new BN(amount)).accounts({

   
    coinflip,
    user: payer.publicKey,
    systemProgram: SystemProgram.programId,
    }).signers([
      payer
    ]).rpc({
      skipPreflight: true
    });

    
    
    console.log("Your transaction signature", tx);
    console.log("Program account data:", await program.account.coinflip.fetch(coinflip))
  })


  it("Transfer SOL to player2", async () => {

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: keypair.publicKey,
        lamports: LAMPORTS_PER_SOL * 0.1,
   
  })

    )

var tx = await sendAndConfirmTransaction(anchor.getProvider().connection, transferTransaction, [payer, keypair]);
console.log("TX executed", tx)
});

it("Play the game", async () => {
  const random = randomnessAccountAddress(force.toBuffer());
  const treasury = new PublicKey("9ZTHWWZDpB36UFe1vszf2KEpt83vwi27jDqtHQ7NSXyR")

  const vrf = new Orao(anchor.getProvider() as any);
  let force = Keypair.generate().publicKey;
  const tx = await program.methods.playCoinflip( room_id, [...force.toBuffer()]).accounts({
    user: payer.publicKey,
    coinflip: coinflip,
    vrf: vrf.programId,
    config: networkStateAccountAddress(),
    treasury: treasury,
    random,
  }).signers([payer]).rpc();

  const tx = await program.methods.playCoinflip( room_id, [...force.toBuffer()]).accounts({
    user: payer.publicKey,
    coinflip: coinflip,
    vrf: vrf.programId,
    config: networkStateAccountAddress(),
    treasury: treasury,
    random,
  }).signers([payer]).rpc();

console.log(`Game has started, randomness is requested: `, tx)
})

it("Randomness fulfilled", async () => {
  let randomnessFulfilled = await verifiedBuild.waitFulfilled(force.toBuffer())
  console.log("Randomness fulfilled, we can call the result function", randomnessFulfilled)
})


it("Get the result", async () => {   const vrf = new Orao(anchor.getProvider() as any);

  const random = randomnessAccountAddress(force.toBuffer());
  const treasury = new PublicKey("9ZTHWWZDpB36UFe1vszf2KEpt83vwi27jDqtHQ7NSXyR");

  const tx = await program.methods.resultCoinflip( room_id, [...force.toBuffer()]).accounts({
    user1: payer.publicKey,
    user2: keypair.publicKey,
    coinflip: coinflip,
    vrf: vrf.programId,
    config: networkStateAccountAddress(),
    treasury: treasury,
    random,
  }).signers([payer]).rpc();


  console.log(`Game is finished`, tx)
  console.log("Program account data: ", await program.account.coinflip.fetch(coinflip))

})
});

