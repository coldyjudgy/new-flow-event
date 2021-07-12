    access(all) contract HelloWorld {
      pub event CustomEvent(a_number: Int, b_message: String)

      access(all) let greeting: String

      init() {
          self.greeting = "Hello, Cadence!"
      }
  
      access(all) fun hello(): String {
          emit CustomEvent(a_number: 33, b_message: "Test message2") // 변수 처리해야 함 (이미 deploy된 상태에서 바뀌게 하려면)
          return self.greeting
      }
    }

    // flow accounts add-contract Hello ./Hello.cdc --signer admin-account --network testnet