    import HelloWorld from 0xdb16a5e14c410280

    transaction {
    
      prepare(acct: AuthAccount) {}
    
      execute {
        log(HelloWorld.hello())
      }
    }

    // flow transactions send ./ping.cdc --signer admin-account --network testnet